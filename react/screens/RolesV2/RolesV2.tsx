import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../../Button/Button";
import { Icon } from "../../Icon/Icon";
import { CheckBox, FormField } from "../../Form/Form";
import { SearchBar } from "../../SearchBar/SearchBar";
import { SelectionDropdown } from "../../SelectionDropdown/SelectionDropdown";
import { TabsMenu } from "../../TabsMenu/TabsMenu";
import { ToggleCards } from "../../ToggleCards/ToggleCards";
import { springs } from "../../springs";
import {
  APPS,
  AREA_OPTIONS,
  EDIT_ROLE_PREFILL,
  KEBAB_ITEMS,
  PERMISSION_LABEL_OPTIONS,
  PERMISSION_SECTIONS,
  ROLE_GROUPS,
  type PermissionSection,
  type RoleGroup,
} from "./mock-data";
import "./RolesV2.css";

/* ============================================================
 * H4 — RolesV2 (desktop prototype, R01–R07)
 *
 *  R01  sidebar colapsado · vista base · grupo "Líder/Losa" activo
 *  R02  + kebab menu abierto (Editar / Duplicar / Eliminar disabled)
 *  R03  + search bar expandida (icono → input 331px)
 *  R04  + modal "Líder de losa" (edit role, prellenado)
 *  R05  + modal "NUEVO ROL" (create, placeholders)
 *  R06  base · grupo "Muros" activo · FAB inferior morph → "Agregar permiso" pill
 *  R07  + popover "Agregar permiso" (Label dropdown + Cancelar/Guardar)
 *
 *  DS components: Button, Icon, CheckBox, FormField, OptionLabel,
 *  SearchBar, SelectionDropdown, TabsMenu, springs.
 *
 *  NOT-IN-DS (inline, candidatos a promoción):
 *    · Avatar             — círculo gris con Icon.user
 *    · SmallPill          — selector 28px Losa/Boletas (tone active/standard)
 *    · GroupCard          — folder header pill negro + chevron + items
 *    · PermissionSection  — header collapsible + lista de CheckBox
 *    · KebabPopover       — caja blanca 165×138 con 3 rows + divider antes Eliminar
 *    · SearchToggle       — Icon button → SearchBar expandida (motion width)
 *    · AddPermFab         — morph: list FAB 80×80 → pill "Agregar permiso" 209×80
 *    · AddPermPopover     — caja blanca 405×288 con SelectionDropdown + acciones
 *    · RoleModal          — panel derecho 457×560 (no scrim) con FormFields
 * ============================================================ */

// ── NOT-IN-DS: Avatar ───────────────────────────────────────

function Avatar({ size = 64 }: { size?: number }) {
  return (
    <div className="rv-avatar" style={{ width: size, height: size }}>
      <Icon name="user" size={size >= 40 ? "lg" : "md"} />
    </div>
  );
}

// ── NOT-IN-DS: SmallPill ────────────────────────────────────

interface SmallPillProps {
  label: string;
  tone?: "active" | "standard";
  onClick?: () => void;
}
function SmallPill({ label, tone = "standard", onClick }: SmallPillProps) {
  return (
    <button
      type="button"
      className={`rv-pill rv-pill--${tone}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ── NOT-IN-DS: GroupCard ────────────────────────────────────

interface GroupCardProps {
  group: RoleGroup;
  activeRoleId: string;
  onPickRole: (id: string) => void;
}
function GroupCard({ group, activeRoleId, onPickRole }: GroupCardProps) {
  const [open, setOpen] = useState(group.defaultOpen);
  return (
    <div className={`rv-group${open ? " rv-group--open" : ""}`}>
      <div className="rv-group__head">
        <span className="rv-group__title">{group.title}</span>
        <ToggleCards
          size="small"
          visibility={open ? "open" : "close"}
          onClick={() => setOpen((v) => !v)}
          ariaLabel={open ? `Cerrar ${group.title}` : `Abrir ${group.title}`}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="items"
            className="rv-group__items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springs.expanding}
          >
            <div className="rv-group__items-inner">
              {group.items.map((it) => {
                const active = it.id === activeRoleId;
                return (
                  <button
                    key={it.id}
                    type="button"
                    className={`rv-group-item${active ? " rv-group-item--active" : ""}`}
                    onClick={() => onPickRole(it.id)}
                  >
                    {it.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── NOT-IN-DS: PermissionSectionView ────────────────────────

function PermissionSectionView({ section }: { section: PermissionSection }) {
  const [open, setOpen] = useState(section.defaultOpen);
  const [items, setItems] = useState(section.items);
  // Hovered row id: row bg → gray-100 + CheckBox previewed in "hover" state
  // (negro tenue) — clarifica el target de la próxima selección.
  const [hoverId, setHoverId] = useState<string | null>(null);
  const toggleItem = (id: string) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)),
    );
  return (
    <div className="rv-perm-section">
      <button
        type="button"
        className="rv-perm-section__head"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="rv-perm-section__chevron">
          <Icon name={open ? "close" : "open"} size="md" />
        </span>
        <span className="rv-perm-section__title">{section.title}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && items.length > 0 && (
          <motion.ul
            key="items"
            className="rv-perm-section__list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springs.expanding}
          >
            {items.map((it) => (
              <li
                key={it.id}
                className={`rv-perm-row${hoverId === it.id ? " rv-perm-row--hover" : ""}`}
                onMouseEnter={() => setHoverId(it.id)}
                onMouseLeave={() => setHoverId((cur) => (cur === it.id ? null : cur))}
                onClick={() => toggleItem(it.id)}
              >
                <CheckBox
                  label={it.label}
                  checked={it.checked}
                  state={
                    it.checked
                      ? "checked"
                      : hoverId === it.id
                        ? "hover"
                        : "standard"
                  }
                />
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── NOT-IN-DS: KebabPopover ─────────────────────────────────

interface KebabPopoverProps {
  open: boolean;
  onClose: () => void;
  onAction: (action: "editar" | "duplicar" | "eliminar") => void;
}
function KebabPopover({ open, onClose, onAction }: KebabPopoverProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="rv-kebab-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            onClick={onClose}
          />
          <motion.div
            key="pop"
            className="rv-kebab-pop"
            initial={{ opacity: 0, scale: 0.94, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -6 }}
            transition={springs.popping}
            onClick={(e) => e.stopPropagation()}
          >
            {KEBAB_ITEMS.map((it, i) => (
              <React.Fragment key={it.action}>
                {i === KEBAB_ITEMS.length - 1 && <div className="rv-kebab-pop__divider" />}
                <button
                  type="button"
                  className={`rv-kebab-pop__row${it.disabled ? " rv-kebab-pop__row--disabled" : ""}`}
                  disabled={it.disabled}
                  onClick={() => !it.disabled && onAction(it.action)}
                >
                  <Icon name={it.icon} size="md" />
                  <span>{it.label}</span>
                </button>
              </React.Fragment>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── NOT-IN-DS: SearchToggle (wraps DS SearchBar) ─────────────
// Collapsed → DS SearchBar layout="icon" (65px circle).
// Expanded → DS SearchBar layout="label" (pill with placeholder + close).
// The wrapper itself doesn't morph; the parent .rv-detail__search container
// is what animates between top-right corner and full-width above the body.

function SearchToggle({
  open,
  onToggle,
  onClose,
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return open ? (
    <SearchBar
      layout="label"
      placeholder="Buscar permiso"
      onClose={onClose}
    />
  ) : (
    <SearchBar
      layout="icon"
      onClick={onToggle}
      ariaLabel="Abrir búsqueda"
    />
  );
}

// ── NOT-IN-DS: AddPermFab + AddPermPopover ──────────────────

type AddPermStage = "fab" | "pill" | "pill-wide" | "morph" | "popover";
type AddRoleStage = "closed" | "pill" | "morph" | "modal";

// Premium ease — flat tween, no bounce. Linear / Arc / Raycast feel.
// 220ms per stage transition × 2 stages = total ≈ 440ms button → modal.
const PREMIUM_EASE = { type: "tween", duration: 0.22, ease: [0.32, 0.72, 0, 1] } as const;
// Slightly slower for big morph (220 → 457×560).
const PREMIUM_MORPH = { type: "tween", duration: 0.32, ease: [0.32, 0.72, 0, 1] } as const;

interface AddPermFabProps {
  stage: AddPermStage;
  onFabClick: () => void;
  onPillClick: () => void;
  onClose: () => void;
}
function AddPermFab({ stage, onFabClick, onPillClick, onClose }: AddPermFabProps) {
  const isPill = stage === "pill";
  const isPanel = stage === "morph" || stage === "popover";
  const showForm = stage === "popover";
  // SD interno (Label) abierto → la popover crece hacia arriba para alojar las opciones.
  const [sdOpen, setSdOpen] = useState(false);
  useEffect(() => { if (!showForm) setSdOpen(false); }, [showForm]);
  // Hover el FAB → pill (R010). Mouse-leave la contrae salvo que esté
  // ya en morph/popover. Click sobre el pill → morph → popover (R012).
  const onEnter = () => { if (stage === "fab") onFabClick(); };
  const onLeave = () => { if (stage === "pill") onClose(); };
  const onClick = () => { if (stage === "pill" || stage === "fab") onPillClick(); };

  // Dimensions per stage. Panel grows UPWARD from the FAB anchor (bottom-right
  // of the card body) — Motion handles this by anchoring bottom:0 in CSS and
  // letting height grow. y offset is unnecessary because the wrap is at the
  // bottom of the card.
  // Pill matches DS Button md: 56h, radius 16 (--ds-radius-lg), icon-left + label.
  // Popover height grows to 600 when the SD Label is open (room for 4 items).
  const dims =
    stage === "fab"
      ? { width: 56, height: 56, borderRadius: 16 }
      : isPill
        ? { width: 220, height: 56, borderRadius: 16 }
        : { width: 405, height: sdOpen ? 600 : 288, borderRadius: 24 };

  const transition = isPanel ? PREMIUM_MORPH : PREMIUM_EASE;

  return (
    <div
      className="rv-add-perm-wrap"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        className={`rv-add-perm rv-add-perm--${stage}`}
        initial={false}
        animate={{ ...dims, backgroundColor: isPanel ? "#ffffff" : "#000000" }}
        transition={transition}
        onClick={!isPanel ? onClick : undefined}
        role={isPanel ? "dialog" : undefined}
        aria-label={isPanel ? "Agregar permiso" : "Ver permisos"}
        style={{ cursor: !isPanel ? "pointer" : "default" }}
      >
        <AnimatePresence initial={false}>
          {!isPanel && (
            <motion.div
              key="pill-content"
              className="rv-add-perm__pill"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <span className="rv-add-perm__icon">
                <Icon name="list" size="md" />
              </span>
              <AnimatePresence initial={false}>
                {isPill && (
                  <motion.span
                    key="lbl"
                    className="rv-add-perm__label"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    exit={{ clipPath: "inset(0 100% 0 0)" }}
                    transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                  >
                    Agregar permiso
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {showForm && (
            <motion.div
              key="form"
              className="rv-add-perm__form"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              <AddPermFormStaggered onClose={onClose} onSdToggle={setSdOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function AddPermFormStaggered({
  onClose,
  onSdToggle,
}: {
  onClose: () => void;
  onSdToggle: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const toggleSd = () => {
    const next = !open;
    setOpen(next);
    onSdToggle(next);
  };
  const pickItem = (opt: string) => {
    setValue(opt);
    setOpen(false);
    onSdToggle(false);
  };
  return (
    <div className="rv-add-perm-popover__inner">
      <button
        type="button"
        className="rv-add-perm-popover__close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <Icon name="chevron-down" size="md" />
      </button>
      <motion.span className="rv-add-perm-popover__title" variants={FIELD_VARIANTS}>
        Agregar permiso
      </motion.span>
      <motion.div variants={FIELD_VARIANTS}>
        <SelectionDropdown
          label={value ?? "Label"}
          isOpen={open}
          onToggle={toggleSd}
          items={PERMISSION_LABEL_OPTIONS.map((opt) => ({
            label: opt,
            onClick: () => pickItem(opt),
          }))}
        />
      </motion.div>
      <motion.div className="rv-add-perm-popover__actions" variants={FIELD_VARIANTS}>
        <Button color="white" layout="label" label="Cancelar" size="md" onClick={onClose} />
        <Button
          color="green"
          layout="icon-left"
          icon="good"
          label="Guardar"
          size="md"
          onClick={onClose}
        />
      </motion.div>
    </div>
  );
}

// ── NOT-IN-DS: AddRoleMorph (premium microinteraction) ──────
// Shared-element morph: el botón `+` crece a pill ("Nuevo Rol") y luego
// morfea al modal "NUEVO ROL". No es un modal separado; el botón ES el modal.
//
//   closed (48×48 green squircle r12)
//     ↓ 220ms cubic [0.32, 0.72, 0, 1]
//   pill (220×48 green pill r24, + rota 45° → ×, "Nuevo Rol" L→R clipPath)
//     ↓ 320ms — width 220→457, height 48→560, y +8, bg green → white, r 24
//   morph (457×560 panel, form fields entran con stagger 50ms)
//     ↓ instantaneous after stagger
//   modal (focus en "Nombre del rol")

interface AddRoleMorphProps {
  stage: AddRoleStage;
  onClick: () => void;
  onClose: () => void;
}
function AddRoleMorph({ stage, onClick, onClose }: AddRoleMorphProps) {
  const isPill = stage === "pill";
  const isPanel = stage === "morph" || stage === "modal";
  const showForm = stage === "modal";

  // Dimensions / colors per stage (driven by motion).
  const dims =
    stage === "closed"
      ? { width: 48, height: 48, borderRadius: 12, y: 0, backgroundColor: "#add010" }
      : isPill
        ? { width: 220, height: 48, borderRadius: 24, y: 0, backgroundColor: "#add010" }
        : { width: 457, height: 560, borderRadius: 24, y: 8, backgroundColor: "#ffffff" };

  const transition = isPanel ? PREMIUM_MORPH : PREMIUM_EASE;

  const nameWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showForm) {
      requestAnimationFrame(() => {
        nameWrapRef.current?.querySelector("input")?.focus();
      });
    }
  }, [showForm]);

  const handleClick = () => {
    // Click on closed/pill triggers the morph progression (parent advances stage).
    if (stage === "closed" || stage === "pill") onClick();
  };

  return (
    <>
      {/* Backdrop fades in during pill→morph. */}
      <AnimatePresence initial={false}>
        {isPanel && (
          <motion.div
            key="backdrop"
            className="rv-morph-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={PREMIUM_EASE}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`rv-add-role-morph rv-add-role-morph--${stage}`}
        initial={false}
        animate={dims}
        transition={transition}
        role={isPanel ? "dialog" : undefined}
        aria-label={isPanel ? "Crear nuevo rol" : "Crear rol"}
        onClick={!isPanel ? handleClick : undefined}
        style={{ cursor: !isPanel ? "pointer" : "default" }}
      >
        {/* Pill / closed contents — + icon + label. Fades out before morph. */}
        <AnimatePresence initial={false}>
          {!isPanel && (
            <motion.div
              key="pill-content"
              className="rv-add-role-morph__pill"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <span className="rv-add-role-morph__icon">
                <Icon name="plus" size="md" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form content — appears after morph completes, stagger 50ms. */}
        <AnimatePresence initial={false}>
          {showForm && (
            <motion.div
              key="form"
              className="rv-add-role-morph__form"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              <NuevoRolForm onClose={onClose} nameWrapRef={nameWrapRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// ── Form inside the morphing panel (staggered fields) ───────
const FIELD_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } },
};

function NuevoRolForm({
  onClose,
  nameWrapRef,
}: {
  onClose: () => void;
  nameWrapRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [appOpen, setAppOpen] = useState(false);
  const [appValue, setAppValue] = useState<string | null>(null);
  return (
    <div className="rv-add-role-morph__inner">
      <button
        type="button"
        className="rv-role-modal__close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <Icon name="chevron-down" size="md" />
      </button>

      <motion.div className="rv-role-modal__head" variants={FIELD_VARIANTS}>
        <div className="rv-avatar" style={{ width: 44, height: 44 }}>
          <Icon name="user" size="md" />
        </div>
        <span className="rv-role-modal__title">NUEVO ROL</span>
      </motion.div>

      <div className="rv-role-modal__body">
        <motion.div variants={FIELD_VARIANTS}>
          <SelectionDropdown
            label={appValue ?? "Label"}
            isOpen={appOpen}
            onToggle={() => setAppOpen((v) => !v)}
            items={APPS.map((a) => ({
              label: a,
              onClick: () => {
                setAppValue(a);
                setAppOpen(false);
              },
            }))}
          />
        </motion.div>
        <motion.div variants={FIELD_VARIANTS} ref={nameWrapRef}>
          <FormField
            label="Nombre del rol"
            placeholder="Placeholder"
            value={name}
            state={name ? "x" : "standard"}
            onChange={(e) => setName(e.target.value)}
            onClear={() => setName("")}
          />
        </motion.div>
        <motion.div variants={FIELD_VARIANTS}>
          <FormField
            label="Área de trabajo"
            placeholder="Placeholder"
            value={area}
            state={area ? "x" : "standard"}
            onChange={(e) => setArea(e.target.value)}
            onClear={() => setArea("")}
          />
        </motion.div>
      </div>

      <motion.div className="rv-role-modal__actions" variants={FIELD_VARIANTS}>
        <Button color="white" layout="label" label="Cancelar" size="md" onClick={onClose} />
        <Button
          color="green"
          layout="icon-left"
          icon="good"
          label="Guardar"
          size="md"
          onClick={onClose}
        />
      </motion.div>
    </div>
  );
}

// ── NOT-IN-DS: RoleModal (R04/R05) ──────────────────────────

interface RoleModalProps {
  mode: "edit" | "create";
  open: boolean;
  onClose: () => void;
}
function RoleModal({ mode, open, onClose }: RoleModalProps) {
  const isCreate = mode === "create";
  const [name, setName] = useState(isCreate ? "" : EDIT_ROLE_PREFILL.name);
  const [area, setArea] = useState(isCreate ? "" : EDIT_ROLE_PREFILL.area);
  const [appOpen, setAppOpen] = useState(false);
  const [appValue, setAppValue] = useState(isCreate ? null : EDIT_ROLE_PREFILL.app);
  const title = isCreate ? "NUEVO ROL" : `${EDIT_ROLE_PREFILL.name} de ${EDIT_ROLE_PREFILL.area.toLowerCase()}`;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.aside
          key="role-modal"
          className="rv-role-modal"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={springs.expanding}
          role="dialog"
          aria-label={title}
        >
          <button
            type="button"
            className="rv-role-modal__close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <Icon name="chevron-down" size="md" />
          </button>

          <div className="rv-role-modal__head">
            <Avatar size={44} />
            <span className="rv-role-modal__title">{title}</span>
          </div>

          <div className="rv-role-modal__body">
            <SelectionDropdown
              label={appValue ?? "Label"}
              isOpen={appOpen}
              onToggle={() => setAppOpen((v) => !v)}
              items={APPS.map((a) => ({
                label: a,
                onClick: () => {
                  setAppValue(a);
                  setAppOpen(false);
                },
              }))}
            />
            <FormField
              label="Nombre del rol"
              placeholder={isCreate ? "Placeholder" : "Líder"}
              value={name}
              state={name ? "x" : "standard"}
              onChange={(e) => setName(e.target.value)}
              onClear={() => setName("")}
            />
            <FormField
              label="Área de trabajo"
              placeholder={isCreate ? "Placeholder" : "Losa"}
              value={area}
              state={area ? "x" : "standard"}
              onChange={(e) => setArea(e.target.value)}
              onClear={() => setArea("")}
            />
          </div>

          <div className="rv-role-modal__actions">
            <Button color="white" layout="label" label="Cancelar" size="md" onClick={onClose} />
            <Button
              color="green"
              layout="icon-left"
              icon="good"
              label="Guardar"
              size="md"
              onClick={onClose}
            />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ── Componente principal ────────────────────────────────────

interface RolesV2Props {
  initialCollapsed?: boolean;
  initialKebabOpen?: boolean;
  initialSearchOpen?: boolean;
  initialModal?: "edit" | "create" | null;
  initialAddPermStage?: AddPermStage;
  initialActiveRoleId?: string;
}

export function RolesV2({
  initialCollapsed = true,
  initialKebabOpen = false,
  initialSearchOpen = false,
  initialModal = null,
  initialAddPermStage = "fab",
  initialActiveRoleId = "lider-losa",
}: RolesV2Props = {}) {
  const [sidebarOpen, setSidebarOpen] = useState(!initialCollapsed);
  const [appsOpen, setAppsOpen] = useState(false);
  const [appsValue, setAppsValue] = useState<string>("Boletas");
  const [activeRoleId, setActiveRoleId] = useState(initialActiveRoleId);
  const [kebabOpen, setKebabOpen] = useState(initialKebabOpen);
  const [searchOpen, setSearchOpen] = useState(initialSearchOpen);
  const [modal, setModal] = useState<"edit" | "create" | null>(initialModal);
  const [addPermStage, setAddPermStage] = useState<AddPermStage>(initialAddPermStage);
  const [addRoleStage, setAddRoleStage] = useState<AddRoleStage>(
    initialModal === "create" ? "modal" : "closed",
  );

  const activeRoleLabel = (() => {
    for (const g of ROLE_GROUPS) {
      const it = g.items.find((i) => i.id === activeRoleId);
      if (it) return it.label;
    }
    return "Losa";
  })();
  const activeGroupTitle = (
    ROLE_GROUPS.find((g) => g.items.some((i) => i.id === activeRoleId))?.title ?? "Líder"
  );

  return (
    <div className="rv-shell">
      {/* ── Sidebar ───────────────────────────────────────── */}
      <motion.aside
        className={`rv-sidebar rv-sidebar--${sidebarOpen ? "expanded" : "collapsed"}`}
        initial={false}
        animate={{ width: sidebarOpen ? 396 : 155 }}
        transition={springs.expanding}
      >
        <div className="rv-sidebar__items">
          <TabsMenu label={sidebarOpen ? "ROLES" : ""}      layout="label+icon" icon="rol" />
          <TabsMenu label={sidebarOpen ? "USUARIOS" : ""}   layout="label+icon" icon="user" />
          <TabsMenu label={sidebarOpen ? "CUADRILLAS" : ""} layout="label+icon" icon="cuadrillas" />
        </div>

        <motion.button
          type="button"
          className="rv-sidebar__menu"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? "Colapsar menú" : "Expandir menú"}
          animate={{ rotate: sidebarOpen ? 0 : 90 }}
          transition={springs.snappy}
        >
          <Icon name="menu" size="md" />
        </motion.button>
      </motion.aside>

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="rv-main">
        <header className="rv-topbar">
          <h1 className="rv-title">ROLES</h1>
          <AddRoleMorph
            stage={addRoleStage}
            onClick={() => {
              // Premium morph: closed → pill (220ms) → morph (320ms) → modal.
              if (addRoleStage === "closed") {
                setAddRoleStage("pill");
                setTimeout(() => setAddRoleStage("morph"), 220);
                setTimeout(() => setAddRoleStage("modal"), 540);
              } else if (addRoleStage === "pill") {
                setAddRoleStage("morph");
                setTimeout(() => setAddRoleStage("modal"), 320);
              }
            }}
            onClose={() => {
              // Reverse morph.
              setAddRoleStage("morph");
              setTimeout(() => setAddRoleStage("pill"), 220);
              setTimeout(() => setAddRoleStage("closed"), 440);
            }}
          />
        </header>

        <section className="rv-content">
          {/* ── Left column ── */}
          <div className="rv-left">
            <span className="rv-subtitle">Apps</span>
            <SelectionDropdown
              label={appsValue}
              isOpen={appsOpen}
              onToggle={() => setAppsOpen((v) => !v)}
              items={APPS.map((a) => ({
                label: a,
                onClick: () => {
                  setAppsValue(a);
                  setAppsOpen(false);
                },
              }))}
            />
            <div className="rv-groups">
              {ROLE_GROUPS.map((g) => (
                <GroupCard
                  key={g.id}
                  group={g}
                  activeRoleId={activeRoleId}
                  onPickRole={setActiveRoleId}
                />
              ))}
            </div>
          </div>

          {/* ── Right detail card ── */}
          <div className={`rv-detail${searchOpen ? " rv-detail--search-open" : ""}`}>
            <div className="rv-detail__head">
              <Avatar size={64} />
              <div className="rv-detail__title-block">
                <span className="rv-detail__title">{activeGroupTitle}</span>
                <div className="rv-detail__selectors">
                  <SmallPill label={activeRoleLabel} tone="active" />
                  <SmallPill label={appsValue} tone="standard" />
                </div>
              </div>
              <button
                type="button"
                className="rv-detail__kebab"
                aria-label="Opciones"
                onClick={() => setKebabOpen(true)}
              >
                <Icon name="options" size="md" />
              </button>
              <KebabPopover
                open={kebabOpen}
                onClose={() => setKebabOpen(false)}
                onAction={() => setKebabOpen(false)}
              />
            </div>

            {/* Search container — animates between top-right corner (icon)
                and full-width row above the body (label pill). */}
            <motion.div
              className="rv-detail__search"
              initial={false}
              animate={
                searchOpen
                  ? { top: 120, left: 31, right: 31, width: "auto", height: "auto" }
                  : { top: 99, left: "auto", right: 29, width: 65, height: 65 }
              }
              transition={springs.expanding}
            >
              <SearchToggle
                open={searchOpen}
                onToggle={() => setSearchOpen(true)}
                onClose={() => setSearchOpen(false)}
              />
            </motion.div>

            {/* Body — pushed down by ~90px when search is expanded. */}
            <motion.div
              className="rv-detail__body"
              initial={false}
              animate={{ top: searchOpen ? 210 : 120 }}
              transition={springs.expanding}
            >
              {PERMISSION_SECTIONS.map((s) => (
                <PermissionSectionView key={s.id} section={s} />
              ))}
            </motion.div>

            <div className="rv-detail__fab">
              <AddPermFab
                stage={addPermStage}
                onFabClick={() => setAddPermStage("pill")}
                onPillClick={() => {
                  // Premium morph: pill → morph (220ms) → popover.
                  setAddPermStage("morph");
                  setTimeout(() => setAddPermStage("popover"), 320);
                }}
                onClose={() => {
                  setAddPermStage("morph");
                  setTimeout(() => setAddPermStage("fab"), 220);
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Role modal — solo edit (R04). Create morpha del + via AddRoleMorph. */}
        <RoleModal
          mode="edit"
          open={modal === "edit"}
          onClose={() => setModal(null)}
        />
      </main>
    </div>
  );
}
