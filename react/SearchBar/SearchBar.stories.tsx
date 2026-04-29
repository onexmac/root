import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "Core/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["standard", "pressed"],
    },
    layout: {
      control: "select",
      options: ["label", "normal", "icon"],
    },
  },
  args: {
    placeholder: "Buscar...",
    state: "standard",
    layout: "label",
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {
  args: {
    layout: "label",
  },
};

export const Normal: Story = {
  args: {
    layout: "normal",
  },
};

export const IconOnly: Story = {
  args: {
    layout: "icon",
  },
};

export const Pressed: Story = {
  args: {
    state: "pressed",
  },
};
