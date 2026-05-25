import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Buttons/secondaryButton",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    color:  { control: "select", options: ["black", "white"] },
    layout: { control: "select", options: ["label", "icon-left", "icon-right", "icon"] },
    state:  { control: "select", options: ["standard", "pressed"] },
    icon:   { control: "select", options: ["home", "check", "plus", "back", "forward", "search", "filter"] },
  },
  args: { label: "label", color: "black", layout: "label", state: "standard" },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const BlackStandard: Story = { name: "black / standard", args: { color: "black", state: "standard" } };
export const BlackPressed:  Story = { name: "black / pressed",  args: { color: "black", state: "pressed"  } };
export const WhiteStandard: Story = { name: "white / standard", args: { color: "white", state: "standard" } };
export const WhitePressed:  Story = { name: "white / pressed",  args: { color: "white", state: "pressed"  } };

export const AllVariants: StoryObj = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      {(["black", "white"] as const).map((c) => (
        <div key={c} style={{ display: "flex", gap: 12 }}>
          <Button color={c} label="label" layout="label"      state="standard" />
          <Button color={c} label="label" layout="icon-right" icon="forward"   state="standard" />
          <Button color={c} label="label" layout="icon-left"  icon="forward"   state="standard" />
          <Button color={c}               layout="icon"        icon="plus"      state="standard" />
        </div>
      ))}
    </div>
  ),
};
