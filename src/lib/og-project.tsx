import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";

/**
 * Shared 1200×630 share card for the case-study projects. Same layout
 * as the bespoke StockSaathi / BolHisaab / MagLock cards — mono top row,
 * hairline, huge name in the project's primary, tagline, stat footer —
 * parameterised by the project's own tokens so each one still looks
 * like its world.
 *
 * Satori constraints: every multi-child <div> needs display:flex, and
 * gradients must be linear-gradient() strings.
 */

export type ProjectOgColors = {
  bg: string;
  fg: string;
  muted: string;
  primary: string;
  border: string;
};

export type ProjectOgArgs = {
  position: number;
  name: string;
  tagline: string;
  status: string;
  footerLeft: string;
  footerRight: string;
  colors: ProjectOgColors;
  /** Font family for the display name; defaults to Space Grotesk. */
  displayFont?: "Space Grotesk" | "JetBrains Mono";
};

export const OG_SIZE = { width: 1200, height: 630 };

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export async function renderProjectOg(args: ProjectOgArgs) {
  const { position, name, tagline, status, footerLeft, footerRight, colors } = args;
  const fonts = await loadOgFonts();
  const rgb = hexToRgb(colors.primary);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.bg,
        color: colors.fg,
        fontFamily: "Space Grotesk",
        display: "flex",
        flexDirection: "column",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, rgba(${rgb},0.16) 0%, rgba(${rgb},0) 55%)`,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: colors.muted,
          fontFamily: "JetBrains Mono",
        }}
      >
        <span>aliarbab2009.com / projects / {position.toString().padStart(2, "0")}</span>
        <span style={{ color: colors.primary }}>• {status}</span>
      </div>
      <div style={{ marginTop: 24, height: 1, background: colors.border, width: "100%" }} />
      <div
        style={{
          display: "flex",
          fontSize: name.length > 12 ? 120 : 148,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          color: colors.primary,
          marginTop: 64,
          fontFamily: args.displayFont ?? "Space Grotesk",
        }}
      >
        {name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 40,
          letterSpacing: "-0.015em",
          lineHeight: 1.15,
          marginTop: 24,
          maxWidth: 1020,
        }}
      >
        {tagline}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: colors.muted,
          fontFamily: "JetBrains Mono",
        }}
      >
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
