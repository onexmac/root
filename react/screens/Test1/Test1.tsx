import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { springs } from "../../springs";
import { haptic } from "../../haptic";
import { QtyPill, type QtyVariant } from "../../QtyPill/QtyPill";
import { SearchBar } from "../../SearchBar/SearchBar";
import { ToggleCards } from "../../ToggleCards/ToggleCards";
import { Test1Detail, DEFAULT_CATALOG, computeVariant, type Material } from "./Test1Detail";
import "./Test1.css";

/**
 * Test1 — prototipo de las pantallas test screen 1 + 2 (Figma node 1200:2545).
 *
 * Interacciones:
 *  - toggleCards   → expandir/comprimir cada card independientemente
 *  - qtyPill       → tap navega a la pantalla de detalle de materiales
 *  - searchBar     → press animation (scale tap) cuando se presiona el ícono
 *
 * El slideButton (deslizar para confirmar) vive ahora en Test1Detail como
 * acción final de "guardar y finalizar pedido".
 */

interface Boleta {
  code: string;
  number: string;
  ref: string;
  date: string;
}

interface Item {
  id: string;
  name: string;
  /** Cantidad entregada — la del pill */
  qty: number;
  /** Cantidad presupuestada (plan original) */
  budgeted?: number;
  /** Cantidad solicitada al proveedor */
  requested?: number;
}

const BOLETA: Boleta = {
  code: "NOVARUM",
  number: "C.01",
  ref: "BS000095",
  date: "Ayer 10:25 am",
};

const ITEMS: Item[] = [
  // Entregada bajo lo solicitado → anillo amarillo (pendiente)
  { id: "1", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 3, budgeted: 5, requested: 4 },
  // Entregada igual a lo solicitado → anillo verde (match)
  { id: "2", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 3, budgeted: 3, requested: 3 },
  // Entregada sobre lo solicitado → anillo rojo (excede)
  { id: "3", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 3, budgeted: 2, requested: 2 },
];

type Route = "list" | "detail";

export function Test1() {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(true);
  const [route, setRoute] = useState<Route>("list");
  const [materials, setMaterials] = useState<Material[]>(
    ITEMS.map((it) => ({
      id: it.id,
      name: it.name,
      qty: it.qty,
      budgeted: it.budgeted,
      requested: it.requested,
    })),
  );

  const toggleSummary = () => {
    haptic.select();
    setSummaryOpen((v) => !v);
  };

  const toggleDetail = () => {
    haptic.select();
    setDetailOpen((v) => !v);
  };

  const openDetail = () => {
    haptic.select();
    setRoute("detail");
  };

  const closeDetail = (next: Material[]) => {
    setMaterials(next);
    setRoute("list");
  };

  return (
    <div className="test1">
      <AnimatePresence mode="wait" initial={false}>
        {route === "list" ? (
          <motion.div
            key="list"
            className="test1__viewport"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={springs.expanding}
          >
            <BoletaCard
              boleta={BOLETA}
              isOpen={summaryOpen}
              onToggle={toggleSummary}
              items={materials}
              onItemTap={openDetail}
            />
            <BoletaCard
              boleta={BOLETA}
              isOpen={detailOpen}
              onToggle={toggleDetail}
              items={materials}
              onItemTap={openDetail}
            />

            <div className="test1__bottom">
              <SearchButton
                materials={materials}
                onPick={() => setRoute("detail")}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={springs.expanding}
          >
            <Test1Detail initialMaterials={materials} onBack={closeDetail} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
 * BoletaCard — header con toggle, body expandible con items
 * ============================================================ */

function BoletaCard({
  boleta,
  isOpen,
  onToggle,
  items,
  onItemTap,
}: {
  boleta: Boleta;
  isOpen: boolean;
  onToggle: () => void;
  items: Item[] | Material[];
  onItemTap: () => void;
}) {
  return (
    <motion.div className="test1-card" layout transition={springs.expanding}>
      <div className="test1-card__header">
        <div className="test1-card__title-block">
          <span className="test1-card__code">{boleta.code}</span>
          <h2 className="test1-card__number">{boleta.number}</h2>
          <p className="test1-card__ref">{boleta.ref}</p>
          <div className="test1-card__meta">
            <span className="test1-card__info-dot" aria-hidden />
            <span>{boleta.date}</span>
          </div>
        </div>

        <div className="test1-card__actions">
          <span className="test1-card__check" aria-label="completado">
            <CheckIcon />
          </span>
          <ToggleCards
            visibility={isOpen ? "open" : "close"}
            onClick={onToggle}
            ariaLabel={isOpen ? "Comprimir card" : "Expandir card"}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            className="test1-card__body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={springs.expanding}
          >
            <div className="test1-card__divider" />
            {items.map((item) => (
              <ItemRow key={item.id} item={item} onTap={onItemTap} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ItemRow({ item, onTap }: { item: Item | Material; onTap: () => void }) {
  const requested = (item as Item).requested ?? (item as Material).requested;
  const variant: QtyVariant = computeVariant(item.qty, requested);
  return (
    <motion.button
      type="button"
      className="test1-row"
      onClick={onTap}
      whileTap={{ scale: 0.98 }}
      transition={springs.snappy}
      aria-label={`${item.name} — cantidad ${item.qty}, tocá para editar`}
    >
      <p className="test1-row__name">{item.name}</p>
      <QtyPill value={item.qty} variant={variant} />
    </motion.button>
  );
}


/* ============================================================
 * SearchButton — search real con sugerencias contra materiales + catálogo
 * ============================================================ */

interface SearchHit {
  name: string;
  source: "boleta" | "catálogo";
}

function SearchButton({
  materials,
  onPick,
}: {
  materials: Material[];
  onPick: (hit: SearchHit) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Combined corpus: boleta materials first (deduped by name), then catalog
  // entries that aren't already in the boleta. Names already are uppercase.
  const corpus = useMemo<SearchHit[]>(() => {
    const seen = new Set<string>();
    const result: SearchHit[] = [];
    for (const m of materials) {
      if (!seen.has(m.name)) {
        seen.add(m.name);
        result.push({ name: m.name, source: "boleta" });
      }
    }
    for (const c of DEFAULT_CATALOG) {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        result.push({ name: c.name, source: "catálogo" });
      }
    }
    return result;
  }, [materials]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as SearchHit[];
    return corpus.filter((it) => it.name.toLowerCase().includes(q)).slice(0, 6);
  }, [corpus, query]);

  const openSearch = () => {
    haptic.select();
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  const pick = (hit: SearchHit) => {
    haptic.complete();
    closeSearch();
    onPick(hit);
  };

  return (
    <div className="test1-search-wrap">
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            key="panel"
            className="test1-search__panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={springs.expanding}
          >
            {suggestions.map((hit) => (
              <button
                key={hit.name}
                type="button"
                className="test1-search__hit"
                onClick={() => pick(hit)}
              >
                <span className="test1-search__hit-name">
                  {highlightMatch(hit.name, query)}
                </span>
                <span className={`test1-search__hit-tag test1-search__hit-tag--${hit.source === "boleta" ? "boleta" : "catalog"}`}>
                  {hit.source}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {open ? (
        <motion.div
          className="test1-search-bar"
          initial={{ width: 65 }}
          animate={{ width: 352 }}
          transition={springs.snappy}
          layout
        >
          <SearchBar
            layout="label"
            inputRef={inputRef}
            placeholder="Buscar material"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeSearch();
              if (e.key === "Enter" && suggestions[0]) pick(suggestions[0]);
            }}
            rightSlot={
              <button
                type="button"
                className="test1-search__close"
                onClick={closeSearch}
                aria-label="Cerrar buscador"
              >
                <CloseIcon />
              </button>
            }
          />
        </motion.div>
      ) : (
        <SearchBar layout="icon" onClick={openSearch} ariaLabel="Abrir buscador" />
      )}
    </div>
  );
}

/** Wraps matched substring in <mark> for the suggestions list. */
function highlightMatch(text: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="test1-search__match">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

/* ============================================================
 * Inline icons
 * ============================================================ */

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
      <path d="M10 16.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
