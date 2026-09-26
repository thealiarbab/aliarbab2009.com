import type { Metadata } from "next";
import Link from "next/link";

import { LAB, type LabEntry } from "@/config/lab";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Lab — hardware in design",
  description:
    "Hardware designs on paper and one built prototype: a chest-worn vitals monitor with satellite SOS, a LoRa sensor mesh, a fused HUD, and a bionic hand.",
  path: "/lab",
  // No opengraph-image.tsx in this segment — share the root one.
  ogImage: "/opengraph-image",
  ogImageAlt: "Lab — Ali Arbab's hardware designs",
});

const STATUS_LABEL: Record<LabEntry["status"], string> = {
  built: "Built",
  "in-design": "In design",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function LabPage() {
  const designed = LAB.filter((e) => e.status === "in-design").length;

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <div className="brutalist-grid" aria-hidden />

      {/* MASTHEAD */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Section
          </p>
          <p className="font-mono text-sm font-medium">/lab</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Contents
          </p>
          <p className="font-mono text-sm font-medium">
            {designed} in design · {LAB.length - designed} built
          </p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/projects" className="hover:text-[var(--color-primary)]">
              ← projects
            </Link>
          </p>
        </div>
      </header>

      {/* § 00 — INTRO */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 00
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Lab
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            On the bench.
          </h1>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Hardware I&apos;ve designed down to the part numbers and power budget, but haven&apos;t
            built yet — plus the one prototype that exists. Everything marked{" "}
            <strong className="font-medium">In design</strong> is a finished architecture on paper,
            not a working device. The decisions I cut are listed too, because they&apos;re most of
            the design.
          </p>
        </div>
      </section>

      {LAB.map((entry, i) => (
        <section
          key={entry.id}
          id={entry.id}
          className="mb-20 grid scroll-mt-24 grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10"
        >
          <div className="col-span-12 flex flex-col gap-2 md:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              § {pad(i + 1)}
            </p>
            <p
              className={
                "inline-flex w-fit border-2 px-2 py-0.5 font-mono text-[9px] tracking-[0.25em] uppercase " +
                (entry.status === "built"
                  ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)]")
              }
            >
              {STATUS_LABEL[entry.status]}
            </p>
          </div>
          <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
            <h2
              className="text-[clamp(2rem,4vw,3.25rem)] leading-tight font-medium tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {entry.name}
            </h2>
            <p className="max-w-3xl text-lg leading-snug text-[var(--color-fg)]">{entry.summary}</p>
            <div className="max-w-prose space-y-4 text-base leading-relaxed text-[var(--color-fg)]">
              {entry.body.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
            <dl className="max-w-3xl border-2 border-[var(--color-border)]">
              {entry.specs.map((spec, j) => (
                <div
                  key={spec.label}
                  className={
                    "grid grid-cols-12 gap-x-4 gap-y-1 p-3" +
                    (j < entry.specs.length - 1 ? " border-b-2 border-[var(--color-border)]" : "")
                  }
                >
                  <dt className="col-span-12 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase sm:col-span-4">
                    {spec.label}
                  </dt>
                  <dd className="col-span-12 font-mono text-sm sm:col-span-8">{spec.value}</dd>
                </div>
              ))}
            </dl>
            {entry.cut && entry.cut.length > 0 && (
              <div className="max-w-3xl">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
                  Proposed, then cut
                </p>
                <ul className="flex flex-col gap-3">
                  {entry.cut.map((c) => (
                    <li
                      key={c.slice(0, 40)}
                      className="grid grid-cols-[1.25rem_1fr] gap-2 text-sm leading-relaxed"
                    >
                      <span aria-hidden className="text-[var(--color-muted)]">
                        ✕
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
