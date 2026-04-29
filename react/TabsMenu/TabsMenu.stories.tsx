import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabsMenu } from "./TabsMenu";

const meta = {
  title: "Core/TabsMenu",
  component: TabsMenu,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["standard", "pressed"],
    },
    layout: {
      control: "select",
      options: ["label", "label+icon"],
    },
  },
  args: {
    label: "LABEL",
    state: "standard",
    layout: "label",
  },
} satisfies Meta<typeof TabsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LabelWithIcon: Story = {
  args: {
    layout: "label+icon",
  },
};

export const Pressed: Story = {
  args: {
    state: "pressed",
  },
};
