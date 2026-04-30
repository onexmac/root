import figma from "@figma/code-connect";
import { Button } from "./Button";

/**
 * Vincula el componente Button de React con su nodo en Figma.
 * Nodo: https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=434-2434
 */
figma.connect(
  Button,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=434-2434",
  {
    props: {
      label: figma.string("label"),
      variant: figma.enum("variant", {
        primary: "primary",
        secondary: "secondary",
        disabled: "disabled",
      }),
      state: figma.enum("state", {
        standard: "standard",
        pressed: "pressed",
        disabled: "disabled",
      }),
    },
    example: ({ label, variant, state }) => (
      <Button label={label} variant={variant} state={state} />
    ),
  }
);
