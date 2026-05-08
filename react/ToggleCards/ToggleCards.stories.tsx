import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ToggleCards } from "./ToggleCards";

const meta: Meta<typeof ToggleCards> = {
  title: "Core/ToggleCards",
  component: ToggleCards,
  tags: ["autodocs"],
  argTypes: {
    state:      { control: "select", options: ["standard", "pressed"] },
    mode:       { control: "select", options: ["normal", "disabled"] },
    visibility: { control: "select", options: ["open", "close"] },
    size:       { control: "select", options: ["big", "small"] },
  },
  args: { state: "standard", mode: "normal", visibility: "open", size: "small" },
};
export default meta;
type Story = StoryObj<typeof ToggleCards>;

export const SmallOpen:  Story = { args: { size: "small", visibility: "open"  } };
export const SmallClose: Story = { args: { size: "small", visibility: "close" } };
export const BigOpen:    Story = { args: { size: "big",   visibility: "open"  } };
export const Pressed:    Story = { args: { state: "pressed" } };
export const Disabled:   Story = { args: { mode: "disabled" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, max-content)", gap: 12, padding: 16 }}>
      {(["small", "big"] as const).flatMap((size) =>
        (["open", "close"] as const).flatMap((vis) =>
          (["standard", "pressed"] as const).map((state) => (
            <ToggleCards key={`${size}-${vis}-${state}`} size={size} visibility={vis} state={state} />
          ))
        )
      )}
    </div>
  ),
};
