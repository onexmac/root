import figma from "@figma/code-connect";
import { TabsMenu } from "./TabsMenu";

figma.connect(
  TabsMenu,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=1014-3648",
  {
    props: {
      state: figma.enum("state", {
        standard: "standard",
        pressed: "pressed",
      }),
      layout: figma.enum("layout", {
        label: "label",
        "label+icon": "label+icon",
      }),
    },
    example: ({ state, layout }) => (
      <TabsMenu label="LABEL" state={state} layout={layout} />
    ),
  }
);
