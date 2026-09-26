import { OG_SIZE, renderProjectOg } from "@/lib/og-project";

export const runtime = "edge";
export const alt = "LameCRAFT — self-hosted server and the Command Nexus design system";
export const size = OG_SIZE;
export const contentType = "image/png";

// .theme-lamecraft tokens (Command Nexus)
export default async function Image() {
  return renderProjectOg({
    position: 6,
    name: "LameCRAFT",
    tagline: "A home server, its control panel, and a design system written as data.",
    status: "Self-hosted — private by design",
    footerLeft: "FastAPI · Cloudflare Tunnel · Command Nexus",
    footerRight: "aliarbab2009.com",
    displayFont: "JetBrains Mono",
    colors: {
      bg: "#030306",
      fg: "#b8c4d8",
      muted: "#7080a0",
      primary: "#00d4ff",
      border: "#1e1e36",
    },
  });
}
