import type { Metadata } from "next";

import { CaseStudy, Code, Points } from "@/components/project/case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { getProjectBySlug } from "@/config/projects";
import { projectJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

const project = getProjectBySlug("lamecraft")!;

export const metadata: Metadata = buildMetadata({
  title: "LameCRAFT — home server + Command Nexus design system",
  description:
    "A self-hosted home server behind a Cloudflare tunnel, the Python control panel that runs it, and Command Nexus — the JSON-specified design system MagLock is built from.",
  path: "/projects/lamecraft",
  ogImageAlt: "LameCRAFT — self-hosted server and the Command Nexus design system",
  ogType: "article",
  publishedTime: `${project.startedISO}T00:00:00.000Z`,
  keywords: ["LameCRAFT", "Self-hosting", "Design system", "FastAPI", "Cloudflare Tunnel"],
});

/** The palette as the spec defines it — role, token, hex. */
const PALETTE: ReadonlyArray<readonly [string, string, string]> = [
  ["Void", "--bg", "#030306"],
  ["Primary", "--accent", "#00ff9d"],
  ["Info", "--accent2", "#00d4ff"],
  ["Danger", "--accent3", "#ff3366"],
  ["Warning", "--accent4", "#ffd700"],
  ["Secondary", "--accent5", "#c77dff"],
];

export default function LameCraftPage() {
  return (
    <>
      <JsonLd data={projectJsonLd("lamecraft")} />
      <CaseStudy
        project={project}
        statsAsOf="2026-09-26"
        stats={[
          { value: "1", label: "JSON spec for the whole look" },
          { value: "₹0", label: "Hosting bill" },
          { value: "50ms", label: "Master animation loop" },
          { value: "25", label: "Written design rules" },
        ]}
        sections={[
          {
            label: "Server",
            heading: "Self-hosted from behind a CGNAT.",
            body: (
              <>
                <p>
                  It started with a Minecraft server. In 2023 a friend set up a Discord server as a
                  place for us to hang out around a Minecraft world and called it LameCRAFT; the
                  name has stuck to everything I&apos;ve hosted since. The first time my tutee and I
                  tried to host a Minecraft server for our friends, forwarding a port on the router
                  did nothing at all. Working out why is how I learned what carrier-grade NAT is,
                  and it sent us down an ngrok rabbit hole that eventually ended at a Cloudflare
                  tunnel.
                </p>
                <p>
                  I wanted my sites running on my own machine at home, not on someone else&apos;s
                  hosting. The catch: my connection sits behind carrier-grade NAT. My ISP shares one
                  public IP address across many customers, so there is no address of my own to point
                  a domain at, and forwarding a port on my router does nothing, because the router
                  itself isn&apos;t reachable from the internet.
                </p>
                <p>
                  So the traffic goes the other way round. FastAPI on uvicorn serves the sites
                  locally, and a Cloudflare tunnel daemon on the same machine dials out to
                  Cloudflare and holds that connection open. Visitors hit Cloudflare&apos;s edge,
                  and requests come back down the tunnel the server opened itself. Outbound
                  connections work fine through CGNAT, so the site is live without a public IP, an
                  open port or a hosting bill, and adding a subdomain is one line of tunnel config.
                </p>
                <p>
                  It&apos;s live at{" "}
                  <a
                    href="https://lamecraft.org"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
                  >
                    lamecraft.org
                  </a>
                  : a CRT-terminal front page, and the study notes below. It&apos;s my own corner of
                  the internet rather than a product, so expect the odd rough edge.
                </p>
              </>
            ),
          },
          {
            label: "Control panel",
            heading: "A cockpit for the box.",
            body: (
              <p>
                A Python control panel — about fifteen hundred lines, packaged as a Windows
                executable with PyInstaller — starts and stops the services, and watches processes,
                ports and network state through <Code>psutil</Code>. Its colours, fonts and motion
                were the first thing I ever designed carefully, and they turned into everything
                below.
              </p>
            ),
          },
          {
            label: "Design system",
            heading: "Command Nexus: a design system written as data.",
            body: (
              <>
                <p>
                  Command Nexus is specified in one JSON file: colour tokens and the maths that
                  derives them, typography, glyphs, button behaviour, motion constants, component
                  shapes, a paste-ready <Code>:root</Code> block, and a checklist of sixteen things
                  a faithful copy must have and nine it must never do. Because it&apos;s data rather
                  than a mood board, any page, app or tool can reproduce it exactly — and
                  MagLock&apos;s Flutter theme is copied from it colour for colour.
                </p>
                <ul className="grid grid-cols-2 gap-0 border-2 border-[var(--color-border)] sm:grid-cols-3">
                  {PALETTE.map(([role, token, hex], i) => (
                    <li
                      key={token}
                      className={
                        "flex flex-col gap-2 border-[var(--color-border)] p-4" +
                        (i % 2 === 0 ? " border-r-2" : " sm:border-r-2") +
                        (i % 3 === 2 ? " sm:border-r-0" : "") +
                        (i < PALETTE.length - 2 ? " border-b-2" : "") +
                        (i >= PALETTE.length - 3 ? " sm:border-b-0" : " sm:border-b-2")
                      }
                    >
                      <span
                        aria-hidden
                        className="h-8 w-full border border-[var(--color-border)]"
                        style={{ background: hex }}
                      />
                      <span className="font-mono text-xs">{role}</span>
                      <span className="font-mono text-[10px] text-[var(--color-muted)]">
                        {token} · {hex}
                      </span>
                    </li>
                  ))}
                </ul>
                <Points
                  items={[
                    <>Near-black void, never pure black; one monospace family and nothing else.</>,
                    <>Every border one pixel and square — no radius anywhere.</>,
                    <>
                      &ldquo;Glow&rdquo; is colour blending, never blur; buttons invert instantly on
                      hover, with no transition.
                    </>,
                    <>
                      Section heads are uppercase, letter-spaced and prefixed with{" "}
                      <span className="text-[var(--color-primary)]">◈</span>.
                    </>,
                    <>
                      All motion runs off one shared phase value ticking every 50ms — create once,
                      mutate forever — so nothing on a page drifts out of step.
                    </>,
                  ]}
                />
              </>
            ),
          },
          {
            label: "Study pages",
            heading: "Notes that print like they render.",
            body: (
              <p>
                My study material lives on the same server, in{" "}
                <a
                  href="https://lamecraft.org/skool/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
                >
                  /skool
                </a>
                , as standalone HTML pages in the Command Nexus look, with maths typeset by KaTeX. A
                shared print kit adds one-click PDF export and print settings to any page with a
                single script tag — and taught me how fiddly raster pagination is: every atomic
                block has to refuse to split, or a PDF cuts an equation in half.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
