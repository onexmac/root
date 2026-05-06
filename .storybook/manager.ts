import { addons } from "storybook/manager-api";
import { adelanteTheme } from "./theme";

addons.setConfig({
  theme: adelanteTheme,

  // Sidebar organizada: primero Screens, luego Core
  sidebar: {
    showRoots: true,
  },

  // Ocultar el panel inferior por defecto para más espacio al canvas
  panelPosition: "bottom",

  // Toolbar visible
  isToolshown: true,
});
