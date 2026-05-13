import React from "react";
import {
  House,
  User,
  Folder,
  Package,
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
  Clock,
  Funnel,
  X,
  PencilSimple,
  Info,
  Plus,
  Minus,
  Trash,
  MapPin,
  Warning,
  MinusCircle,
  Calculator,
  CaretUp,
  CaretDown,
  CaretRight,
} from "@phosphor-icons/react";

// ─── Catálogo de íconos — mirror exacto del nodo Figma 1153-3008 ──────────────
// Nombres en kebab-case = nomenclatura del Figma "Losa Flotante"

export type IconName =
  // Figma icon set
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
  | "calculator"
  // extras usados internamente por otros componentes
  | "chevron-up"
  | "chevron-down"
  | "forward"
  | "menu"
  | "stock"
  | "arrow-left";

/** Alias backward-compatible para código existente. */
const ALIASES: Record<string, IconName> = {
  arrow:          "arrow-right",
  chevron:        "chevron-down",
  "chevron-left": "back",
  cart:           "list",
  warning:        "alert",
  "arrow-right":  "arrow-right",
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
const ICON_MAP: Record<IconName, React.ElementType> = {
  home:           House,
  user:           User,
  folder:         Folder,
  open:           Package,
  "arrow-right":  ArrowRight,
  "arrow-left":   ArrowLeft,
  back:           ArrowLeft,
  forward:        CaretRight,
  search:         MagnifyingGlass,
  go:             ArrowCircleRight,
  check:          Check,
  list:           List,
  menu:           List,
  stock:          List,
  boleta:         Receipt,
  traslado:       ArrowsLeftRight,
  entrega:        Truck,
  "sin-stock":    Prohibit,
  completado:     CheckCircle,
  incompleto:     CircleHalf,
  pendiente:      Circle,
  "sin-autorizar": Clock,
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
  "chevron-up":   CaretUp,
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
