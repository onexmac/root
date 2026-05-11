import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoletaPedido } from "./BoletaPedido";

const meta: Meta<typeof BoletaPedido> = {
  title: "Screens/BoletaPedido",
  component: BoletaPedido,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BoletaPedido>;

export const Default: Story = {};
