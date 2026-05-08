import figma from "@figma/code-connect";
import { Card } from "./Card";

figma.connect(
  Card,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=1027-3998",
  {
    example: () => (
      <Card
        title="Resumen"
        description="Detalle de la tarjeta"
        variant="default"
      />
    ),
  }
);
