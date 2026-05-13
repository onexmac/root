import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollPicker } from "./ScrollPicker";

const meta: Meta<typeof ScrollPicker> = {
  title: "Sistema de Diseño/ScrollPicker",
  component: ScrollPicker,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ScrollPicker>;

const Demo = (args: React.ComponentProps<typeof ScrollPicker>) => {
  const [open, setOpen] = useState(args.open);
  const [value, setValue] = useState(args.initialValue);
  return (
    <div style={{ height: 600, padding: 24, background: "#f3f3f3" }}>
      <button onClick={() => setOpen(true)} style={{ padding: 12 }}>
        Abrir picker (valor actual: {value})
      </button>
      <ScrollPicker
        {...args}
        open={open}
        initialValue={value}
        onClose={() => setOpen(false)}
        onConfirm={(v) => {
          setValue(v);
          setOpen(false);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    open: false,
    initialValue: 3,
    contextLabel: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V",
    variant: "default",
  },
  render: (args) => <Demo {...args} />,
};

export const Ok: Story = {
  args: {
    open: false,
    initialValue: 10,
    contextLabel: "CEMENTO PORTLAND 50KG",
    variant: "ok",
  },
  render: (args) => <Demo {...args} />,
};

export const Alert: Story = {
  args: {
    open: false,
    initialValue: 25,
    contextLabel: "VARILLA DE HIERRO 12MM",
    variant: "alert",
  },
  render: (args) => <Demo {...args} />,
};
