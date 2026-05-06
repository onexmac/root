import type { Meta, StoryObj } from "@storybook/react-vite";
import { Boletas } from "./Boletas";

const meta: Meta<typeof Boletas> = {
  title: "Screens/Boletas",
  component: Boletas,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "surface",
      values: [{ name: "surface", value: "#f3f3f3" }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Boletas>;

export const Default: Story = {};
