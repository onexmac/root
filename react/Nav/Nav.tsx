import React from "react";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavProps {
  items: NavItem[];
  variant?: "sidebar" | "topbar";
}

export function Nav({ items, variant = "sidebar" }: NavProps) {
  return (
    <nav className={`nav nav--${variant}`}>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`nav__item${item.active ? " nav__item--active" : ""}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
