import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../../Button/Button";
import { Icon } from "../../Icon/Icon";
import { OptionLabel, CheckBox } from "../../Form/Form";
import { SearchBar } from "../../SearchBar/SearchBar";
import { TabsMenu } from "../../TabsMenu/TabsMenu";
import { NavigationControls } from "../../Nav/Nav";
import { SelectionDropdown } from "../../SelectionDropdown/SelectionDropdown";
import { SlideButton } from "../../SlideButton/SlideButton";
import { springs } from "../../springs";
import {
  USERS,
  COLUMNS,
  JUAN_DETAIL,
  TRABAJADOR_OPTIONS,
  CEDULA_OPTIONS,
  TELEFONO_OPTIONS,
  ROL_LIST,
  DEPARTAMENTO_OPTIONS,
  ESTADO_OPTIONS,
  type ColumnKey,
  type FilterMode,
  type UserRow,
} from "./mock-data";
import "./Usuarios.css";

/* ============================================================
 * H4 — Usuarios (desktop prototype, U01–U07)
 *
 *  U01  sidebar expandido · tabla base
 *  U02  sidebar colapsado · estados hover (header pill negro,
 *       fila hover, kebab → "Editar")
 *  U03  popover de filtro sobre header (search + opciones)
 *  U04  drawer derecho · tab Personal · DATOS PERSONALES
 *  U05  drawer · tab Personal · CONTACTO
 *  U06  drawer · tab Puesto · INFO LABORAL + EQUIPAMIENTO
 *  U07  drawer · tab Usuario · ACCESOS + CTA "Crear usuario"
 *
 *  DS components: Button, Icon, OptionLabel, SearchBar, TabsMenu,
 *  TabFilterChip, NavigationControls, springs.
 *
 *  NOT-IN-DS (inline, candidatos a promoción):
 *    · Tooltip            — hover overlay con motion
 *    · StatusDot          — círculo activo/inactivo
 *    · SortableHeader     — celda con pill negro activa
 *    · FilterPopover      — caja blanca + SearchBar + opciones
 *    · FilterCheckbox     — cuadrado 24px (negro/check vs outline)
 *    · OptionsMenu        — kebab con hover "Editar"
 *    · SideDrawer         — panel derecho 480px
 *    · Avatar             — círculo gris con Icon.user
 *    · MockField          — pill blanca disabled (mock visual)
 * ============================================================ */

// ── NOT-IN-DS: Tooltip ──────────────────────────────────────

interface TooltipProps {
  label: string;
  show: boolean;
  placement?: "top" | "right";
}
function Tooltip({ label, show, placement = "top" }: TooltipProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className={`usr-tooltip usr-tooltip--${placement}`}
          initial={{ opacity: 0, scale: 0.92, y: placement === "top" ? 4 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={springs.popping}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ── NOT-IN-DS: StatusDot ────────────────────────────────────

function StatusDot({ estado }: { estado: "activo" | "inactivo" }) {
  const [hover, setHover] = useState(false);
  const label = estado === "activo" ? "Activo" : "Inactivo";
  return (
    <div
      className={`usr-status-wrap usr-status-wrap--${estado}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="img"
      aria-label={label}
    >
      <AnimatePresence initial={false}>
        {hover && (
          <motion.span
            key="lbl"
            className="usr-status__label"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={springs.snappy}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <span className={`usr-status usr-status--${estado}`}>
        <Icon
          name={estado === "activo" ? "completado" : "remove"}
          size="lg"
        />
      </span>
    </div>
  );
}

// ── NOT-IN-DS: OptionsMenu (kebab) ──────────────────────────

interface OptionsMenuProps {
  onEdit: () => void;
}
function OptionsMenu({ onEdit }: OptionsMenuProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="usr-kebab-wrap"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="usr-kebab"
        aria-label="Más opciones"
      >
        <Icon name="options" size="md" />
      </button>
      <AnimatePresence>
        {hover && (
          <motion.button
            type="button"
            className="usr-kebab-action"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={springs.popping}
            onClick={onEdit}
          >
            <Icon name="edit" size="sm" />
            <span>Editar</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── NOT-IN-DS: SortableHeader ───────────────────────────────

interface SortableHeaderProps {
  label: string;
  active: boolean;
  hovered: boolean;
  sortDir: "asc" | "desc" | null;
  onHover: (v: boolean) => void;
  onLabelClick: () => void;
  onSortClick: () => void;
}
function SortableHeader({
  label,
  active,
  hovered,
  sortDir,
  onHover,
  onLabelClick,
  onSortClick,
}: SortableHeaderProps) {
  const showPill = active || hovered;
  return (
    <div
      className={`usr-th${showPill ? " usr-th--active" : ""}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <button
        type="button"
        className="usr-th__label-btn"
        onClick={onLabelClick}
      >
        <span className="usr-th__label">{label}</span>
      </button>
      <button
        type="button"
        className={`usr-th__sort usr-th__sort--${sortDir ?? "none"}`}
        aria-label="Ordenar"
        onClick={(e) => {
          e.stopPropagation();
          onSortClick();
        }}
      >
        <Icon name="open" size="sm" />
      </button>
    </div>
  );
}

// ── NOT-IN-DS: FilterPopover ────────────────────────────────

interface FilterPopoverProps {
  mode: FilterMode;
  placeholder: string;
  options?: string[];
  estadoOptions?: { label: string; indicator: "activo" | "inactivo" | null }[];
  onPick: (val: string) => void;
  onClose: () => void;
  anchor: { left: number; top: number };
}
function FilterPopover({
  mode,
  placeholder,
  options = [],
  estadoOptions,
  onPick,
  onClose,
  anchor,
}: FilterPopoverProps) {
  const [query, setQuery] = useState("");
  // Multi-select by index (labels repeat in the mock data). Index 0 = "Todos".
  // "Todos" is mutually exclusive with specific options; emptying the set falls
  // back to "Todos".
  const [selected, setSelected] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) => {
    setSelected((prev) => {
      if (i === 0) return new Set([0]);
      const next = new Set(prev);
      next.delete(0);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      if (next.size === 0) next.add(0);
      return next;
    });
  };

  const popClass =
    mode === "list"
      ? "usr-filter-pop usr-filter-pop--compact"
      : "usr-filter-pop";

  const filteredOpts = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <motion.div
        className="usr-filter-scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      />
      <motion.div
        className={popClass}
        style={{ left: anchor.left, top: anchor.top }}
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={springs.expanding}
        onClick={(e) => e.stopPropagation()}
      >
        {mode === "search+list" && (
          <div className="usr-filter-pop__search">
            <SearchBar
              layout="normal"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        {/* search+list: multi-select checkbox rows (U03.2–U03.5) — DS CheckBox.
            Toggling keeps the popover open so several options can be marked. */}
        {mode === "search+list" && (
          <div className="usr-filter-pop__list">
            {filteredOpts.map((opt, i) => (
              <button
                key={`${opt}-${i}`}
                type="button"
                className="usr-filter-row"
                onClick={() => toggle(i)}
              >
                <CheckBox label={opt} checked={selected.has(i)} />
              </button>
            ))}
          </div>
        )}

        {/* list (Estado U03.6): multi-select checkbox + label only — DS CheckBox */}
        {mode === "list" && estadoOptions && (
          <div className="usr-filter-pop__list">
            {estadoOptions.map((opt, i) => (
              <button
                key={`${opt.label}-${i}`}
                type="button"
                className="usr-filter-row"
                onClick={() => toggle(i)}
              >
                <CheckBox label={opt.label} checked={selected.has(i)} />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}

// ── NOT-IN-DS: Avatar ───────────────────────────────────────

function Avatar({ size = 40 }: { size?: number }) {
  return (
    <div
      className="usr-avatar"
      style={{ width: size, height: size }}
    >
      <Icon name="user" size={size >= 40 ? "lg" : "md"} />
    </div>
  );
}

// ── NOT-IN-DS: MockField ────────────────────────────────────

// Mock options per field label — only used when editMode is on, to give the
// dropdown something to expand to. Not exhaustive lists; just enough to feel
// real in the prototype.
const MOCK_OPTIONS: Record<string, string[]> = {
  "Género": ["Masculino", "Femenino", "Otro"],
  "Fecha de nacimiento": ["Definir fecha", "Sin fecha"],
  "País": ["Costa Rica", "Panamá", "Nicaragua", "Guatemala"],
  "Provincia": ["San José", "Cartago", "Alajuela", "Heredia", "Guanacaste", "Puntarenas", "Limón"],
  "Cantón": ["Central", "Escazú", "Santa Ana", "Mora", "Curridabat"],
  "Distrito": ["Carmen", "Merced", "Hospital", "Catedral", "Zapote"],
  "Departamento": ["Construcción", "Administración", "Ventas", "Logística", "Recursos Humanos"],
  "Puesto": ["Maestro de obras", "Operario", "Bodeguero", "Transportista", "Capataz"],
  "Fecha de ingreso": ["Definir fecha"],
  "Fecha de salida": ["Definir fecha", "Sin fecha"],
  "Estado": ["Activo", "Inactivo"],
  "Talla de camisa": ["XS", "S", "M", "L", "XL", "XXL"],
  "Talla de pantalón": ["28", "30", "32", "34", "36", "38"],
  "Apps": ["Boletas", "Vacaciones", "Asistencia", "Reportes", "Inventario"],
  "Fecha": ["Definir fecha", "Sin fecha"],
};

// ── NOT-IN-DS: MockCalendar ─────────────────────────────────
// Visual-only month grid mock for U014.1. Static layout (Feb 2026, 5-week
// month starting Sun Feb 1). Click on a day → onSelect(formattedLabel).
// Not promoted to DS — date pickers need real date logic before that.
const CAL_DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const CAL_WEEKS = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [null, null, null, null, null, null, null],
];
function MockCalendar({ onSelect }: { onSelect: (label: string) => void }) {
  return (
    <div className="usr-mock-calendar">
      <div className="usr-mock-calendar__head">
        <button type="button" className="usr-mock-calendar__nav" aria-label="Mes anterior">
          <Icon name="back" size="sm" />
        </button>
        <span className="usr-mock-calendar__month">Febrero 2026</span>
        <button type="button" className="usr-mock-calendar__nav" aria-label="Mes siguiente">
          <Icon name="arrow-right" size="sm" />
        </button>
      </div>
      <div className="usr-mock-calendar__dow">
        {CAL_DOW.map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="usr-mock-calendar__grid">
        {CAL_WEEKS.flat().map((d, i) => (
          <button
            key={i}
            type="button"
            className={`usr-mock-calendar__cell${d == null ? " usr-mock-calendar__cell--empty" : ""}${d === 15 ? " usr-mock-calendar__cell--today" : ""}`}
            disabled={d == null}
            onClick={d == null ? undefined : () => onSelect(`${d} feb 2026`)}
          >
            {d ?? ""}
          </button>
        ))}
      </div>
    </div>
  );
}

interface MockFieldProps {
  label?: string;
  value: string;
  width?: "full" | "half";
  selectable?: boolean;
  /** When true + editMode, the dropdown expands to a calendar instead of a text list. */
  calendar?: boolean;
  editMode?: boolean;
  /** Create-mode: render Placeholder/Label text instead of the value (U012-U017). */
  placeholderMode?: boolean;
  /** Fires when the user actually picks an option/day from the dropdown (not on open). */
  onSelect?: (value: string) => void;
  /** Cuando se provee + editMode + !selectable → input controlado (live text editing). */
  onChange?: (value: string) => void;
}
function MockField({
  label,
  value,
  width = "full",
  selectable = false,
  calendar = false,
  editMode = false,
  placeholderMode = false,
  onSelect,
  onChange,
}: MockFieldProps) {
  // In create mode the value renders in placeholder gray; selectable fields show their
  // suggested value (e.g. "Boletas"), text fields show "Placeholder" (U012-U017 spec).
  const display = placeholderMode && !selectable ? "Placeholder" : value;
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const isCalendarField = selectable && calendar && editMode;
  const isInteractive = selectable && editMode;
  const [open, setOpen] = useState(false);
  if (selectable) {
    // In view mode the embedded ToggleCards is recolored to gray-200 via
    // scoped CSS (.usr-mock-sd). In edit mode we omit that class so the
    // DS default (black ToggleCards) renders, signalling "editable".
    // Edit mode also enables real expand-on-click with mock options.
    const itemList = editMode && label ? (MOCK_OPTIONS[label] ?? []) : [];
    const headerLabel = selectedValue ?? display;
    const sdClass = [
      "usr-mock-sd",
      editMode ? "usr-mock-sd--edit" : "",
      isCalendarField ? "usr-mock-sd--calendar" : "",
    ].filter(Boolean).join(" ");
    // Picking an option/day saves it, closes the dropdown, and notifies the parent
    // (e.g. to advance the createMode disclosure flow).
    const handleSelect = (val: string) => {
      setSelectedValue(val);
      setOpen(false);
      onSelect?.(val);
    };
    return (
      <div className={`usr-mock-field usr-mock-field--${width}`}>
        {label && <span className="usr-mock-field__label">{label}</span>}
        {/* sd-wrap: relative anchor so expanded options/calendar float ABOVE the
            content below as an overlay (absolute) instead of pushing it down. */}
        <div className="usr-mock-field__sd-wrap">
          <SelectionDropdown
            className={sdClass}
            label={headerLabel}
            items={isCalendarField ? [] : (editMode ? itemList.map((opt) => ({ label: opt, onClick: () => handleSelect(opt) })) : [])}
            {...(isInteractive
              ? { isOpen: open, onToggle: () => setOpen((o) => !o) }
              : {})}
          />
          {isCalendarField && (
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="cal"
                  className="usr-mock-field__calendar"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={springs.expanding}
                >
                  <MockCalendar onSelect={handleSelect} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={`usr-mock-field usr-mock-field--${width}`}>
      {label && <span className="usr-mock-field__label">{label}</span>}
      <div className={`usr-mock-field__pill${editMode ? " usr-mock-field__pill--edit" : ""}${placeholderMode ? " usr-mock-field__pill--placeholder" : ""}`}>
        {editMode ? (
          onChange ? (
            <input
              className="usr-mock-field__input"
              type="text"
              placeholder={placeholderMode ? "Placeholder" : undefined}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <input
              className="usr-mock-field__input"
              type="text"
              placeholder={placeholderMode ? "Placeholder" : undefined}
              defaultValue={placeholderMode ? "" : value}
            />
          )
        ) : (
          <span className="usr-mock-field__value">{display}</span>
        )}
      </div>
    </div>
  );
}

// ── Drawer tabs (Personal / Puesto / Usuario) ───────────────

type DrawerTab = "personal" | "puesto" | "usuario";

interface FormDraft {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  cedula: string;
  telefono: string;
}

interface DrawerProps {
  open: boolean;
  tab: DrawerTab;
  setTab: (t: DrawerTab) => void;
  personalPage: 0 | 1;
  setPersonalPage: (p: 0 | 1) => void;
  editMode: boolean;
  createMode?: boolean;
  stepperFooter?: boolean;
  draft: FormDraft;
  setDraft: (d: FormDraft) => void;
  onSubmitCreate: () => void;
  onSubmitEdit: () => void;
  onStartEdit: () => void;
  onClose: () => void;
}
function SideDrawer({ open, tab, setTab, personalPage, setPersonalPage, editMode, createMode = false, stepperFooter = false, draft, setDraft, onSubmitCreate, onSubmitEdit, onStartEdit, onClose }: DrawerProps) {
  // In create mode the form behaves like edit (inputs editable, ToggleCards negros)
  // but with empty values and "NUEVO USUARIO" header. Sections accept editMode=true.
  const inputsEditable = editMode || createMode;
  // Apps-asignadas editor takes over the Usuario tab body (U022-U024).
  // Lifted here so the drawer's bottom action area can hide while editing.
  const [accessEditor, setAccessEditor] = useState<null | "form" | "save-confirm" | "delete-confirm">(null);
  React.useEffect(() => { if (!open) setAccessEditor(null); }, [open]);
  // Confirming = user clicked Guardar; show SlideButton to confirm.
  // Reset whenever the drawer closes or edit mode flips off.
  const [confirming, setConfirming] = useState(false);
  React.useEffect(() => {
    if (!open || !editMode) setConfirming(false);
  }, [open, editMode]);
  const goBack = () => {
    if (tab === "personal" && personalPage === 1) { setPersonalPage(0); return; }
    if (tab === "puesto") { setTab("personal"); setPersonalPage(1); return; }
    if (tab === "usuario") { setTab("puesto"); return; }
  };
  const goNext = () => {
    if (tab === "personal" && personalPage === 0) { setPersonalPage(1); return; }
    if (tab === "personal" && personalPage === 1) { setTab("puesto"); return; }
    if (tab === "puesto") { setTab("usuario"); return; }
  };
  const pickTab = (t: DrawerTab) => {
    setTab(t);
    if (t === "personal") setPersonalPage(0);
  };
  // Stepper U014→U017: personal/0, personal/1, puesto, usuario.
  const stepIndex =
    tab === "personal" ? (personalPage === 0 ? 0 : 1) : tab === "puesto" ? 2 : 3;
  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="usr-drawer-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            className="usr-drawer"
            initial={{ x: 670 }}
            animate={{ x: 0 }}
            exit={{ x: 670 }}
            transition={springs.expanding}
            role="dialog"
            aria-label={`Detalle de ${JUAN_DETAIL.nombre}`}
          >
            {/* Header — "NUEVO USUARIO" in create mode, else the user name. */}
            <div className="usr-drawer__head">
              <Avatar size={40} />
              <span className="usr-drawer__name">
                {createMode ? "NUEVO USUARIO" : JUAN_DETAIL.nombre}
              </span>
              <button
                type="button"
                className="usr-drawer__close"
                aria-label="Cerrar"
                onClick={onClose}
              >
                <Icon name="close" size="md" />
              </button>
            </div>

            {/* Tabs — NOT-IN-DS: section-nav chips (3 estados active/inactive) */}
            <div className="usr-drawer__tabs">
              {(["personal", "puesto", "usuario"] as DrawerTab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`usr-tab${tab === t ? " usr-tab--active" : ""}`}
                  onClick={() => pickTab(t)}
                >
                  {t === "personal" ? "Personal" : t === "puesto" ? "Puesto" : "Usuario"}
                </button>
              ))}
            </div>

            {/* Content (scrollable) */}
            <div className="usr-drawer__body">
              {tab === "personal" && personalPage === 0 && <PersonalDatosSection editMode={inputsEditable} createMode={createMode} draft={draft} setDraft={setDraft} />}
              {tab === "personal" && personalPage === 1 && <PersonalContactoSection editMode={inputsEditable} createMode={createMode} draft={draft} setDraft={setDraft} />}
              {tab === "puesto" && <PuestoSection editMode={inputsEditable} createMode={createMode} />}
              {tab === "usuario" && (
                <UsuarioSection
                  editMode={inputsEditable}
                  createMode={createMode}
                  accessEditor={accessEditor}
                  setAccessEditor={setAccessEditor}
                  stepperFooter={stepperFooter}
                  onSubmit={onSubmitCreate}
                />
              )}

              {/* While the access editor is up, hide the drawer's main action wrap —
                   EXCEPT in createMode, where "Crear usuario" stays visible but disabled. */}
              {(!accessEditor || createMode) && (<>
              {/* Bottom-right action area — 4 states with smooth crossfade:
                   - read mode    → Editar (DS Button)
                   - edit mode    → Cancelar + Guardar (DS Buttons)
                   - confirming   → SlideButton (DS), slide-to-confirm closes drawer.
                   - create mode  → "Crear usuario" CTA (DS Button)
                  U08-U017 spec. */}
              <div className={`usr-edit-pill-wrap${confirming ? " usr-edit-pill-wrap--slide" : ""}`}>
                <AnimatePresence mode="wait" initial={false}>
                  {/* In createMode the "Crear usuario" CTA lives in the footer (Usuario tab),
                      so the wrap.action area only handles read/edit/confirming states. */}
                  {!createMode && !editMode && (
                    <motion.div
                      key="editar"
                      layout
                      className="usr-edit-pill-wrap__inner usr-editar-hover"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={springs.popping}
                    >
                      <Button
                        color="black"
                        layout="icon-left"
                        icon="edit"
                        label="Editar"
                        size="md"
                        onClick={onStartEdit}
                      />
                    </motion.div>
                  )}
                  {editMode && !confirming && (
                    <motion.div
                      key="cancel-save"
                      className="usr-edit-pill-wrap__inner"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={springs.popping}
                    >
                      <Button
                        color="white"
                        layout="label"
                        label="Cancelar"
                        size="md"
                        onClick={onClose}
                      />
                      <Button
                        color="black"
                        layout="icon-left"
                        icon="good"
                        label="Guardar"
                        size="md"
                        onClick={() => setConfirming(true)}
                      />
                    </motion.div>
                  )}
                  {editMode && confirming && (
                    <motion.div
                      key="slide"
                      className="usr-edit-pill-wrap__inner"
                      initial={{ opacity: 0, scale: 0.94, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.94, x: 20 }}
                      transition={springs.expanding}
                    >
                      <SlideButton
                        label="Guardar"
                        confirmedLabel="Guardado"
                        autoReset={false}
                        onConfirm={() => {
                          setTimeout(onSubmitEdit, 600);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </>)}
            </div>

            {/* Footer nav — back arrow + (forward / "Crear usuario" on Usuario tab).
                Usuario tab footer shows Crear usuario per U07/U015 spec:
                  · createMode → black & enabled
                  · editMode/read → gray & disabled (visible placeholder)
                stepperFooter (U014-U017 nuevo flujo): back + 4-dot stepper + go.
                  El go en el último paso (usuario) actúa como submit (cierra drawer). */}
            <div className={`usr-drawer__foot${stepperFooter ? " usr-drawer__foot--stepper" : ""}`}>
              {stepperFooter ? (
                <>
                  <NavigationControls navigation="back" onClick={goBack} />
                  <div className="usr-stepper" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={stepIndex + 1}>
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`usr-stepper__dot${i === stepIndex ? " usr-stepper__dot--active" : ""}`}
                      />
                    ))}
                  </div>
                  {tab === "usuario" ? (
                    <div className="usr-nav-disabled" aria-disabled="true">
                      <NavigationControls navigation="go" />
                    </div>
                  ) : (
                    <NavigationControls navigation="go" onClick={goNext} />
                  )}
                </>
              ) : (
                <>
                  <NavigationControls navigation="back" onClick={goBack} />
                  {tab !== "usuario" ? (
                    <NavigationControls navigation="go" onClick={goNext} />
                  ) : (
                    <Button
                      color={createMode && !accessEditor ? "black" : "gray"}
                      layout="icon-left"
                      icon="user"
                      label="Crear usuario"
                      size="md"
                      state={createMode && !accessEditor ? "standard" : "disabled"}
                      onClick={createMode && !accessEditor ? onSubmitCreate : undefined}
                    />
                  )}
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Drawer sections ─────────────────────────────────────────

// NOT-IN-DS: SectionTitle — heading + optional info icon w/ hover tooltip (U017 spec)
function SectionTitle({
  title,
  infoIcon = false,
  tooltipText,
}: {
  title: string;
  infoIcon?: boolean;
  tooltipText?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <h3 className="usr-section__title">
      {title}
      {infoIcon && (
        <span
          className="usr-section__info"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Icon name="info" size="sm" />
          {tooltipText && (
            <AnimatePresence>
              {hover && (
                <motion.span
                  className="usr-info-tooltip"
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={springs.popping}
                >
                  {tooltipText}
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </span>
      )}
    </h3>
  );
}

function PersonalDatosSection({ editMode = false, createMode = false, draft, setDraft }: { editMode?: boolean; createMode?: boolean; draft?: FormDraft; setDraft?: (d: FormDraft) => void }) {
  const p = JUAN_DETAIL.personal;
  const ph = createMode;
  // En read mode (sin draft) mostramos el mock estático; con draft (create/edit) controlamos.
  const ctrl = !!draft && !!setDraft && editMode;
  const update = (k: keyof FormDraft) => (v: string) => setDraft!({ ...draft!, [k]: v });
  return (
    <div className="usr-section">
      <SectionTitle title="DATOS PERSONALES" />
      <MockField label="Nombre"          value={ctrl ? draft!.nombre          : p.nombre}          editMode={editMode} placeholderMode={ph} onChange={ctrl ? update("nombre")          : undefined} />
      <MockField label="Primer apellido" value={ctrl ? draft!.primerApellido  : p.primerApellido}  editMode={editMode} placeholderMode={ph} onChange={ctrl ? update("primerApellido")  : undefined} />
      <MockField label="Segundo apellido" value={ctrl ? draft!.segundoApellido : p.segundoApellido} editMode={editMode} placeholderMode={ph} onChange={ctrl ? update("segundoApellido") : undefined} />
      <MockField label="Cédula"          value={ctrl ? draft!.cedula          : p.cedula}          editMode={editMode} placeholderMode={ph} onChange={ctrl ? update("cedula")          : undefined} />
      <div className="usr-row">
        <MockField label="Género" value={p.genero} width="half" selectable editMode={editMode} placeholderMode={ph} />
        <MockField label="Fecha de nacimiento" value={p.fechaNacimiento} width="half" selectable calendar editMode={editMode} placeholderMode={ph} />
      </div>
    </div>
  );
}

function PersonalContactoSection({ editMode = false, createMode = false, draft, setDraft }: { editMode?: boolean; createMode?: boolean; draft?: FormDraft; setDraft?: (d: FormDraft) => void }) {
  const c = JUAN_DETAIL.contacto;
  const ph = createMode;
  const ctrl = !!draft && !!setDraft && editMode;
  const onTel = ctrl ? (v: string) => setDraft!({ ...draft!, telefono: v }) : undefined;
  return (
    <div className="usr-section">
      <SectionTitle title="CONTACTO" />
      <div className="usr-row">
        <MockField label="País" value={c.pais} width="half" selectable editMode={editMode} placeholderMode={ph} />
        <MockField label="Provincia" value={c.provincia} width="half" selectable editMode={editMode} placeholderMode={ph} />
      </div>
      <div className="usr-row">
        <MockField label="Cantón" value={c.canton} width="half" selectable editMode={editMode} placeholderMode={ph} />
        <MockField label="Distrito" value={c.distrito} width="half" selectable editMode={editMode} placeholderMode={ph} />
      </div>
      <MockField label="Dirección" value={c.direccion} editMode={editMode} placeholderMode={ph} />
      <MockField label="Correo electrónico" value={c.correo} editMode={editMode} placeholderMode={ph} />
      <div className="usr-row">
        <MockField label="Teléfono" value={ctrl ? draft!.telefono : c.telefono} width="half" editMode={editMode} placeholderMode={ph} onChange={onTel} />
        <MockField label="Teléfono secundario" value={c.telefono2} width="half" editMode={editMode} placeholderMode={ph} />
      </div>
    </div>
  );
}

function PuestoSection({ editMode = false, createMode = false }: { editMode?: boolean; createMode?: boolean }) {
  const p = JUAN_DETAIL.puesto;
  const ph = createMode;
  return (
    <div className="usr-section">
      <SectionTitle title="INFORMACIÓN LABORAL" />
      <div className="usr-row">
        <MockField label="Departamento" value={p.departamento} width="half" selectable editMode={editMode} placeholderMode={ph} />
        <MockField label="Puesto" value={p.puesto} width="half" selectable editMode={editMode} placeholderMode={ph} />
      </div>
      <div className="usr-row">
        <MockField label="Fecha de ingreso" value={p.fechaIngreso} width="half" selectable calendar editMode={editMode} placeholderMode={ph} />
        <MockField label="Fecha de salida" value={p.fechaSalida} width="half" selectable calendar editMode={editMode} placeholderMode={ph} />
      </div>
      <MockField label="Estado" value={p.estado} width="half" selectable editMode={editMode} placeholderMode={ph} />

      <h3 className="usr-section__title usr-section__title--spaced">
        EQUIPAMIENTO LABORAL
      </h3>
      <div className="usr-row">
        <MockField label="Talla de camisa" value={p.tallaCamisa} width="half" selectable editMode={editMode} placeholderMode={ph} />
        <MockField label="Talla de pantalón" value={p.tallaPantalon} width="half" selectable editMode={editMode} placeholderMode={ph} />
      </div>
    </div>
  );
}

type AccessEditorState = null | "form" | "save-confirm" | "delete-confirm";

interface UsuarioSectionProps {
  editMode?: boolean;
  createMode?: boolean;
  accessEditor?: AccessEditorState;
  setAccessEditor?: (s: AccessEditorState) => void;
  stepperFooter?: boolean;
  onSubmit?: () => void;
}

function UsuarioSection({
  editMode = false,
  createMode = false,
  accessEditor = null,
  setAccessEditor,
  stepperFooter = false,
  onSubmit,
}: UsuarioSectionProps) {
  const u = JUAN_DETAIL.usuario;
  // In existing-user mode (edit/read) the form is fully filled (Líder + Definido by default).
  // In createMode it starts empty and reveals sections progressively (U017 → U020).
  const [role, setRole] = useState(createMode ? "" : u.roles);
  const [tipo, setTipo] = useState(createMode ? "" : u.tipo);
  // Progressive disclosure step for createMode: 'apps' → 'roles' → 'tipo' → 'fecha' → 'done'.
  // Non-createMode is always 'done' so every section renders.
  const [step, setStep] = useState<'apps'|'roles'|'tipo'|'fecha'|'done'>(createMode ? 'apps' : 'done');
  const showRoles = step !== 'apps';
  const showTipo  = step === 'tipo' || step === 'fecha' || step === 'done';
  const showFecha = (step === 'fecha' || step === 'done') && tipo === 'Definido';
  // "Apps asignadas" only after the user has completed the access config.
  const showAccessPill = !createMode || step === 'done';
  // Apps asignadas: kebab hover → "Editar" chip; click → screen-level editor (U022-U024)
  const [accessKebabHover, setAccessKebabHover] = useState(false);
  const [accessRole, setAccessRole] = useState(u.accesoRol);
  const ph = createMode;

  const closeEditor = () => setAccessEditor?.(null);

  // U022-U024: editor card replaces Apps/Roles/TIPO/Fecha, but the
  // "Accesos asignados" section at the bottom stays visible (dimmed).
  //   form         = U022 (Apps + Roles + 3 buttons)
  //   save-confirm = U023 (SlideButton Guardar)
  //   delete-confirm = U024 (SlideButton Eliminar)
  if (accessEditor) {
    return (
      <motion.div
        className="usr-section usr-access-editor-screen"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 16 }}
        transition={springs.expanding}
      >
        <SectionTitle
          title="ACCESOS"
          infoIcon
          tooltipText="Configurá la app y el rol con el que este usuario podrá ingresar."
        />
        <div className="usr-access-editor-card">
          <MockField label="Apps" value={u.accesoApp} selectable editMode />
          <div className="usr-block">
            <span className="usr-block__label">Roles</span>
            <div className="usr-chip-row">
              {["Líder", "Maestro de obras", "Bodega", "Transportista", "Administrador"].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`usr-chip usr-chip--edit${r === accessRole ? " usr-chip--active" : ""}`}
                  onClick={() => setAccessRole(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="usr-access-editor__actions">
          <AnimatePresence mode="wait" initial={false}>
            {accessEditor === "form" && (
              <motion.div
                key="form-actions"
                className="usr-access-editor__actions-inner"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={springs.popping}
              >
                <Button
                  color="red"
                  layout="icon-left"
                  icon="delete"
                  label="Eliminar"
                  size="md"
                  onClick={() => setAccessEditor?.("delete-confirm")}
                />
                <div className="usr-access-editor__actions-right">
                  <Button
                    color="white"
                    layout="label"
                    label="Cancelar"
                    size="md"
                    onClick={closeEditor}
                  />
                  <Button
                    color="green"
                    layout="icon-left"
                    icon="good"
                    label="Guardar"
                    size="md"
                    onClick={() => setAccessEditor?.("save-confirm")}
                  />
                </div>
              </motion.div>
            )}
            {accessEditor === "save-confirm" && (
              <motion.div
                key="save-slide"
                className="usr-access-editor__slide"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={springs.expanding}
              >
                <Button
                  color="white"
                  layout="label"
                  label="Cancelar"
                  size="md"
                  onClick={() => setAccessEditor?.("form")}
                />
                <SlideButton
                  label="Guardar"
                  confirmedLabel="Guardado"
                  autoReset={false}
                  onConfirm={() => setTimeout(closeEditor, 600)}
                />
              </motion.div>
            )}
            {accessEditor === "delete-confirm" && (
              <motion.div
                key="delete-slide"
                className="usr-access-editor__slide"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={springs.expanding}
              >
                <SlideButton
                  mode="eliminar"
                  label="Eliminar"
                  confirmedLabel="Eliminado"
                  autoReset={false}
                  onConfirm={() => setTimeout(closeEditor, 600)}
                />
                <Button
                  color="white"
                  layout="label"
                  label="Cancelar"
                  size="md"
                  onClick={() => setAccessEditor?.("form")}
                />
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* "Accesos asignados" section stays visible below the editor card, dimmed */}
        <div className="usr-block usr-access-dimmed">
          <span className="usr-block__label">Accesos asignados</span>
          <div className="usr-access-row">
            <div className="usr-access-pill">
              <span className="usr-access-pill__label">{u.accesoApp}</span>
              <span className="usr-access-pill__role usr-access-pill__role--edit">
                {accessRole}
                <Icon name="info" size="sm" />
              </span>
              <Icon name="options" size="sm" />
            </div>
            <Button
              color="gray"
              layout="icon-left"
              icon="plus"
              label="Agregar App"
              size="md"
              state="disabled"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // Click handlers that advance the progressive flow (createMode only).
  const onPickApp  = () => { if (createMode && step === 'apps') setStep('roles'); };
  const onPickRole = (r: string) => {
    setRole(r);
    if (createMode && step === 'roles') setStep('tipo');
  };
  const onPickTipo = (t: string) => {
    setTipo(t);
    if (createMode) setStep(t === 'Indefinido' ? 'done' : 'fecha');
  };
  const onPickFecha = () => { if (createMode && step === 'fecha') setStep('done'); };

  // Shared motion props for the disclosed sections.
  const reveal = {
    initial: { opacity: 0, y: -8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.98 },
    transition: springs.expanding,
  };

  return (
    <div className="usr-section">
      <SectionTitle
        title="ACCESOS"
        infoIcon
        tooltipText="Seleccioná las apps a las que este usuario va a poder ingresar. Solo podrá utilizar las que estén habilitadas acá."
      />
      <MockField label="Apps" value={u.apps} selectable editMode={editMode} placeholderMode={ph} onSelect={onPickApp} />

      <AnimatePresence initial={false}>
        {showRoles && (
          <motion.div key="roles" {...reveal} className="usr-block">
            <span className="usr-block__label">Roles</span>
            <div className="usr-chip-row">
              {["Líder", "Maestro de obras", "Bodega", "Transportista"].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`usr-chip${r === role ? " usr-chip--active" : ""}${(editMode || createMode) ? " usr-chip--edit" : ""}`}
                  onClick={(editMode || createMode) ? () => onPickRole(r) : undefined}
                  disabled={!(editMode || createMode)}
                >
                  {r}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {showTipo && (
          <motion.div key="tipo" {...reveal} className="usr-block">
            <SectionTitle
              title="TIPO"
              infoIcon
              tooltipText="Definido = acceso con fecha de vencimiento. Indefinido = acceso permanente hasta que se revoque."
            />
            <div className="usr-chip-row">
              {["Definido", "Indefinido"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`usr-chip${t === tipo ? " usr-chip--active" : ""}${(editMode || createMode) ? " usr-chip--edit" : ""}`}
                  onClick={(editMode || createMode) ? () => onPickTipo(t) : undefined}
                  disabled={!(editMode || createMode)}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {showFecha && (
          <motion.div key="fecha" {...reveal}>
            <MockField label="Fecha" value={u.fecha} selectable calendar editMode={editMode} placeholderMode={ph} onSelect={onPickFecha} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apps asignadas: visible in read/edit, and in createMode only after step === 'done'
          (U020 final state). */}
      {showAccessPill && (
      <div className="usr-block">
        <span className="usr-block__label">Apps asignadas</span>
        <div className="usr-access-row">
          <div className="usr-access-pill">
            <span className="usr-access-pill__label">{u.accesoApp}</span>
            <span className={`usr-access-pill__role${editMode ? " usr-access-pill__role--edit" : ""}`}>
              {accessRole}
              <Icon name="info" size="sm" />
            </span>
            {/* Kebab → hover "Editar" chip → opens screen-level editor (U019-U021) */}
            <span
              className="usr-access-pill__kebab-wrap"
              onMouseEnter={() => setAccessKebabHover(true)}
              onMouseLeave={() => setAccessKebabHover(false)}
            >
              <button
                type="button"
                className="usr-access-pill__kebab"
                aria-label="Más opciones"
              >
                <Icon name="options" size="sm" />
              </button>
              <AnimatePresence>
                {accessKebabHover && (
                  <motion.button
                    type="button"
                    className="usr-access-edit-chip"
                    initial={{ opacity: 0, x: 4, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 4, scale: 0.94 }}
                    transition={springs.popping}
                    onClick={() => setAccessEditor?.("form")}
                  >
                    <Icon name="edit" size="sm" />
                    <span>Editar</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </span>
          </div>
          <Button
            color={editMode ? "green" : "gray"}
            layout="icon-left"
            icon="plus"
            label="Agregar App"
            size="md"
            state={editMode ? "standard" : "disabled"}
          />
        </div>
      </div>
      )}

      {/* "Crear usuario" CTA — sólo cuando todas las selecciones del flujo
          progresivo están completas (step === 'done'). U017 stepperFooter. */}
      {createMode && stepperFooter && step === 'done' && (
        <motion.div
          className="usr-create-cta"
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={springs.popping}
        >
          <Button
            color="black"
            layout="icon-left"
            icon="user"
            label="Crear usuario"
            size="md"
            onClick={onSubmit}
          />
        </motion.div>
      )}
    </div>
  );
}

// ── Componente principal ────────────────────────────────────

interface UsuariosProps {
  initialCollapsed?: boolean;
  initialDrawer?: boolean;
  initialFilter?: ColumnKey | null;
  initialEditMode?: boolean;
  initialCreateMode?: boolean;
  stepperFooter?: boolean;
}

export function Usuarios({
  initialCollapsed = false,
  initialDrawer = false,
  initialFilter = null,
  initialEditMode = false,
  initialCreateMode = false,
  stepperFooter = false,
}: UsuariosProps = {}) {
  const [sidebarOpen, setSidebarOpen] = useState(!initialCollapsed);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredHeader, setHoveredHeader] = useState<ColumnKey | null>(null);
  const [activeHeader, setActiveHeader] = useState<ColumnKey | null>(null);
  const [filterOpen, setFilterOpen] = useState<ColumnKey | null>(initialFilter);
  const [drawerOpen, setDrawerOpen] = useState(initialDrawer || initialEditMode || initialCreateMode);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>("personal");
  const [personalPage, setPersonalPage] = useState<0 | 1>(0);
  const [editMode, setEditMode] = useState(initialEditMode);
  const [createMode, setCreateMode] = useState(initialCreateMode);
  const [sort, setSort] = useState<{ col: ColumnKey; dir: "asc" | "desc" } | null>(null);

  // Lista de usuarios (mutable) — empieza con los mocks importados.
  const [users, setUsers] = useState<UserRow[]>(USERS);
  // Cuál usuario se está visualizando/editando (null cuando es create o drawer cerrado).
  const [editingId, setEditingId] = useState<number | null>(null);
  // Form draft compartido por las secciones controladas (Personal Datos + Contacto).
  const emptyDraft = {
    nombre: "", primerApellido: "", segundoApellido: "", cedula: "", telefono: "",
  };
  const [draft, setDraft] = useState(emptyDraft);
  const draftFromJuan = () => ({
    nombre: JUAN_DETAIL.personal.nombre,
    primerApellido: JUAN_DETAIL.personal.primerApellido,
    segundoApellido: JUAN_DETAIL.personal.segundoApellido,
    cedula: JUAN_DETAIL.personal.cedula,
    telefono: JUAN_DETAIL.contacto.telefono,
  });

  const toggleSort = (col: ColumnKey) => {
    setSort((prev) => {
      if (!prev || prev.col !== col) return { col, dir: "asc" };
      return { col, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  const openDrawerView = (userId: number) => {
    setEditingId(userId);
    setDraft(draftFromJuan());
    setEditMode(false);
    setCreateMode(false);
    setDrawerTab("personal");
    setPersonalPage(0);
    setDrawerOpen(true);
  };
  const startEdit = () => {
    setEditMode(true);
    setCreateMode(false);
    setDrawerTab("personal");
    setPersonalPage(0);
    setDrawerOpen(true);
  };
  const startCreate = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setCreateMode(true);
    setEditMode(false);
    setDrawerTab("personal");
    setPersonalPage(0);
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditMode(false);
    setCreateMode(false);
  };
  // Crear: aplana draft a nombre completo + agrega a la tabla.
  const submitCreate = () => {
    const fullName = [draft.nombre, draft.primerApellido, draft.segundoApellido]
      .filter(Boolean).join(" ").trim() || "Nuevo Usuario";
    const newId = Math.max(0, ...users.map(u => u.id)) + 1;
    setUsers([...users, {
      id: newId,
      nombre: fullName,
      cedula: draft.cedula || "—",
      telefono: draft.telefono || "—",
      departamento: "Producción",
      rol: "Ingeniero",
      estado: "activo",
    }]);
    closeDrawer();
  };
  // Editar: actualiza la fila correspondiente del draft.
  const submitEdit = () => {
    if (editingId == null) { closeDrawer(); return; }
    const fullName = [draft.nombre, draft.primerApellido, draft.segundoApellido]
      .filter(Boolean).join(" ").trim();
    setUsers(users.map(u => u.id === editingId ? {
      ...u,
      nombre: fullName || u.nombre,
      cedula: draft.cedula || u.cedula,
      telefono: draft.telefono || u.telefono,
    } : u));
    closeDrawer();
  };

  // Anchor popover to real DOM position of the active header cell
  const [filterAnchor, setFilterAnchor] = useState<{ left: number; top: number }>({ left: 0, top: 168 });
  React.useEffect(() => {
    if (!filterOpen) return;
    const cell = document.querySelector(
      `.usr-thead__cell--${filterOpen}`,
    ) as HTMLElement | null;
    const main = document.querySelector(".usr-main") as HTMLElement | null;
    if (!cell || !main) return;
    const cellBox = cell.getBoundingClientRect();
    const mainBox = main.getBoundingClientRect();
    const col = COLUMNS.find((c) => c.key === filterOpen);
    const popW = col?.mode === "list" ? 240 : 330;
    const cellCenter = cellBox.left - mainBox.left + cellBox.width / 2;
    let left = cellCenter - popW / 2;
    left = Math.max(8, Math.min(left, mainBox.width - popW - 8));
    const top = cellBox.bottom - mainBox.top + 8;
    setFilterAnchor({ left, top });
  }, [filterOpen]);

  return (
    <div className="usr-shell">
      {/* ── Sidebar ───────────────────────────────────────── */}
      <motion.aside
        className={`usr-sidebar usr-sidebar--${sidebarOpen ? "expanded" : "collapsed"}`}
        initial={false}
        animate={{ width: sidebarOpen ? 396 : 155 }}
        transition={springs.expanding}
      >
        <div className="usr-sidebar__items">
          <TabsMenu
            label={sidebarOpen ? "ROLES" : ""}
            layout={sidebarOpen ? "label+icon" : "label+icon"}
            icon="rol"
          />
          <TabsMenu
            label={sidebarOpen ? "USUARIOS" : ""}
            layout="label+icon"
            icon="user"
          />
          <TabsMenu
            label={sidebarOpen ? "CUADRILLAS" : ""}
            layout="label+icon"
            icon="cuadrillas"
          />
        </div>

        {/* Bottom FAB — toggle sidebar (U01/U02 spec) */}
        <motion.button
          type="button"
          className="usr-sidebar__menu"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? "Colapsar menú" : "Expandir menú"}
          animate={{ rotate: sidebarOpen ? 0 : 90 }}
          transition={springs.snappy}
        >
          <Icon name="menu" size="md" />
        </motion.button>
      </motion.aside>

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="usr-main">
        <header className="usr-topbar">
          <h1 className="usr-title">USUARIOS</h1>
          <Button
            color="green"
            layout="icon"
            icon="plus"
            ariaLabel="Agregar usuario"
            onClick={startCreate}
          />
        </header>

        <section className="usr-card">
          {/* Header row */}
          <div className="usr-thead">
            {COLUMNS.map((c) => (
              <div key={c.key} className={`usr-thead__cell usr-thead__cell--${c.key}`}>
                <SortableHeader
                  label={c.label}
                  active={activeHeader === c.key || filterOpen === c.key}
                  hovered={hoveredHeader === c.key}
                  sortDir={sort?.col === c.key ? sort.dir : null}
                  onHover={(v) => setHoveredHeader(v ? c.key : null)}
                  onLabelClick={() => {
                    setActiveHeader(c.key);
                    setFilterOpen(c.key);
                  }}
                  onSortClick={() => toggleSort(c.key)}
                />
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="usr-tbody-wrap">
          <ul className="usr-tbody">
            {users.map((u) => (
              <li
                key={u.id}
                className={`usr-row${hoveredRow === u.id ? " usr-row--hover" : ""}`}
                onMouseEnter={() => setHoveredRow(u.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => openDrawerView(u.id)}
              >
                <UserCells user={u} />
                <div className="usr-row__cell usr-row__cell--kebab">
                  <OptionsMenu onEdit={() => { openDrawerView(u.id); startEdit(); }} />
                </div>
              </li>
            ))}
          </ul>
          </div>
        </section>

        {/* Filter popover */}
        <AnimatePresence>
          {filterOpen && (() => {
            const col = COLUMNS.find((c) => c.key === filterOpen);
            if (!col) return null;
            const opts =
              col.key === "trabajador"
                ? TRABAJADOR_OPTIONS
                : col.key === "cedula"
                  ? CEDULA_OPTIONS
                  : col.key === "telefono"
                    ? TELEFONO_OPTIONS
                    : col.key === "departamento"
                      ? DEPARTAMENTO_OPTIONS
                      : col.key === "rol"
                        ? ROL_LIST
                        : [];
            return (
              <FilterPopover
                mode={col.mode}
                placeholder={col.placeholder}
                options={opts}
                estadoOptions={col.key === "estado" ? ESTADO_OPTIONS : undefined}
                anchor={filterAnchor}
                onPick={() => {
                  setFilterOpen(null);
                  setActiveHeader(null);
                }}
                onClose={() => {
                  setFilterOpen(null);
                  setActiveHeader(null);
                }}
              />
            );
          })()}
        </AnimatePresence>
      </main>

      {/* ── Side drawer ───────────────────────────────────── */}
      <SideDrawer
        open={drawerOpen}
        tab={drawerTab}
        setTab={setDrawerTab}
        personalPage={personalPage}
        setPersonalPage={setPersonalPage}
        editMode={editMode}
        createMode={createMode}
        stepperFooter={stepperFooter}
        draft={draft}
        setDraft={setDraft}
        onSubmitCreate={submitCreate}
        onSubmitEdit={submitEdit}
        onStartEdit={() => setEditMode(true)}
        onClose={closeDrawer}
      />
    </div>
  );
}

// ── Cells for one user row ──────────────────────────────────

function UserCells({ user }: { user: UserRow }) {
  return (
    <>
      <div className="usr-row__cell usr-row__cell--trabajador">
        <Avatar size={32} />
        <span className="usr-row__name">{user.nombre}</span>
      </div>
      <div className="usr-row__cell usr-row__cell--cedula">{user.cedula}</div>
      <div className="usr-row__cell usr-row__cell--telefono">{user.telefono}</div>
      <div className="usr-row__cell usr-row__cell--departamento">{user.departamento}</div>
      <div className="usr-row__cell usr-row__cell--rol">
        <span className="usr-rol-pill">{user.rol}</span>
      </div>
      <div className="usr-row__cell usr-row__cell--estado">
        <StatusDot estado={user.estado} />
      </div>
    </>
  );
}
