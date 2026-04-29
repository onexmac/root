import figma from "@figma/code-connect";
import { Nav } from "./Nav";

figma.connect(
  Nav,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=617-2207",
  {
    props: {
      variant: figma.enum("variant", {
        sidebar: "sidebar",
        topbar: "topbar",
      }),
    },
    example: ({ variant }) => (
      <Nav
        variant={variant}
        items={[
          { label: "Inicio", href: "/" },
          { label: "Dashboard", href: "/dashboard", active: true },
        ]}
      />
    ),
  }
);
