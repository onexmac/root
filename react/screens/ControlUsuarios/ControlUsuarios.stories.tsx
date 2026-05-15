import type { Meta, StoryObj } from "@storybook/react-vite";
import { ControlUsuarios } from "./ControlUsuarios";

const meta: Meta<typeof ControlUsuarios> = {
  title: "H4/Control de usuarios",
  component: ControlUsuarios,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Prototipo interactivo H4 — 10 frames (U01–U05, R01–R02, CUA01–CUA03) " +
          "unificados en un shell con sidebar + drawer + state machine local. " +
          "Estado optimistic (local), sin red. R01/R02 contienen stubs marcados " +
          "para componentes que no existen en el DS.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ControlUsuarios>;

export const Default: Story = {};
