import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slab } from "./Slab";

const meta: Meta<typeof Slab> = {
  title: "Screens/Slab",
  component: Slab,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "surface",
      values: [{ name: "surface", value: "#f3f3f3" }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slab>;

export const Default: Story = {};
