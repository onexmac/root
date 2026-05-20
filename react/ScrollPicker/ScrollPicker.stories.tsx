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

/* ─── Default state ──────────────────────────────────────────────── */

export const Default: Story = {
  name: "Default (incompleto)",
  args: {
    open: false,
    initialValue: 3,
    contextLabel: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V",
    variant: "default",
  },
  render: (args) => <Demo {...args} />,
};

/* ─── All variants ───────────────────────────────────────────────── */

export const Pendiente: Story = {
  args: {
    open: false,
    initialValue: 0,
    contextLabel: "TUBO PVC 4 PULGADAS",
    variant: "pendiente",
  },
  render: (args) => <Demo {...args} />,
};

export const Ok: Story = {
  name: "Completo (ok)",
  args: {
    open: false,
    initialValue: 10,
    contextLabel: "CEMENTO PORTLAND 50KG",
    variant: "ok",
  },
  render: (args) => <Demo {...args} />,
};

export const Alert: Story = {
  name: "Sin stock (alert)",
  args: {
    open: false,
    initialValue: 25,
    contextLabel: "VARILLA DE HIERRO 12MM",
    variant: "alert",
  },
  render: (args) => <Demo {...args} />,
};

/* ─── Edge: valor mínimo ─────────────────────────────────────────── */

export const ValueMinimum: Story = {
  name: "Value: 0 (mínimo)",
  args: {
    open: false,
    initialValue: 0,
    contextLabel: "ARENA LAVADA M3",
    variant: "pendiente",
    min: 0,
    max: 50,
  },
  render: (args) => <Demo {...args} />,
};

/* ─── Edge: valor máximo ─────────────────────────────────────────── */

export const ValueMaximum: Story = {
  name: "Value: 999 (máximo)",
  args: {
    open: false,
    initialValue: 999,
    contextLabel: "CLAVOS 2 PULGADAS",
    variant: "sin-stock",
    min: 0,
    max: 999,
  },
  render: (args) => <Demo {...args} />,
};

/* ─── Abierto por defecto (para visual testing) ──────────────────── */

export const OpenByDefault: Story = {
  name: "Abierto por defecto",
  args: {
    open: true,
    initialValue: 5,
    contextLabel: "BLOCK 15CM x 20CM x 40CM",
    variant: "completo",
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
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
  },
};

/* ─── Custom range ───────────────────────────────────────────────── */

export const CustomRange: Story = {
  name: "Rango personalizado (1-20)",
  args: {
    open: false,
    initialValue: 10,
    contextLabel: "LÁMINA ZINC 12 PIES",
    variant: "incompleto",
    min: 1,
    max: 20,
  },
  render: (args) => <Demo {...args} />,
};
