import type { Meta, StoryObj } from "@storybook/react-vite";
import { Test1 } from "./Test1";

const meta: Meta<typeof Test1> = {
  title: "Screens/Test1",
  component: Test1,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Test1>;

export const Default: Story = {};
