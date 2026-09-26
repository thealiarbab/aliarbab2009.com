import type { Metadata } from "next";

import { CaseStudy, Code, Points } from "@/components/project/case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { getProjectBySlug } from "@/config/projects";
import { projectJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

const project = getProjectBySlug("spendincheck")!;

export const metadata: Metadata = buildMetadata({
  title: "SpendInCheck — on budget, not just spent",
  description:
    "A personal finance tracker that answers 'am I over or under?'. Started as a Class XII CS practical in Python and SQL, rebuilt in React on a Flask and Postgres API.",
  path: "/projects/spendincheck",
  ogImageAlt: "SpendInCheck — a personal finance tracker that tells you whether you're on budget",
  ogType: "article",
  publishedTime: `${project.startedISO}T00:00:00.000Z`,
  keywords: ["SpendInCheck", "Personal finance", "Budgeting", "React", "Flask", "PostgreSQL"],
});

const REPORTS: ReadonlyArray<readonly [string, string]> = [
  ["Category-wise spend", "Where did the money actually go this month?"],
  ["Budget vs actual", "Which categories blew past their limit, and by how much?"],
  ["Portfolio P&L", "Which holdings are up, which are down, what's the net?"],
  ["Net worth over time", "What am I worth, month by month, at the prices of the time?"],
  ["Income and expense", "What came in against what went out, over the last year?"],
  ["Cashflow running total", "Is the gap between them widening or closing?"],
  ["Against the market", "Did my holdings beat the index, with quantities held constant?"],
  ["Where it goes", "Which payees take the most, and how often?"],
];

export default function SpendInCheckPage() {
  return (
    <>
      <JsonLd data={projectJsonLd("spendincheck")} />
      <CaseStudy
        project={project}
        statsAsOf="2026-09-13"
        stats={[
          { value: "8", label: "Reports" },
          { value: "174ms", label: "Open the demo (was 3,100)" },
          { value: "42ms", label: "A year of reports (was 1,496)" },
          { value: "17", label: "Ordered SQL migrations" },
        ]}
        sections={[
          {
            label: "Origin",
            heading: "From a practical file to a product.",
            body: (
              <>
                <p>
                  SpendInCheck began as my Class XII Computer Science practical. The rules were
                  strict: Python, a real SQL database, every query written out by hand with{" "}
                  <Code>%s</Code> placeholders, and code I could defend line by line in a viva. The
                  one decision that mattered most came from that brief — every query lives in a
                  single <Code>operations</Code> module that returns plain data and never prints. A
                  console app and a web app both called the same functions, with zero duplicated
                  SQL.
                </p>
                <p>
                  After the practical was submitted I kept going. The server-rendered pages were
                  deleted and replaced with a React + TypeScript client over a Flask JSON API, and
                  the database moved to PostgreSQL on Supabase. Because the SQL already lived in one
                  place, rebuilding the entire frontend needed no new queries at all.
                </p>
              </>
            ),
          },
          {
            label: "Reports",
            heading: "Eight questions a list of transactions can't answer.",
            body: (
              <ul className="border-2 border-[var(--color-border)]">
                {REPORTS.map(([name, question], i) => (
                  <li
                    key={name}
                    className={
                      "grid grid-cols-12 gap-x-4 gap-y-1 p-4" +
                      (i < REPORTS.length - 1 ? " border-b-2 border-[var(--color-border)]" : "")
                    }
                  >
                    <span className="col-span-12 font-mono text-sm font-medium text-[var(--color-primary)] sm:col-span-4">
                      {name}
                    </span>
                    <span className="col-span-12 text-sm sm:col-span-8">{question}</span>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            label: "Architecture",
            heading: "All SQL in one place, and nothing that runs twice.",
            body: (
              <Points
                items={[
                  <>
                    <strong className="font-medium">One module owns the database.</strong> Routes
                    call a function and present whatever comes back. The package is split by domain
                    but re-exports every name, so callers still write{" "}
                    <Code>operations.add_transaction(...)</Code>.
                  </>,
                  <>
                    <strong className="font-medium">
                      The server answers the API and nothing else.
                    </strong>{" "}
                    The site is a built bundle served from the edge, split per route, so a page load
                    never wakes Python — only the data it asks for does.
                  </>,
                  <>
                    <strong className="font-medium">
                      Three scheduled jobs, each safe to run twice.
                    </strong>{" "}
                    A nightly close-price snapshot, a recurring-transaction sweep and a clean-up of
                    abandoned demo accounts. The sweep advances a rule and writes its row in one
                    transaction, with a unique index making a repeat a no-op rather than a double
                    entry.
                  </>,
                  <>
                    <strong className="font-medium">Transfers are two rows sharing a group.</strong>{" "}
                    Money moving between your own accounts is neither income nor spending, and every
                    report knows it.
                  </>,
                  <>
                    <strong className="font-medium">Tests run against a real Postgres.</strong> A
                    query that forgets its <Code>user_id</Code> filter looks correct in Python and
                    only misbehaves in the database, so a mocked cursor would pass exactly the bug
                    worth catching. The suite also asserts one account can never reach
                    another&apos;s rows.
                  </>,
                  <>
                    <strong className="font-medium">
                      The database is closed to everything but the app.
                    </strong>{" "}
                    Supabase exposes every public table to its publishable key by default. Row-level
                    security is on for all of them with no policies, and the default grants are
                    revoked so a future table can&apos;t reopen it.
                  </>,
                ]}
              />
            ),
          },
          {
            label: "Integration",
            heading: "Priced by StockSaathi, my other product.",
            body: (
              <>
                <p>
                  Point a holding at an NSE symbol and SpendInCheck fetches its price instead of
                  asking you to type one. Every quote, fund NAV and instrument name comes from{" "}
                  <a
                    href="/projects/stocksaathi"
                    className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
                  >
                    StockSaathi
                  </a>
                  &apos;s public API and its published instrument universe — two products of mine
                  talking to each other, rather than both scraping the same upstream.
                </p>
                <Points
                  items={[
                    <>
                      The two feeds disagree on units: live quotes arrive in rupees, history in
                      paise. One service owns that conversion so the rest of the app never sees it.
                    </>,
                    <>
                      A nightly job records each tracked symbol&apos;s close, so net worth for a
                      past month is valued at what things were actually worth <em>then</em>, not at
                      today&apos;s price.
                    </>,
                    <>
                      &ldquo;Against the market&rdquo; compares the portfolio with an index ETF at
                      today&apos;s quantities in every month — otherwise a month of heavy saving
                      reads as spectacular returns.
                    </>,
                  ]}
                />
              </>
            ),
          },
          {
            label: "Performance",
            heading: "Measured, not asserted.",
            body: (
              <>
                <p>
                  Every figure on this page came from a benchmark script, not from reasoning about
                  the code. Against the database pooler, opening a connection costs about 182ms and
                  each round trip about 28ms whatever it carries — so the SQL itself is noise, and
                  making a screen fast means counting statements. Connections are pooled and kept
                  warm, and every read endpoint is one round trip.
                </p>
                <p>
                  The pooler also taught me not to trust a number I hadn&apos;t measured: Postgres
                  reports a limit of sixty connections, but the pooler in front of it hands out
                  sixteen, and the seventeenth connects fine and then dies on first use.
                </p>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
