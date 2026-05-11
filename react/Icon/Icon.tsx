import React from "react";

export type IconName =
  | "search"
  | "back"
  | "forward"
  | "close"
  | "filter"
  | "chevron-up"
  | "chevron-down"
  | "check"
  | "home"
  | "plus"
  | "minus"
  | "menu"
  | "alert"
  | "info"
  | "stock"
  | "arrow-right";

/** Alias map: lets external callers use friendly names that resolve to canonical ones. */
const ALIASES: Record<string, IconName> = {
  arrow: "arrow-right",
  chevron: "chevron-down",
  "chevron-left": "back",
  cart: "stock",
};

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  /** Canonical icon name or alias. Unknown strings render an empty box. */
  name: IconName | string;
  size?: IconSize;
  color?: string;
  className?: string;
}

const SIZE_MAP: Record<IconSize, number> = { sm: 16, md: 20, lg: 24 };

const PATHS: Record<IconName, React.ReactNode> = {
  search: (
    <path
      d="M10.5 3a7.5 7.5 0 1 0 4.33 13.577l3.797 3.796a1 1 0 0 0 1.414-1.414l-3.796-3.797A7.5 7.5 0 0 0 10.5 3Zm-5.5 7.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  ),
  back: (
    <path
      d="M15.5 3.5 7 12l8.5 8.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  forward: (
    <path
      d="M8.5 3.5 17 12l-8.5 8.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  close: (
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  ),
  filter: (
    <path
      d="M3 6h18M7 12h10M11 18h2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  ),
  "chevron-up": (
    <path
      d="M5 15l7-7 7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "chevron-down": (
    <path
      d="M5 9l7 7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  check: (
    <path
      d="M4 12l5.5 5.5L20 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  home: (
    <path
      d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10.5Z M9 22V12h6v10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  plus: (
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  minus: (
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  menu: (
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  ),
  alert: (
    <path
      d="M12 2 2 20h20L12 2Zm0 6v6M12 17h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  info: (
    <path
      d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 4v6M12 16h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  ),
  stock: (
    <path
      d="M4 4h16M4 12h16M4 20h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  ),
  "arrow-right": (
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

export function Icon({ name, size = "md", color = "currentColor", className }: IconProps) {
  const px = SIZE_MAP[size];
  const resolved = (ALIASES[name as string] ?? name) as IconName;
  return (
    <svg
      className={`ds-icon ds-icon--${resolved} ds-icon--${size}${className ? " " + className : ""}`}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      {PATHS[resolved]}
    </svg>
  );
}
