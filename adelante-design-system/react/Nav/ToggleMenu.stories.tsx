import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ToggleMenu } from "./Nav";

const meta: Meta<typeof ToggleMenu> = {
  title: "Nav/ToggleMenu",
  component: ToggleMenu,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: ["standard", "pressed"] },
    mode:  { control: "select", options: ["open", "close"] },
  },
  args: { state: "standard", mode: "open" },
};
export default meta;
type Story = StoryObj<typeof ToggleMenu>;

export const Open:         Story = { args: { mode: "open",  state: "standard" } };
export const OpenPressed:  Story = { args: { mode: "open",  state: "pressed" } };
export const Close:        Story = { args: { mode: "close", state: "standard" } };
export const ClosePressed: Story = { args: { mode: "close", state: "pressed" } };

export const AllStates: StoryObj = {
  name: "All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <ToggleMenu mode="open"  state="standard" />
      <ToggleMenu mode="open"  state="pressed" />
      <ToggleMenu mode="close" state="standard" />
      <ToggleMenu mode="close" state="pressed" />
    </div>
  ),
};
