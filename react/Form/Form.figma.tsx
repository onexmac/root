import figma from "@figma/code-connect";
import { FormField } from "./Form";

figma.connect(
  FormField,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=763-2791",
  {
    props: {
      label: figma.string("label"),
      placeholder: figma.string("placeholder"),
      state: figma.enum("state", {
        default: "default",
        error: "error",
        success: "success",
        disabled: "disabled",
      }),
    },
    example: ({ label, placeholder, state }) => (
      <FormField label={label} placeholder={placeholder} state={state} />
    ),
  }
);
