import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../../Button/Button";
import { Icon } from "../../Icon/Icon";
import { OptionLabel } from "../../Form/Form";
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

// NOT-IN-DS: checkbox square (black-filled + white check when active, outline when not) — U03 spec
function FilterCheckbox({ active }: { active: boolean }) {
  return (
    <span className={`usr-checkbox${active ? " usr-checkbox--active" : ""}`}>
      {active && <Icon name="completado" size="sm" />}
    </span>
  );
}

export interface FilterDataRow {
  primary: string;
  secondary?: string;
}

interface FilterPopoverProps {
  mode: FilterMode;
  placeholder: string;
  options?: string[];
  dataRows?: FilterDataRow[];
  estadoOptions?: { label: string; indicator: "activo" | "inactivo" | null }[];
  onPick: (val: string) => void;
  onClose: () => void;
  anchor: { left: number; top: number };
}
function FilterPopover({
  mode,
  placeholder,
  options = [],
  dataRows = [],
  estadoOptions,
  onPick,
  onClose,
  anchor,
}: FilterPopoverProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number>(0);

  const popClass =
    mode === "list"
      ? "usr-filter-pop usr-filter-pop--compact"
      : mode === "search"
        ? "usr-filter-pop usr-filter-pop--search"
        : "usr-filter-pop";

  const filteredData = dataRows.filter((o) =>
    o.primary.toLowerCase().includes(query.toLowerCase()),
  );
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
        {(mode === "search" || mode === "search+list") && (
          <div className="usr-filter-pop__search">
            <SearchBar
              layout="normal"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        {/* search-only: 2-line result cards w/ dividers (U03.2/U03.3). Hidden when empty (U03.4). */}
        {mode === "search" && filteredData.length > 0 && (
          <div className="usr-filter-pop__list usr-filter-pop__list--dividers">
            {filteredData.map((row, i) => (
              <button
                key={`${row.primary}-${i}`}
                type="button"
                className="usr-filter-data"
                onClick={() => onPick(row.primary)}
              >
                <span className="usr-filter-data__primary">{row.primary}</span>
                {row.secondary && (
                  <span className="usr-filter-data__secondary">{row.secondary}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* search+list: checkbox rows (U03/U03.5) */}
        {mode === "search+list" && (
          <div className="usr-filter-pop__list">
            {filteredOpts.map((opt, i) => (
              <button
                key={`${opt}-${i}`}
                type="button"
                className={`usr-filter-row${i === selected ? " usr-filter-row--active" : ""}`}
                onClick={() => {
                  setSelected(i);
                  onPick(opt);
                }}
              >
                <FilterCheckbox active={i === selected} />
                <span className="usr-filter-row__label">{opt}</span>
              </button>
            ))}
          </div>
        )}

        {/* list (Estado U03.6): checkbox + label only, no status icons */}
        {mode === "list" && estadoOptions && (
          <div className="usr-filter-pop__list">
            {estadoOptions.map((opt, i) => (
              <button
                key={`${opt.label}-${i}`}
                type="button"
                className={`usr-filter-row${i === selected ? " usr-filter-row--active" : ""}`}
                onClick={() => {
                  setSelected(i);
                  onPick(opt.label);
                }}
              >
                <FilterCheckbox active={i === selected} />
                <span className="usr-filter-row__label">{opt.label}</span>
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

interface MockFieldProps {
  label?: string;
  value: string;
  width?: "full" | "half";
  selectable?: boolean;
  editMode?: boolean;
  /** Create-mode: render Placeholder/Label text instead of the value (U012-U017). */
  placeholderMode?: boolean;
}
function MockField({
  label,
  value,
  width = "full",
  selectable = false,
  editMode = false,
  placeholderMode = false,
}: MockFieldProps) {
  // In create mode the value renders in placeholder gray; selectable fields show their
  // suggested value (e.g. "Boletas"), text fields show "Placeholder" (U012-U017 spec).
  const display = placeholderMode && !selectable ? "Placeholder" : value;
  if (selectable) {
    // In view mode the embedded ToggleCards is recolored to gray-200 via
    // scoped CSS (.usr-mock-sd). In edit mode we omit that class so the
    // DS default (black ToggleCards) renders, signalling "editable".
    return (
      <div className={`usr-mock-field usr-mock-field--${width}`}>
        {label && <span className="usr-mock-field__label">{label}</span>}
        <SelectionDropdown
          className={editMode ? "usr-mock-sd usr-mock-sd--edit" : "usr-mock-sd"}
          label={display}
          items={[]}
          isOpen={true}
        />
      </div>
    );
  }
  return (
    <div className={`usr-mock-field usr-mock-field--${width}`}>
      {label && <span className="usr-mock-field__label">{label}</span>}
      <div className={`usr-mock-field__pill${editMode ? " usr-mock-field__pill--edit" : ""}${placeholderMode ? " usr-mock-field__pill--placeholder" : ""}`}>
        {editMode ? (
          <input
            className="usr-mock-field__input"
            type="text"
            placeholder={placeholderMode ? "Placeholder" : undefined}
            defaultValue={placeholderMode ? "" : value}
          />
        ) : (
          <span className="usr-mock-field__value">{display}</span>
        )}
      </div>
    </div>
  );
}

// ── Drawer tabs (Personal / Puesto / Usuario) ───────────────

type DrawerTab = "personal" | "puesto" | "usuario";

interface DrawerProps {
  open: boolean;
  tab: DrawerTab;
  setTab: (t: DrawerTab) => void;
  personalPage: 0 | 1;
  setPersonalPage: (p: 0 | 1) => void;
  editMode: boolean;
  createMode?: boolean;
  onStartEdit: () => void;
  onClose: () => void;
}
function SideDrawer({ open, tab, setTab, personalPage, setPersonalPage, editMode, createMode = false, onStartEdit, onClose }: DrawerProps) {
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
              {tab === "personal" && personalPage === 0 && <PersonalDatosSection editMode={inputsEditable} createMode={createMode} />}
              {tab === "personal" && personalPage === 1 && <PersonalContactoSection editMode={inputsEditable} createMode={createMode} />}
              {tab === "puesto" && <PuestoSection editMode={inputsEditable} createMode={createMode} />}
              {tab === "usuario" && (
                <UsuarioSection
                  editMode={inputsEditable}
                  createMode={createMode}
                  accessEditor={accessEditor}
                  setAccessEditor={setAccessEditor}
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
                      className="usr-edit-pill-wrap__inner"
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
                          setTimeout(onClose, 600);
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
                  · editMode/read → gray & disabled (visible placeholder) */}
            <div className="usr-drawer__foot">
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
                  onClick={createMode && !accessEditor ? onClose : undefined}
                />
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

function PersonalDatosSection({ editMode = false, createMode = false }: { editMode?: boolean; createMode?: boolean }) {
  const p = JUAN_DETAIL.personal;
  const ph = createMode;
  return (
    <div className="usr-section">
      <SectionTitle title="DATOS PERSONALES" />
      <MockField label="Nombre" value={p.nombre} editMode={editMode} placeholderMode={ph} />
      <MockField label="Primer apellido" value={p.primerApellido} editMode={editMode} placeholderMode={ph} />
      <MockField label="Segundo apellido" value={p.segundoApellido} editMode={editMode} placeholderMode={ph} />
      <MockField label="Cédula" value={p.cedula} editMode={editMode} placeholderMode={ph} />
      <div className="usr-row">
        <MockField label="Género" value={p.genero} width="half" selectable editMode={editMode} placeholderMode={ph} />
        <MockField label="Fecha de nacimiento" value={p.fechaNacimiento} width="half" selectable editMode={editMode} placeholderMode={ph} />
      </div>
    </div>
  );
}

function PersonalContactoSection({ editMode = false, createMode = false }: { editMode?: boolean; createMode?: boolean }) {
  const c = JUAN_DETAIL.contacto;
  const ph = createMode;
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
        <MockField label="Teléfono" value={c.telefono} width="half" editMode={editMode} placeholderMode={ph} />
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
        <MockField label="Fecha de ingreso" value={p.fechaIngreso} width="half" selectable editMode={editMode} placeholderMode={ph} />
        <MockField label="Fecha de salida" value={p.fechaSalida} width="half" selectable editMode={editMode} placeholderMode={ph} />
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
}

function UsuarioSection({
  editMode = false,
  createMode = false,
  accessEditor = null,
  setAccessEditor,
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
      <div onClick={onPickApp} role={createMode ? "button" : undefined}>
        <MockField label="Apps" value={u.apps} selectable editMode={editMode} placeholderMode={ph} />
      </div>

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
          <motion.div key="tipo" {...reveal}>
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
          <motion.div key="fecha" {...reveal} onClick={onPickFecha} role={createMode ? "button" : undefined}>
            <MockField label="Fecha" value={u.fecha} selectable editMode={editMode} placeholderMode={ph} />
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
}

export function Usuarios({
  initialCollapsed = false,
  initialDrawer = false,
  initialFilter = null,
  initialEditMode = false,
  initialCreateMode = false,
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

  const toggleSort = (col: ColumnKey) => {
    setSort((prev) => {
      if (!prev || prev.col !== col) return { col, dir: "asc" };
      return { col, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  const openDrawerView = () => {
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
    const popW = col?.mode === "search" ? 290 : col?.mode === "list" ? 240 : 330;
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
            {USERS.map((u) => (
              <li
                key={u.id}
                className={`usr-row${hoveredRow === u.id ? " usr-row--hover" : ""}`}
                onMouseEnter={() => setHoveredRow(u.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={openDrawerView}
              >
                <UserCells user={u} />
                <div className="usr-row__cell usr-row__cell--kebab">
                  <OptionsMenu onEdit={startEdit} />
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
              col.key === "departamento"
                ? DEPARTAMENTO_OPTIONS
                : col.key === "rol"
                  ? ROL_LIST
                  : [];
            // For search-only columns, build 2-line cards (primary + secondary).
            // Teléfono (U03.4) intentionally empty — only the search bar shows.
            const dataRows =
              col.key === "trabajador"
                ? USERS.map((u) => ({ primary: u.nombre, secondary: u.cedula }))
                : col.key === "cedula"
                  ? USERS.map((u) => ({ primary: u.cedula, secondary: u.nombre }))
                  : [];
            return (
              <FilterPopover
                mode={col.mode}
                placeholder={col.placeholder}
                options={opts}
                dataRows={dataRows}
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
