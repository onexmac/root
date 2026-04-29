import React from "react";

export type SearchBarState = "standard" | "pressed";
export type SearchBarLayout = "label" | "normal" | "icon";

export interface SearchBarProps {
  placeholder?: string;
  state?: SearchBarState;
  layout?: SearchBarLayout;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({
  placeholder = "Buscar...",
  state = "standard",
  layout = "label",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className={`search-bar search-bar--${state} search-bar--${layout}`}>
      <span className="search-bar__icon">&#128269;</span>
      {layout !== "icon" && (
        <input
          className="search-bar__input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
