import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { FilterOptions } from "./Nav";

const meta: Meta<typeof FilterOptions> = {
  title: "Nav/FilterOptions",
  component: FilterOptions,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: ["standard", "pressed"] },
    mode:  { control: "select", options: ["normal", "close"] },
  },
  args: { state: "standard", mode: "normal" },
};
export default meta;
type Story = StoryObj<typeof FilterOptions>;

export const Normal:        Story = { args: { mode: "normal", state: "standard" } };
export const NormalPressed: Story = { args: { mode: "normal", state: "pressed" } };
export const Close:         Story = { args: { mode: "close",  state: "standard" } };

export const AllStates: StoryObj = {
  name: "All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <FilterOptions mode="normal" state="standard" />
      <FilterOptions mode="normal" state="pressed" />
      <FilterOptions mode="close"  state="standard" />
    </div>
  ),
};
