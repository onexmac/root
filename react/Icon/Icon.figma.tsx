import figma from "@figma/code-connect";
import { Icon } from "./Icon";

figma.connect(
  Icon,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=620-2342",
  {
    props: {
      name: figma.string("name"),
      size: figma.enum("size", {
        sm: "sm",
        md: "md",
        lg: "lg",
      }),
    },
    example: ({ name, size }) => <Icon name={name} size={size} />,
  }
);
