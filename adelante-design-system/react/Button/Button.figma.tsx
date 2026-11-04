import figma from "@figma/code-connect";
import { Button } from "./Button";

/**
 * Vincula el componente Button de React con su nodo en Figma.
 * Nodo: https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=434-2434
 *
 * Props reales en Figma (para referencia):
 *   color: green | red | gray | white | black
 *   layout: Label | Icon | Icon Left | Icon Right
 *   mode: normal | disabled
 *   state: primary_standard | primary_pressed | secundary_standard | secundary_pressed
 */
figma.connect(
  Button,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=434-2434",
  {
    example: () => <Button label="label" variant="primary" state="standard" />,
  }
);
