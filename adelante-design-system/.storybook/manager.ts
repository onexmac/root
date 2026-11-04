import { addons } from "storybook/manager-api";
import { adelanteTheme } from "./theme";

addons.setConfig({
  theme: adelanteTheme,
  sidebar: { showRoots: true },
  panelPosition: "bottom",
  isToolshown: true,
});
