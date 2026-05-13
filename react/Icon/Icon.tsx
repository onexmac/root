import React from "react";
import {
  House,
  User,
  Folder,
  CaretUp,
  ArrowRight,
  ArrowLeft,
  MagnifyingGlass,
  ArrowCircleRight,
  Check,
  List,
  Receipt,
  ArrowsLeftRight,
  Truck,
  Prohibit,
  CheckCircle,
  CircleHalf,
  Circle,
  MinusCircle,
  Funnel,
  X,
  PencilSimple,
  Info,
  Plus,
  Minus,
  Trash,
  MapPin,
  Warning,
  Calculator,
  CaretDown,
} from "@phosphor-icons/react";

// ─── Catálogo de íconos — mirror exacto del nodo Figma 1153-3008 ──────────────
// Nombres en kebab-case = nomenclatura del Figma "Losa Flotante"

// Catálogo exacto del nodo Figma 1153-3008 — 29 íconos Phosphor Bold
export type IconName =
  | "home"
  | "user"
  | "folder"
  | "open"
  | "arrow-right"
  | "back"
  | "search"
  | "go"
  | "check"
  | "list"
  | "boleta"
  | "traslado"
  | "entrega"
  | "sin-stock"
  | "completado"
  | "incompleto"
  | "pendiente"
  | "sin-autorizar"
  | "filter"
  | "close"
  | "edit"
  | "info"
  | "plus"
  | "minus"
  | "delete"
  | "place"
  | "alert"
  | "remove"
  | "calculator";

/** Alias backward-compatible para código existente. */
const ALIASES: Record<string, string> = {
  arrow:          "arrow-right",
  chevron:        "chevron-down", // legacy — no está en Figma
  "chevron-left": "back",
  warning:        "alert",
};

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  /** Nombre del ícono (mirror del catálogo Figma). Nombres desconocidos no renderizan nada. */
  name: IconName | string;
  size?: IconSize;
  color?: string;
  className?: string;
}

const SIZE_MAP: Record<IconSize, number> = { sm: 16, md: 20, lg: 24 };

// Mapa nombre DS → componente Phosphor
// ICON_MAP usa Record<string, ...> para permitir alias legacy (chevron-down) sin romper el tipo IconName
const ICON_MAP: Record<string, React.ElementType> = {
  // ── 29 íconos oficiales Figma 1153-3008 ──
  home:           House,
  user:           User,
  folder:         Folder,
  open:           CaretUp,
  "arrow-right":  ArrowRight,
  back:           ArrowLeft,
  search:         MagnifyingGlass,
  go:             ArrowCircleRight,
  check:          Check,
  list:           List,
  boleta:         Receipt,
  traslado:       ArrowsLeftRight,
  entrega:        Truck,
  "sin-stock":    Prohibit,
  completado:     CheckCircle,
  incompleto:     CircleHalf,
  pendiente:      Circle,
  "sin-autorizar": MinusCircle,
  filter:         Funnel,
  close:          X,
  edit:           PencilSimple,
  info:           Info,
  plus:           Plus,
  minus:          Minus,
  delete:         Trash,
  place:          MapPin,
  alert:          Warning,
  remove:         MinusCircle,
  calculator:     Calculator,
  // ── legacy (no está en Figma, solo para compat con pantallas) ──
  "chevron-down": CaretDown,
};

export function Icon({ name, size = "md", color = "currentColor", className }: IconProps) {
  const px = SIZE_MAP[size];
  const resolved = (ALIASES[name as string] ?? name) as IconName;
  const PhosphorIcon = ICON_MAP[resolved];

  if (!PhosphorIcon) return null;

  return (
    <PhosphorIcon
      weight="bold"
      className={`ds-icon ds-icon--${resolved} ds-icon--${size}${className ? " " + className : ""}`}
      size={px}
      color={color}
      aria-hidden="true"
    />
  );
}
