// Tema Adelante para Storybook 10
// Sin dependencias externas — compatible con storybook@10.x

export const adelanteTheme = {
  base: "dark" as const,

  // Branding
  brandTitle: "Adelante Design System",
  brandUrl:   "https://adelante-web.vercel.app",
  brandTarget: "_blank",

  // Paleta principal
  colorPrimary:   "#ADD010",
  colorSecondary: "#ADD010",

  // Fondos de la app
  appBg:          "#0d0d0d",
  appContentBg:   "#111111",
  appPreviewBg:   "#1a1a1a",
  appBorderColor: "#2a2a2a",
  appBorderRadius: 8,

  // Toolbar
  barTextColor:     "#8a8a8a",
  barHoverColor:    "#ADD010",
  barSelectedColor: "#ADD010",
  barBg:            "#0d0d0d",

  // Texto
  textColor:        "#e8e8e8",
  textInverseColor: "#000000",
  textMutedColor:   "#5d636c",

  // Inputs
  inputBg:           "#1a1a1a",
  inputBorder:       "#2a2a2a",
  inputTextColor:    "#e8e8e8",
  inputBorderRadius: 4,

  // Tipografía
  fontBase: '"Roboto", "Segoe UI", sans-serif',
  fontCode: '"Roboto Mono", monospace',
};
