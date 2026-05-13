import React from "react";

// ─── Catálogo de íconos — mirror exacto del nodo Figma 1153-3008 ──────────────
// SVGs inline dibujados para coincidir con el estilo Losa Flotante:
// stroke outline, strokeWidth 1.5, rounded caps/joins, viewBox 24×24

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
  | "calculator"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "chevrons-up-down";

/** Alias backward-compatible para código existente. */
const ALIASES: Record<string, string> = {
  arrow:          "arrow-right",
  chevron:        "chevron-down",
  "chevron-left": "back",
  warning:        "alert",
  forward:        "arrow-right",
};

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  name: IconName | string;
  size?: IconSize;
  color?: string;
  className?: string;
}

const SIZE_MAP: Record<IconSize, number> = { sm: 16, md: 20, lg: 24 };

// Cada ícono es una función que retorna los elementos SVG internos (path, circle, etc.)
// Todos dibujados en viewBox 0 0 24 24 con stroke outline
const ICON_PATHS: Record<string, () => React.ReactNode> = {
  home: () => (
    <>
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10.5z" />
    </>
  ),
  user: () => (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
    </>
  ),
  folder: () => (
    <>
      <path d="M3 6a1 1 0 011-1h5.5l2 2H20a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V6z" />
    </>
  ),
  open: () => (
    <>
      <polyline points="6 15 12 9 18 15" />
    </>
  ),
  "arrow-right": () => (
    <>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </>
  ),
  back: () => (
    <>
      <line x1="20" y1="12" x2="4" y2="12" />
      <polyline points="10 6 4 12 10 18" />
    </>
  ),
  search: () => (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="16" y1="16" x2="21" y2="21" />
    </>
  ),
  go: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 8 16 12 12 16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  check: () => (
    <>
      <polyline points="5 13 9.5 17.5 19 7" />
    </>
  ),
  list: () => (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </>
  ),
  boleta: () => (
    <>
      <path d="M6 2h12a1 1 0 011 1v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3a1 1 0 011-1z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </>
  ),
  traslado: () => (
    <>
      <polyline points="7 8 3 12 7 16" />
      <line x1="3" y1="12" x2="14" y2="12" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="21" y1="12" x2="10" y2="12" />
    </>
  ),
  entrega: () => (
    <>
      <rect x="2" y="6" width="13" height="10" rx="1" />
      <path d="M15 10h3.5l2.5 3v3h-6V10z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  "sin-stock": () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
    </>
  ),
  completado: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12 11 15 16 9" />
    </>
  ),
  incompleto: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="6" x2="12" y2="18" />
    </>
  ),
  pendiente: () => (
    <>
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  "sin-autorizar": () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  filter: () => (
    <>
      <path d="M3 4h18l-7 8.5V18l-4 2v-7.5L3 4z" />
    </>
  ),
  close: () => (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  edit: () => (
    <>
      <path d="M15.5 4.5l4 4L8 20H4v-4L15.5 4.5z" />
    </>
  ),
  info: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  plus: () => (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  minus: () => (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  delete: () => (
    <>
      <polyline points="5 7 5 20 19 20 19 7" />
      <line x1="3" y1="7" x2="21" y2="7" />
      <path d="M9 7V4h6v3" />
      <line x1="10" y1="11" x2="10" y2="16" />
      <line x1="14" y1="11" x2="14" y2="16" />
    </>
  ),
  place: () => (
    <>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  alert: () => (
    <>
      <path d="M10.3 3.2L2.1 18a2 2 0 001.7 3h16.4a2 2 0 001.7-3L13.7 3.2a2 2 0 00-3.4 0z" />
      <line x1="12" y1="9" x2="12" y2="14" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  remove: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  calculator: () => (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <rect x="7" y="5" width="10" height="4" rx="0.5" />
      <circle cx="8.5" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  // chevrons (used by NavigationControls, ToggleMenu, etc.)
  "chevron-left": () => (
    <>
      <polyline points="15 6 9 12 15 18" />
    </>
  ),
  "chevron-right": () => (
    <>
      <polyline points="9 6 15 12 9 18" />
    </>
  ),
  "chevron-down": () => (
    <>
      <polyline points="6 9 12 15 18 9" />
    </>
  ),
  "chevron-up": () => (
    <>
      <polyline points="6 15 12 9 18 15" />
    </>
  ),
  "chevrons-up-down": () => (
    <>
      <polyline points="8 10 12 6 16 10" />
      <polyline points="8 14 12 18 16 14" />
    </>
  ),
};

export function Icon({ name, size = "md", color = "currentColor", className }: IconProps) {
  const px = SIZE_MAP[size];
  const resolved = ALIASES[name as string] ?? name;
  const renderPaths = ICON_PATHS[resolved];

  if (!renderPaths) return null;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ds-icon ds-icon--${resolved} ds-icon--${size}${className ? " " + className : ""}`}
      aria-hidden="true"
    >
      {renderPaths()}
    </svg>
  );
}
