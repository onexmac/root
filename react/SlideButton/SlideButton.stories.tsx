import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideButton } from "./SlideButton";

const meta: Meta<typeof SlideButton> = {
  title: "Components/SlideButton",
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

export const Save: Story = {
  args: {
    label: "Guardar",
    confirmedLabel: "Guardado",
    onConfirm: () => console.log("saved"),
  },
};

export const Disabled: Story = {
  args: {
    label: "Pedir",
    disabled: true,
    disabledLabel: "Agregá un material",
    onConfirm: () => console.log("not callable"),
  },
};
