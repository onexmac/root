import React from "react";
import { Icon, IconName } from "../Icon/Icon";

// ─── NavigationControls ───────────────────────────────────────────────────────

export type NavControlState = "standard" | "pressed";
export type NavControlNavigation = "back" | "go";

export interface NavigationControlsProps {
  state?: NavControlState;
  navigation?: NavControlNavigation;
  onClick?: () => void;
}

export function NavigationControls({
  state = "standard",
  navigation = "back",
  onClick,
}: NavigationControlsProps) {
  const iconName: IconName = navigation === "back" ? "back" : "go";

  return (
    <button
      className={`ds-nav-ctrl ds-nav-ctrl--${state} ds-nav-ctrl--${navigation}`}
      onClick={onClick}
      type="button"
      aria-label={navigation === "back" ? "Atrás" : "Adelante"}
    >
      <Icon name={iconName} size="lg" color="var(--ds-color-black)" />
    </button>
  );
}

// ─── FilterOptions ────────────────────────────────────────────────────────────

export type FilterOptionsState = "standard" | "pressed";
export type FilterOptionsMode = "normal" | "close";

export interface FilterOptionsProps {
  state?: FilterOptionsState;
  mode?: FilterOptionsMode;
  onClick?: () => void;
}

export function FilterOptions({
  state = "standard",
  mode = "normal",
  onClick,
}: FilterOptionsProps) {
  return (
    <button
      className={`ds-filter-opt ds-filter-opt--${state} ds-filter-opt--${mode}`}
      onClick={onClick}
      type="button"
      aria-label={mode === "close" ? "Cerrar filtros" : "Filtros"}
    >
      <Icon
        name={mode === "close" ? "close" : "filter"}
        size="lg"
        color={mode === "close" ? "var(--ds-color-white)" : "var(--ds-color-black)"}
      />
    </button>
  );
}

// ─── ToggleMenu ───────────────────────────────────────────────────────────────

export type ToggleMenuMode = "open" | "close";
export type ToggleMenuState = "standard" | "pressed";

export interface ToggleMenuProps {
  state?: ToggleMenuState;
  mode?: ToggleMenuMode;
  onClick?: () => void;
}

export function ToggleMenu({
  state = "standard",
  mode = "open",
  onClick,
}: ToggleMenuProps) {
  return (
    <button
      className={`ds-toggle-menu ds-toggle-menu--${state} ds-toggle-menu--${mode}`}
      onClick={onClick}
      type="button"
      aria-label={mode === "open" ? "Abrir menú" : "Cerrar menú"}
      aria-expanded={mode === "open"}
    >
      <Icon
        name={mode === "close" ? "close" : "list"}
        size="lg"
        color="var(--ds-color-black)"
      />
    </button>
  );
}

// ─── Legacy Nav ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href?: string;
  icon?: IconName;
  active?: boolean;
  onClick?: () => void;
}

export interface NavProps {
  items?: NavItem[];
  variant?: "sidebar" | "topbar";
}

export function Nav({ items = [], variant = "sidebar" }: NavProps) {
  return (
    <nav className={`ds-nav ds-nav--${variant}`}>
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href ?? "#"}
          className={`ds-nav__item${item.active ? " ds-nav__item--active" : ""}`}
          onClick={(e) => {
            if (!item.href || item.href === "#") e.preventDefault();
            item.onClick?.();
          }}
        >
          {item.icon && <Icon name={item.icon} size="md" />}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
