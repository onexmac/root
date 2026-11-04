import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideButton } from "./SlideButton";

const meta: Meta<typeof SlideButton> = {
  title: "Button/SlideButton",
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

export const GuardarStandard: Story = { name: "mode: guardar / state: standard", args: { mode: "guardar", state: "standard" } };
export const GuardarPressed:  Story = { name: "mode: guardar / state: pressed",  args: { mode: "guardar", state: "pressed"  } };
export const EliminarStandard: Story = { name: "mode: eliminar / state: standard", args: { mode: "eliminar", state: "standard", label: "Eliminar" } };
export const EliminarPressed:  Story = { name: "mode: eliminar / state: pressed",  args: { mode: "eliminar", state: "pressed",  label: "Eliminar" } };
