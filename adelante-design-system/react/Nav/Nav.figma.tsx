import figma from "@figma/code-connect";
import { Nav } from "./Nav";

figma.connect(
  Nav,
  "https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=1023-3659",
  {
    example: () => (
      <Nav
        variant="sidebar"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Dashboard", href: "/dashboard", active: true },
        ]}
      />
    ),
  }
);
