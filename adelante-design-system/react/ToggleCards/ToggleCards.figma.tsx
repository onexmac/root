import figma from "@figma/code-connect";
import { ToggleCards } from "./ToggleCards";

/**
 * Props reales en Figma:
 *   state: standard | pressed
 *   mode: normal | disabled
 *   size: big | small
 *   visibility: open | close
 */
figma.connect(
  ToggleCards,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=1023-3745",
  {
    props: {
      state: figma.enum("state", {
        standard: "standard",
        pressed: "pressed",
      }),
      visibility: figma.enum("visibility", {
        open: "open",
        close: "close",
      }),
    },
    example: ({ state, visibility }) => (
      <ToggleCards state={state} visibility={visibility} />
    ),
  }
);
