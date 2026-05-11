import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestScreens } from "./TestScreens";

const meta: Meta<typeof TestScreens> = {
  title: "Screens/Test1 v2",
  component: TestScreens,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof TestScreens>;

export const Default: Story = {};
