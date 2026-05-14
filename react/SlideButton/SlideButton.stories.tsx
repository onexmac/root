import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideButton } from "./SlideButton";

const meta: Meta<typeof SlideButton> = {
  title: "Sistema de Diseño/SlideButton",
  component: SlideButton,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SlideButton>;

export const Default: Story = {
  args: {
    label: "Pedir",
    confirmedLabel: "Confirmado",
    onConfirm: () => console.log("confirmed"),
  },
};


