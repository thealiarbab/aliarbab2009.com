import type { Metadata } from "next";

import { CaseStudy, Code, Points } from "@/components/project/case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { getProjectBySlug } from "@/config/projects";
import { projectJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

const project = getProjectBySlug("sovereign-alpha")!;

export const metadata: Metadata = buildMetadata({
  title: "Sovereign Alpha — a backtest that can't cheat",
  description:
    "A fully local, deterministic simulation of 2015–2025 markets for testing whether an LLM reading history can find real alpha — with a temporal firewall enforced by CI.",
  path: "/projects/sovereign-alpha",
  ogImageAlt: "Sovereign Alpha — deterministic local market simulation",
  ogType: "article",
  publishedTime: `${project.startedISO}T00:00:00.000Z`,
  keywords: ["Sovereign Alpha", "Quantitative finance", "Backtesting", "Polars", "LLM"],
});

const PERSONAS = [
  "Aggressive momentum trader",
  "Conservative multi-asset allocator",
  "Geopolitical risk analyst",
  "Hawkish Fed strategist",
  "Semiconductor sector specialist",
  "Risk-averse supply-chain analyst",
] as const;

const ADRS = [
  "Polars over Pandas for the backtest engine",
  "as_of_join is the only sanctioned temporal merge",
  "ZeroMQ + MessagePack for the simulator → UE5 bridge",
  "Pydantic at boundaries, Pandera in flight",
  "Content-addressed caching at every pipeline stage",
  "Single node, closed loop, zero cloud dependency",
  "The synthetic Alpha Ledger is a first-class artifact",
  "Persona definitions in TOML, parsed with the standard library",
] as const;

export default function SovereignAlphaPage() {
  return (
    <>
      <JsonLd data={projectJsonLd("sovereign-alpha")} />
      <CaseStudy
        project={project}
        statsAsOf="2026-09-26"
        stats={[
          { value: "3", label: "Modules in one loop" },
          { value: "6", label: "Versioned analyst personas" },
          { value: "8", label: "Architecture decisions" },
          { value: "32", label: "Test modules" },
        ]}
        sections={[
          {
            label: "Question",
            heading: "Can a model that reads history beat the market — honestly?",
            body: (
              <>
                <p>
                  The research question is simple to state: if a reasoning language model reads a
                  decade of SEC filings, Federal Reserve statements, economic releases and news —
                  strictly in order, never seeing the future — can the signals it extracts beat
                  buy-and-hold and standard factor models once slippage, commissions and partial
                  fills are paid for?
                </p>
                <p>
                  Almost every public answer to that question is contaminated, because a backtest
                  that can see one row of tomorrow looks brilliant and means nothing. So the project
                  is built around making that leak impossible rather than unlikely.
                </p>
              </>
            ),
          },
          {
            label: "Modules",
            heading: "Read, trade, render.",
            body: (
              <Points
                items={[
                  <>
                    <strong className="font-medium">Module I — extraction.</strong> Ingestion
                    adapters for SEC EDGAR, FOMC, BLS and GDELT news; an HTML-clean → chunk →
                    cached-encode tokenisation pipeline; and an inference layer that writes an Alpha
                    Ledger — one row per document per entity, carrying sentiment, confidence,
                    horizon and the persona and model that produced it.
                  </>,
                  <>
                    <strong className="font-medium">Module II — the quant engine.</strong> Polars
                    over memory-mapped Parquet, a strictly forward-only cursor, and a friction layer
                    for slippage, commissions, partial fills and borrow costs. It reports Sharpe,
                    Sortino, drawdown and capture ratio, then checks them with probabilistic and
                    deflated Sharpe, bootstrap confidence intervals, walk-forward validation and
                    purged k-fold cross-validation.
                  </>,
                  <>
                    <strong className="font-medium">Module III — the digital twin.</strong> An
                    Unreal Engine 5 city where each district is a sector and each building an asset,
                    driven live over ZeroMQ with MessagePack on five topics. The message schemas and
                    a mock publisher are built; the UE5 scene is next.
                  </>,
                ]}
              />
            ),
          },
          {
            label: "Firewall",
            heading: "Rules that break the build.",
            body: (
              <>
                <p>
                  Three invariants are treated as build failures, never as style: the temporal
                  firewall, byte-for-byte reproducibility, and schemas as contracts.
                </p>
                <Points
                  items={[
                    <>
                      The only way to merge two time series is <Code>as_of_join</Code>, backwards,
                      on monotonic timestamps — a naive join can round a timestamp forward and leak
                      the future silently.
                    </>,
                    <>
                      A planted corpus of future-dated rows fails CI if any stage ever touches it,
                      and property-based tests check that every transform keeps time moving forward.
                    </>,
                    <>
                      Every run is identified by the hash of its corpus, persona, model, seed and
                      lockfile. Same inputs, byte-identical outputs — that is a unit test, not a
                      hope.
                    </>,
                    <>
                      Every expensive stage is cached by the hash of its inputs, so changing a
                      persona re-runs only inference, never tokenisation.
                    </>,
                  ]}
                />
              </>
            ),
          },
          {
            label: "Personas",
            heading: "The persona space is the search space.",
            body: (
              <>
                <p>
                  Each analyst persona is a versioned TOML file. Changing one bumps its version, so
                  every ledger row can be traced to the exact prompt that wrote it — and prompt
                  engineering becomes something you can measure, persona against persona, in
                  elimination brackets across rolling windows.
                </p>
                <ul className="grid grid-cols-1 gap-0 border-2 border-[var(--color-border)] sm:grid-cols-2">
                  {PERSONAS.map((p, i) => (
                    <li
                      key={p}
                      className={
                        "border-[var(--color-border)] p-3 font-mono text-sm" +
                        (i < PERSONAS.length - 1 ? " border-b-2" : "") +
                        (i === PERSONAS.length - 2 ? " sm:border-b-0" : "") +
                        (i % 2 === 0 ? " sm:border-r-2" : "")
                      }
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            label: "Decisions",
            heading: "Eight decisions, written down.",
            body: (
              <ol className="flex flex-col gap-2 font-mono text-sm">
                {ADRS.map((a, i) => (
                  <li key={a} className="grid grid-cols-[3rem_1fr] gap-2">
                    <span className="text-[var(--color-muted)]">
                      {String(i + 1).padStart(4, "0")}
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            ),
          },
          {
            label: "Status",
            heading: "Built ahead of the hardware.",
            body: (
              <>
                <p>
                  The workstation this is designed for — a 32GB GPU, 128GB of RAM and a Gen5 NVMe
                  drive — hasn&apos;t arrived. Rather than wait, everything that doesn&apos;t need
                  it is built: all of Module II, the plumbing of Module I, the Module III bridge,
                  the persona library, the reproducibility hashing and the leak tests.
                </p>
                <p>
                  A synthetic Alpha Ledger generator drives the whole pipeline end to end on
                  today&apos;s machine, and a written runbook covers the day the hardware lands:
                  swap the stand-in model for DeepSeek-R1 32B, point it at the real corpus, run.
                  Until then there are no results here — only a harness that can&apos;t lie about
                  them.
                </p>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
