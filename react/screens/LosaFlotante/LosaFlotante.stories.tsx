import type { Meta, StoryObj } from "@storybook/react-vite";
import { LosaFlotante } from "./LosaFlotante";

const meta: Meta<typeof LosaFlotante> = {
  title: "H4/Losa Flotante",
  component: LosaFlotante,
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        component:
          "Prototipo mobile H4 — feed de usuarios (M1) + NUEVO USUARIO sheet con " +
          "morph FAB → sheet (M2). Stubs flagged como NOT-IN-DS son candidatos a " +
          "promoción al DS: mobile bottom action bar, FAB → bottom-sheet morph, " +
          "UserCard collapsed↔expanded, Tag con trailing icon (Activo ✓), paired " +
          "Rol→Obras con hairline, two-tab segmented toggle, sheet drag-handle, " +
          "content cascade helper.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LosaFlotante>;

export const Default: Story = {};
