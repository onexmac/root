import React from "react";

export type TabsMenuState = "standard" | "pressed";
export type TabsMenuLayout = "label" | "label+icon";

export interface TabsMenuProps {
  label: string;
  state?: TabsMenuState;
  layout?: TabsMenuLayout;
  onClick?: () => void;
}

export function TabsMenu({
  label,
  state = "standard",
  layout = "label",
  onClick,
}: TabsMenuProps) {
  return (
    <button
      className={`tabs-menu tabs-menu--${state} tabs-menu--${layout}`}
      onClick={onClick}
    >
      {layout === "label+icon" && <span className="tabs-menu__icon" />}
      <span className="tabs-menu__label">{label}</span>
    </button>
  );
}
