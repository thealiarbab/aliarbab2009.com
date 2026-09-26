import { OG_SIZE, renderProjectOg } from "@/lib/og-project";

export const runtime = "edge";
export const alt = "Sovereign Alpha — a deterministic, fully local simulation of 2015–2025 markets";
export const size = OG_SIZE;
export const contentType = "image/png";

// .theme-sovereign-alpha tokens (amber terminal, dark)
export default async function Image() {
  return renderProjectOg({
    position: 5,
    name: "Sovereign Alpha",
    tagline: "A backtest that cannot see its own future.",
    status: "Research — built ahead of hardware",
    footerLeft: "Polars · as_of_join · Hypothesis · UE5",
    footerRight: "github.com/thealiarbab",
    displayFont: "JetBrains Mono",
    colors: {
      bg: "#0a0a08",
      fg: "#f2ead8",
      muted: "#8f8672",
      primary: "#ffb000",
      border: "#2a2618",
    },
  });
}
