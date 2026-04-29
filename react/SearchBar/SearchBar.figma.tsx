import figma from "@figma/code-connect";
import { SearchBar } from "./SearchBar";

figma.connect(
  SearchBar,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=1014-3556",
  {
    props: {
      state: figma.enum("state", {
        standard: "standard",
        pressed: "pressed",
      }),
      layout: figma.enum("layout", {
        label: "label",
        normal: "normal",
        icon: "icon",
      }),
    },
    example: ({ state, layout }) => (
      <SearchBar state={state} layout={layout} />
    ),
  }
);
