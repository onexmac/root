import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "disabled"],
    },
    state: {
      control: "select",
      options: ["standard", "pressed", "disabled"],
    },
  },
  args: {
    label: "label",
    variant: "primary",
    state: "standard",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Pressed: Story = {
  args: {
    state: "pressed",
  },
};

export const Disabled: Story = {
  args: {
    state: "disabled",
    variant: "disabled",
  },
};
