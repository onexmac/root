import { create } from "@storybook/theming/create";

export const adelanteTheme = create({
  base: "dark",

  // ── Branding ──────────────────────────────────────────────────────────────
  brandTitle: "Adelante Design System",
  brandUrl: "https://adelante-web.vercel.app",
  brandImage: undefined, // agrega una URL a tu logo si tienes
  brandTarget: "_blank",

  // ── Colores del UI (sidebar, toolbar, fondo) ──────────────────────────────
  colorPrimary:   "#ADD010",   // ds-color-green-100
  colorSecondary: "#ADD010",

  // App background
  appBg:           "#0d0d0d",
  appContentBg:    "#111111",
  appPreviewBg:    "#1a1a1a",
  appBorderColor:  "#2a2a2a",
  appBorderRadius: 8,

  // ── Toolbar ───────────────────────────────────────────────────────────────
  barTextColor:      "#8a8a8a",
  barHoverColor:     "#ADD010",
  barSelectedColor:  "#ADD010",
  barBg:             "#0d0d0d",

  // ── Sidebar ───────────────────────────────────────────────────────────────
  textColor:             "#e8e8e8",
  textInverseColor:      "#000000",
  textMutedColor:        "#5d636c",

  // Input fields inside Storybook
  inputBg:           "#1a1a1a",
  inputBorder:       "#2a2a2a",
  inputTextColor:    "#e8e8e8",
  inputBorderRadius: 4,

  // Typography
  fontBase:       '"Roboto", "Segoe UI", sans-serif',
  fontCode:       '"Roboto Mono", monospace',
});
