import figma from "@figma/code-connect";
import { Icon } from "./Icon";

figma.connect(
  Icon,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=639-2191",
  {
    example: () => <Icon name="home" size="md" />,
  }
);
