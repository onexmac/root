import figma from "@figma/code-connect";
import { ToggleCards } from "./ToggleCards";

figma.connect(
  ToggleCards,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=1023-3745",
  {
    props: {
      state: figma.enum("state", {
        standard: "standard",
        pressed: "pressed",
        disabled: "disabled",
      }),
      visibility: figma.enum("visibility", {
        open: "open",
        hidden: "hidden",
      }),
    },
    example: ({ state, visibility }) => (
      <ToggleCards state={state} visibility={visibility} />
    ),
  }
);
