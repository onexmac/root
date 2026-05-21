import type { Meta, StoryObj } from "@storybook/react-vite";
import { Test1v2 } from "./Test1v2";

const meta: Meta<typeof Test1v2> = {
  title: "Screens/Test1 v2",
  component: Test1v2,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Test1v2>;

export const Default: Story = {};
