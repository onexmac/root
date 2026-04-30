import figma from "@figma/code-connect";
import { Card } from "./Card";

figma.connect(
  Card,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=1027-3998",
  {
    props: {
      title: figma.string("title"),
      description: figma.string("description"),
      variant: figma.enum("variant", {
        default: "default",
        outlined: "outlined",
        filled: "filled",
      }),
    },
    example: ({ title, description, variant }) => (
      <Card title={title} description={description} variant={variant} />
    ),
  }
);
