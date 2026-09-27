import { OG_SIZE, renderProjectOg } from "@/lib/og-project";

export const runtime = "edge";
export const alt =
  "SpendInCheck — a personal finance tracker that tells you whether you're on budget";
export const size = OG_SIZE;
export const contentType = "image/png";

// .theme-spendincheck tokens (brass ledger, dark)
export default async function Image() {
  return renderProjectOg({
    position: 2,
    name: "SpendInCheck",
    tagline: "Know whether you're on budget — not just what you spent.",
    status: "Live — open demo",
    footerLeft: "React · Flask · Postgres · raw SQL",
    footerRight: "spendincheck.com",
    colors: {
      bg: "#14110e",
      fg: "#ede6dc",
      muted: "#9c8f7d",
      primary: "#e0a836",
      border: "#4a3f33",
    },
  });
}
