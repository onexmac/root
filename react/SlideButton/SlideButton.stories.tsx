import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideButton } from "./SlideButton";

const meta: Meta<typeof SlideButton> = {
  title: "Buttons",
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

/** Standard — reposo, listo para deslizar. */
export const Standard: Story = {};
