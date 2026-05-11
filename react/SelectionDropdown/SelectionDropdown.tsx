import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { springs } from "../springs";
import { haptic } from "../haptic";


export interface SelectionItem {
  /** Identificador único o código corto que se muestra en el badge */
  code: string;
  /** Texto descriptivo del ítem */
  name: string;
}

export interface SelectionDropdownProps {
  /** Catálogo de ítems disponibles */
  items: SelectionItem[];
  /** Callback cuando el usuario elige un ítem */
  onSelect: (item: SelectionItem) => void;
  /** Texto del trigger. Default "Agregar" */
  triggerLabel?: string;
  /** Placeholder del buscador. Default "Buscar por nombre o código" */
  searchPlaceholder?: string;
  /** Texto cuando no hay matches en la búsqueda */
  emptyHint?: (query: string) => string;
  /** Controlado externamente; si se omite, el componente gestiona su propio estado */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * SelectionDropdown — dropdown buscable estilo design system.
 *
 *  - Trigger negro filled con badge amarillo `+` (mirrors toggleCards/nav language).
 *  - Panel emergente hacia arriba con buscador (search por nombre o código).
 *  - Items: badge amarillo con el código + nombre + círculo verde con `+`.
 *  - Filtra en tiempo real, muestra empty state al no haber matches.
 */
export function SelectionDropdown({
  items,
  onSelect,
  triggerLabel = "Agregar",
  searchPlaceholder = "Buscar por nombre o código",
  emptyHint = (q) => `Sin resultados para "${q}"`,
  open: openProp,
  onOpenChange,
  className,
}: SelectionDropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.name.toLowerCase().includes(q) || i.code.toLowerCase().includes(q),
    );
  }, [items, query]);

  const toggle = () => {
    if (!open) haptic.select();
    setOpen(!open);
  };

  const handleSelect = (item: SelectionItem) => {
    haptic.complete();
    onSelect(item);
    setQuery("");
  };

  return (
    <div className={`ds-dd ${open ? "ds-dd--open" : ""}${className ? ` ${className}` : ""}`}>
      <motion.button
        type="button"
        className="ds-dd__trigger"
        onClick={toggle}
        whileTap={{ scale: 0.97 }}
        transition={springs.snappy}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="ds-dd__trigger-icon" aria-hidden>
          <PlusIcon />
        </span>
        <span className="ds-dd__trigger-label">{triggerLabel}</span>
        <motion.span
          className="ds-dd__caret"
          animate={{ rotate: open ? 180 : 0 }}
          transition={springs.expanding}
          aria-hidden
        >
          <ChevronDownIcon />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            className="ds-dd__panel"
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 12, height: 0 }}
            transition={springs.expanding}
          >
            <div className="ds-dd__search">
              <SearchIcon />
              <input
                className="ds-dd__search-input"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            <ul className="ds-dd__list" role="listbox">
              {filtered.length === 0 && (
                <li className="ds-dd__empty">{emptyHint(query)}</li>
              )}
              {filtered.map((item) => (
                <li key={item.code}>
                  <motion.button
                    type="button"
                    className="ds-dd__item"
                    onClick={() => handleSelect(item)}
                    whileTap={{ scale: 0.98 }}
                    transition={springs.snappy}
                    role="option"
                  >
                    <span className="ds-dd__item-badge">{item.code}</span>
                    <span className="ds-dd__item-name">{item.name}</span>
                    <span className="ds-dd__item-add" aria-hidden>
                      <PlusIcon />
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
