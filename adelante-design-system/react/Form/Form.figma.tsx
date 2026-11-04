import figma from "@figma/code-connect";
import { FormField } from "./Form";

figma.connect(
  FormField,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=763-2791",
  {
    example: () => (
      <FormField label="Nombre" placeholder="Escribe aquí" state="default" />
    ),
  }
);
