import React from "react";
import { Icon, IconName } from "../Icon/Icon";

export type TabsMenuState = "standard" | "pressed";
export type TabsMenuLayout = "label" | "label+icon";

export interface TabsMenuProps {
  label?: string;
  state?: TabsMenuState;
  layout?: TabsMenuLayout;
  /** Icon to show (layout must include icon) */
  icon?: IconName;
  onClick?: () => void;
}

export function TabsMenu({
  label = "Tab",
  state = "standard",
  layout = "label",
  icon = "home",
  onClick,
}: TabsMenuProps) {
  const showIcon = layout === "label+icon";

  return (
    <button
      className={`ds-tabs-menu ds-tabs-menu--${state} ds-tabs-menu--${layout.replace("+", "-")}`}
      onClick={onClick}
      type="button"
      aria-pressed={state === "pressed"}
    >
      {showIcon && (
        <span className="ds-tabs-menu__icon">
          <Icon name={icon} size="md" color="var(--ds-color-white)" />
        </span>
      )}
      <span className="ds-tabs-menu__label">{label}</span>
    </button>
  );
}

// ─── TabFilterBar ─────────────────────────────────────────────────────────────
// The horizontal filter bar with multiple TabFilterChip items

export type TabFilterChipState = "active" | "disabled";

export interface TabFilterChipProps {
  label?: string;
  state?: TabFilterChipState;
  icon?: IconName;
  onClick?: () => void;
}

export function TabFilterChip({
  label = "Filtro",
  state = "active",
  icon = "check",
  onClick,
}: TabFilterChipProps) {
  return (
    <button
      className={`ds-filter-chip ds-filter-chip--${state}`}
      onClick={onClick}
      type="button"
      disabled={state === "disabled"}
    >
      <Icon
        name={icon}
        size="sm"
        color={state === "active" ? "var(--ds-color-white)" : "var(--ds-color-gray-300)"}
      />
      <span className="ds-filter-chip__label">{label}</span>
    </button>
  );
}

export interface FilterBarProps {
  chips?: TabFilterChipProps[];
}

export function FilterBar({ chips = [] }: FilterBarProps) {
  return (
    <div className="ds-filter-bar">
      {chips.map((chip, i) => (
        <TabFilterChip key={i} {...chip} />
      ))}
    </div>
  );
}
