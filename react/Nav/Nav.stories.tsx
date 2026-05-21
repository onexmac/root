import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { NavigationControls, FilterOptions, ToggleMenu } from "./Nav";

const meta: Meta<typeof NavigationControls> = {
  title: "Nav/Nav",
  component: NavigationControls,
  tags: ["autodocs"],
  argTypes: {
    state:      { control: "select", options: ["standard", "pressed"] },
    navigation: { control: "select", options: ["back", "go"] },
  },
  args: { state: "standard", navigation: "back" },
};
export default meta;
type Story = StoryObj<typeof NavigationControls>;

export const Back:    Story = { args: { navigation: "back"  } };
export const Go:      Story = { args: { navigation: "go"    } };
export const Pressed: Story = { args: { navigation: "back", state: "pressed" } };

export const NavigationAll: Story = {
  name: "Navigation / All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <NavigationControls navigation="back" state="standard" />
      <NavigationControls navigation="back" state="pressed" />
      <NavigationControls navigation="go"   state="standard" />
      <NavigationControls navigation="go"   state="pressed" />
    </div>
  ),
};

export const FilterOptionsAll: StoryObj = {
  name: "FilterOptions / All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <FilterOptions mode="normal" state="standard" />
      <FilterOptions mode="normal" state="pressed" />
      <FilterOptions mode="close"  state="standard" />
    </div>
  ),
};

export const ToggleMenuAll: StoryObj = {
  name: "ToggleMenu / All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <ToggleMenu mode="open"  state="standard" />
      <ToggleMenu mode="open"  state="pressed" />
      <ToggleMenu mode="close" state="standard" />
      <ToggleMenu mode="close" state="pressed" />
    </div>
  ),
};
