import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button/PrimaryButton",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    color:  { control: "select", options: ["red", "green", "gray"] },
    layout: { control: "select", options: ["label", "icon-left", "icon-right", "icon"] },
    state:  { control: "select", options: ["standard", "pressed", "disabled"] },
    icon:   { control: "select", options: ["home", "check", "plus", "back", "forward", "search", "filter"] },
  },
  args: { label: "label", color: "red", layout: "label", state: "standard" },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const RedStandard:   Story = { name: "red / standard",   args: { color: "red",   state: "standard" } };
export const RedPressed:    Story = { name: "red / pressed",    args: { color: "red",   state: "pressed"  } };
export const GreenStandard: Story = { name: "green / standard", args: { color: "green", state: "standard" } };
export const GreenPressed:  Story = { name: "green / pressed",  args: { color: "green", state: "pressed"  } };
export const GrayDisabled:  Story = { name: "gray / disabled",  args: { color: "gray",  state: "disabled" } };

export const AllVariants: StoryObj = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      {(["red", "green"] as const).map((c) => (
        <div key={c} style={{ display: "flex", gap: 12 }}>
          <Button color={c} label="label" layout="label"      state="standard" />
          <Button color={c} label="label" layout="icon-right" icon="forward"   state="standard" />
          <Button color={c} label="label" layout="icon-left"  icon="forward"   state="standard" />
          <Button color={c}               layout="icon"        icon="plus"      state="standard" />
        </div>
      ))}
      <div style={{ display: "flex", gap: 12 }}>
        <Button color="gray" label="label" layout="label"      state="disabled" />
        <Button color="gray" label="label" layout="icon-right" icon="forward"   state="disabled" />
        <Button color="gray" label="label" layout="icon-left"  icon="forward"   state="disabled" />
        <Button color="gray"               layout="icon"        icon="plus"      state="disabled" />
      </div>
    </div>
  ),
};
