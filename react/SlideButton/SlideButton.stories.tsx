import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideButton } from "./SlideButton";

const meta: Meta<typeof SlideButton> = {
  title: "Sistema de Diseño/SlideButton",
  component: SlideButton,
  parameters: { layout: "centered" },
  args: {
    label: "Pedir",
    confirmedLabel: "Confirmado",
    onConfirm: () => console.log("confirmed"),
  },
};

export default meta;
type Story = StoryObj<typeof SlideButton>;

/** Standard — estado de reposo, listo para deslizar. */
export const Standard: Story = {};

/** Disabled — bloqueado, no se puede deslizar. */
export const Disabled: Story = {
  args: { disabled: true, disabledLabel: "No disponible" },
};
