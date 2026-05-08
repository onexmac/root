import React, { useState } from "react";
import { Icon } from "../Icon/Icon";

export type SearchBarState = "standard" | "pressed";
export type SearchBarLayout = "label" | "normal" | "icon" | "expanded";

export interface SearchBarProps {
  placeholder?: string;
  state?: SearchBarState;
  layout?: SearchBarLayout;
  /** Label shown next to icon (e.g. warehouse name). layout=label required. */
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Expanded options list (for layout=expanded) */
  options?: string[];
  onOptionSelect?: (option: string) => void;
}

export function SearchBar({
  placeholder = "Buscar",
  state = "standard",
  layout = "label",
  label = "LADRILLO",
  value,
  onChange,
  options = ["Bodega A", "Bodega B", "Bodega C"],
  onOptionSelect,
}: SearchBarProps) {
  const [expanded, setExpanded] = useState(layout === "expanded");

  const classes = [
    "ds-search-bar",
    `ds-search-bar--${layout}`,
    `ds-search-bar--${state}`,
    expanded && layout === "expanded" ? "ds-search-bar--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="ds-search-bar__inner">
        <span className="ds-search-bar__icon-wrap">
          <Icon name="search" size="md" color="var(--ds-color-gray-400)" />
        </span>

        {layout === "label" && (
          <button
            className="ds-search-bar__label"
            onClick={() => setExpanded((v) => !v)}
            type="button"
          >
            {label}
            <Icon name="chevron-down" size="sm" />
          </button>
        )}

        {layout !== "icon" && (
          <input
            className="ds-search-bar__input"
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}

        {layout === "icon" && (
          <span className="ds-search-bar__icon-label">{label}</span>
        )}
      </div>

      {(layout === "expanded" || (layout === "label" && expanded)) && (
        <div className="ds-search-bar__dropdown">
          {options.map((opt) => (
            <button
              key={opt}
              className="ds-search-bar__option"
              onClick={() => {
                onOptionSelect?.(opt);
                setExpanded(false);
              }}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
