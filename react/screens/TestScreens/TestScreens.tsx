import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { springs } from "../../springs";
import { haptic } from "../../haptic";
import { QtyPill, type QtyVariant } from "../../QtyPill/QtyPill";
import { SearchBar, type SearchSuggestion } from "../../SearchBar/SearchBar";
import { ToggleCards } from "../../ToggleCards/ToggleCards";
import { TabsMenu } from "../../TabsMenu/TabsMenu";
import { SlideButton } from "../../SlideButton/SlideButton";
import "./TestScreens.css";

/**
 * TestScreens — prototipo de las 4 pantallas test screen 1–4
 * (Figma node 1200:2545, 1215:5735, 1215:5974, 1246:3138).
 *
 * Flujo:
 *  list (screen 1/2)  →  detail (screen 3/4)
 *
 *  - screen 1: dos boleta cards, top colapsada, bottom abierta con pills mixed (default/ok/alert)
 *  - screen 2: igual pero todos los pills en variant default (estado "sin verificar")
 *  - screen 3: detail con material card + label dropdown cerrado + green FAB next
 *  - screen 4: igual pero label dropdown abierto, mostrando 4 LABEL options (TabsMenu)
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
  qty: number;
  budgeted?: number;
  requested?: number;
}

const BOLETA: Boleta = {
  code: "NOVARUM",
  number: "C.01",
  ref: "BS000095",
  date: "Ayer 10:25 am",
};

const ITEMS: Item[] = [
  { id: "1", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 3, budgeted: 5, requested: 4 },
  { id: "2", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 3, budgeted: 3, requested: 3 },
  { id: "3", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 3, budgeted: 2, requested: 2 },
];

const LABEL_OPTIONS = [
  "URGENTE",
  "PROCESADO",
  "PENDIENTE",
  "VERIFICADO",
  "EN TRÁNSITO",
  "ENTREGADO",
  "DEVUELTO",
  "CANCELADO",
  "EN BODEGA",
  "FACTURADO",
  "POR PAGAR",
  "PAGADO",
  "OBSERVACIÓN",
  "REVISIÓN",
  "APROBADO",
  "RECHAZADO",
  "EN ESPERA",
  "PRIORIDAD ALTA",
  "PRIORIDAD MEDIA",
  "PRIORIDAD BAJA",
];

/** entregada vs solicitada → variante visual del anillo del pill (per Figma quantitySelector) */
function variantFor(qty: number, requested?: number): QtyVariant {
  if (requested == null) return "pendiente";    // no se ha registrado
  if (qty > requested) return "sin-stock";      // excede lo solicitado (anomalía)
  if (qty === requested) return "completo";     // están todos
  return "incompleto";                           // faltan materiales (qty < requested)
}

type Route = "list" | "detail";

export function TestScreens() {
  const [route, setRoute] = useState<Route>("list");
  /** screen 1 vs 2: si está "verified" usa variantes mixed, si no, todo default */
  const [verified, setVerified] = useState(true);
  /** Item seleccionado para mostrar en el detail */
  const [selected, setSelected] = useState<Item>(ITEMS[0]);
  /** Label elegido en el detail (null = placeholder) */
  const [pickedLabel, setPickedLabel] = useState<string | null>(null);
  /** Estado del label dropdown en el detail */
  const [labelOpen, setLabelOpen] = useState(false);
  /** Estados de cada card en la lista */
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(true);

  const goDetail = (item: Item) => {
    haptic.select();
    setSelected(item);
    setPickedLabel(null);
    setLabelOpen(false);
    setRoute("detail");
  };

  const goList = () => {
    haptic.select();
    setRoute("list");
  };

  return (
    <div className="ts">
      <AnimatePresence mode="wait" initial={false}>
        {route === "list" ? (
          <motion.div
            key="list"
            className="ts__viewport"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={springs.expanding}
          >
            <ListView
              boleta={BOLETA}
              items={ITEMS}
              verified={verified}
              onToggleVerified={() => {
                haptic.select();
                setVerified((v) => !v);
              }}
              topOpen={topOpen}
              bottomOpen={bottomOpen}
              onToggleTop={() => {
                haptic.select();
                setTopOpen((v) => !v);
              }}
              onToggleBottom={() => {
                haptic.select();
                setBottomOpen((v) => !v);
              }}
              onItemTap={goDetail}
            />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            className="ts__viewport"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={springs.expanding}
          >
            <DetailView
              item={selected}
              labelOpen={labelOpen}
              pickedLabel={pickedLabel}
              onToggleLabel={() => {
                haptic.select();
                setLabelOpen((v) => !v);
              }}
              onPickLabel={(label) => {
                haptic.complete();
                setPickedLabel(label);
                setLabelOpen(false);
              }}
              onNext={goList}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
 * ListView — screens 1 y 2
 * ============================================================ */

function ListView({
  boleta,
  items,
  verified,
  onToggleVerified,
  topOpen,
  bottomOpen,
  onToggleTop,
  onToggleBottom,
  onItemTap,
}: {
  boleta: Boleta;
  items: Item[];
  verified: boolean;
  onToggleVerified: () => void;
  topOpen: boolean;
  bottomOpen: boolean;
  onToggleTop: () => void;
  onToggleBottom: () => void;
  onItemTap: (item: Item) => void;
}) {
  return (
    <>
      <BoletaCard
        boleta={boleta}
        isOpen={topOpen}
        onToggle={onToggleTop}
        items={items}
        verified={verified}
        onItemTap={onItemTap}
      />
      <BoletaCard
        boleta={boleta}
        isOpen={bottomOpen}
        onToggle={onToggleBottom}
        items={items}
        verified={verified}
        onItemTap={onItemTap}
      />

      <div className="ts__bottom">
        {/* Tap-toggle entre screen 1 (mixed) y screen 2 (todos default) */}
        <button
          type="button"
          className="ts__verified-toggle"
          onClick={onToggleVerified}
          aria-label={verified ? "Cambiar a estado sin verificar" : "Cambiar a estado verificado"}
        >
          {verified ? "verified" : "unverified"}
        </button>
        <SearchButton items={items} onPick={onItemTap} />
      </div>
    </>
  );
}

/* ============================================================
 * SearchButton — orquesta los layouts del DS SearchBar:
 *   icon (cerrado) → expanded (abierto, con sugerencias del DS).
 * Toda la UI sale del DS — este wrapper solo maneja state + filtro.
 * ============================================================ */

function SearchButton({
  items,
  onPick,
}: {
  items: Item[];
  onPick: (item: Item) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter((it) => it.name.toLowerCase().includes(q))
      .slice(0, 6)
      .map((it) => ({ id: it.id, name: it.name }));
  }, [items, query]);

  const openSearch = () => {
    haptic.select();
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  const pick = (s: SearchSuggestion) => {
    const item = items.find((it) => it.id === s.id);
    if (!item) return;
    haptic.complete();
    closeSearch();
    onPick(item);
  };

  return (
    <div className="ts-search-wrap">
      {open ? (
        <SearchBar
          layout="expanded"
          inputRef={inputRef}
          placeholder="Buscar material"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClose={closeSearch}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeSearch();
            if (e.key === "Enter" && suggestions[0]) pick(suggestions[0]);
          }}
          suggestions={suggestions}
          onPick={pick}
        />
      ) : (
        <SearchBar layout="icon" onClick={openSearch} ariaLabel="Abrir buscador" />
      )}
    </div>
  );
}

function BoletaCard({
  boleta,
  isOpen,
  onToggle,
  items,
  verified,
  onItemTap,
}: {
  boleta: Boleta;
  isOpen: boolean;
  onToggle: () => void;
  items: Item[];
  verified: boolean;
  onItemTap: (item: Item) => void;
}) {
  return (
    <motion.div className="ts-card" layout transition={springs.expanding}>
      <div className="ts-card__header">
        <div className="ts-card__title-block">
          <span className="ts-card__code">{boleta.code}</span>
          <h2 className="ts-card__number">{boleta.number}</h2>
          <p className="ts-card__ref">{boleta.ref}</p>
          <div className="ts-card__meta">
            <span className="ts-card__info-dot" aria-hidden />
            <span>{boleta.date}</span>
          </div>
        </div>

        <div className="ts-card__actions">
          <span className="ts-card__check" aria-label="completado">
            <CheckIcon />
          </span>
          {/* Mapping per Figma summaryCard:
             *   compressed (isOpen=false) → size=big   + visibility=open  (chevrons, "se puede expandir")
             *   expanded   (isOpen=true)  → size=small + visibility=close (arrow down, "se puede colapsar")
             *  El size cambia porque la card expandida tiene menos aire vertical en el header. */}
          <ToggleCards
            size={isOpen ? "small" : "big"}
            visibility={isOpen ? "close" : "open"}
            onClick={onToggle}
            ariaLabel={isOpen ? "Comprimir card" : "Expandir card"}
          />
        </div>
      </div>

      {/* Body expand:
       *  - height usa spring `expanding` (suavizado, sin overshoot)
       *  - opacity con duration corta + delay → contenido aparece DESPUÉS de que el alto crece
       *  - cada row hace stagger entrance (delay incremental) para flujo natural */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            className="ts-card__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: springs.expanding,
              opacity: { duration: 0.18, delay: 0.06, ease: [0.25, 1, 0.5, 1] },
            }}
          >
            <motion.div
              className="ts-card__divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.28, delay: 0.04, ease: [0.25, 1, 0.5, 1] }}
            />
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{
                  duration: 0.22,
                  delay: 0.08 + i * 0.04,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                <ItemRow
                  item={item}
                  variant={verified ? variantFor(item.qty, item.requested) : "pendiente"}
                  onTap={() => onItemTap(item)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ItemRow({
  item,
  variant,
  onTap,
}: {
  item: Item;
  variant: QtyVariant;
  onTap: () => void;
}) {
  return (
    <div className="ts-row">
      <p className="ts-row__name">{item.name}</p>
      {/* Solo el QtyPill es interactivo. Al mantenerlo presionado, su :active
       *  dispara el halo + anillo outer del color de la variant (DS-level). */}
      <QtyPill
        value={item.qty}
        variant={variant}
        onTap={onTap}
        ariaLabel={`${item.name} — cantidad ${item.qty}, tocá para ver detalle`}
      />
    </div>
  );
}

/* ============================================================
 * DetailView — screens 3 y 4
 * ============================================================ */

function DetailView({
  item,
  labelOpen,
  pickedLabel,
  onToggleLabel,
  onPickLabel,
  onNext,
}: {
  item: Item;
  labelOpen: boolean;
  pickedLabel: string | null;
  onToggleLabel: () => void;
  onPickLabel: (label: string) => void;
  onNext: () => void;
}) {
  const [labelQuery, setLabelQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    const q = labelQuery.trim().toLowerCase();
    if (!q) return LABEL_OPTIONS;
    return LABEL_OPTIONS.filter((l) => l.toLowerCase().includes(q));
  }, [labelQuery]);

  // Cerrar limpia la query; abrir auto-focusea el input para empezar a tipear.
  React.useEffect(() => {
    if (!labelOpen) {
      setLabelQuery("");
    } else {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [labelOpen]);

  // Si el usuario tipea en el input estando cerrado, abre automáticamente.
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelQuery(e.target.value);
    if (!labelOpen) onToggleLabel();
  };

  // Valor mostrado en el input:
  //   abierto       → query (lo que está tipeando, en regular)
  //   cerrado + pick → label seleccionado (semibold)
  //   cerrado + nada → vacío, muestra placeholder "Label"
  const displayValue = labelOpen ? labelQuery : (pickedLabel ?? "");
  const showFilled = !labelOpen && !!pickedLabel;

  return (
    <>
      {/* Material card */}
      <div className="ts-material">
        <p className="ts-material__name">{item.name}</p>
        <QtyPill value={item.qty} variant="incompleto" />
      </div>

      {/* Trigger combobox — el input ES el área de búsqueda. Tipear filtra; el ToggleCards
       *  abre/cierra. Mapping del icono igual al de las boleta cards:
       *  cerrado → chevrons (state=open en Figma); abierto → arrow (state=close en Figma). */}
      <div className={`ts-label-trigger${labelOpen ? " ts-label-trigger--open" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          className={`ts-label-trigger__input${showFilled ? " ts-label-trigger__input--filled" : ""}`}
          placeholder="Label"
          value={displayValue}
          onChange={handleQueryChange}
          onFocus={() => {
            if (!labelOpen) onToggleLabel();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") onToggleLabel();
            if (e.key === "Enter" && filteredOptions[0]) onPickLabel(filteredOptions[0]);
          }}
          aria-haspopup="listbox"
          aria-expanded={labelOpen}
          aria-label="Etiqueta — escribí para buscar"
        />
        <ToggleCards
          size="small"
          visibility={labelOpen ? "close" : "open"}
          onClick={onToggleLabel}
          ariaLabel={labelOpen ? "Cerrar opciones" : "Abrir opciones"}
        />
      </div>

      {/* Panel: lista scrolleable de TabsMenu, filtrada por la query del trigger */}
      <AnimatePresence initial={false}>
        {labelOpen && (
          <motion.div
            key="panel"
            className="ts-label-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: springs.expanding,
              opacity: { duration: 0.18, delay: 0.06, ease: [0.25, 1, 0.5, 1] },
            }}
          >
            <ul className="ts-label-list" role="listbox">
              {filteredOptions.length === 0 ? (
                <motion.li
                  className="ts-label-list__empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18 }}
                >
                  Sin resultados para "{labelQuery}"
                </motion.li>
              ) : (
                filteredOptions.map((label, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      // Stagger limitado a primeros 8 items — más allá no se nota
                      delay: 0.06 + Math.min(i, 8) * 0.025,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="ts-label-list__item"
                  >
                    <TabsMenu
                      label={label}
                      layout="label"
                      state={pickedLabel === label ? "pressed" : "standard"}
                      onClick={() => onPickLabel(label)}
                    />
                  </motion.li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-to-confirm — knob verde con anillo green-200 al presionar/draggear, drag al 72% confirma */}
      <div className="ts-detail__cta">
        <SlideButton label="Pedir" confirmedLabel="Confirmado" onConfirm={onNext} />
      </div>
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


