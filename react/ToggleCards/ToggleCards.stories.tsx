import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleCards } from "./ToggleCards";

const meta: Meta<typeof ToggleCards> = {
  title: "Sistema de Diseño/ToggleCards",
  component: ToggleCards,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: { type: "inline-radio" }, options: ["big", "small"] },
    visibility: { control: { type: "inline-radio" }, options: ["open", "close"] },
    state: { control: { type: "inline-radio" }, options: ["standard", "pressed"] },
    mode: { control: { type: "inline-radio" }, options: ["normal", "disabled"] },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleCards>;

export const BigOpen: Story = { args: { size: "big", visibility: "open" } };
export const BigOpenPressed: Story = { args: { size: "big", visibility: "open", state: "pressed" } };
export const BigClose: Story = { args: { size: "big", visibility: "close" } };
export const BigDisabled: Story = { args: { size: "big", visibility: "open", mode: "disabled" } };
export const BigDisabledPressed: Story = { args: { size: "big", visibility: "open", state: "pressed", mode: "disabled" } };
export const SmallOpen: Story = { args: { size: "small", visibility: "open" } };
export const SmallOpenPressed: Story = { args: { size: "small", visibility: "open", state: "pressed" } };
export const SmallClose: Story = { args: { size: "small", visibility: "close" } };
export const SmallClosePressed: Story = { args: { size: "small", visibility: "close", state: "pressed" } };
export const SmallDisabled: Story = { args: { size: "small", visibility: "open", mode: "disabled" } };
export const SmallDisabledPressed: Story = { args: { size: "small", visibility: "open", state: "pressed", mode: "disabled" } };
export const SmallDisabledClose: Story = { args: { size: "small", visibility: "close", mode: "disabled" } };
export const SmallDisabledClosePressed: Story = { args: { size: "small", visibility: "close", state: "pressed", mode: "disabled" } };
