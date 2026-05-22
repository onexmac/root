import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
  type Variants,
} from "motion/react";
import { Button } from "../../Button/Button";
import { FormField, Tag } from "../../Form/Form";
import { Icon } from "../../Icon/Icon";
import { SelectionDropdown } from "../../SelectionDropdown/SelectionDropdown";
import { SlideArm } from "../../SlideArm/SlideArm";
import { ToggleCards } from "../../ToggleCards/ToggleCards";
import { springs } from "../../springs";
import { haptic } from "../../haptic";
import "./LosaFlotante.css";

/* ============================================================
 * H4 — Losa Flotante (mobile prototype, M1 + M2)
 *
 * M1: mobile feed of UserCards (collapsed ↔ expanded with grid-template-rows
 *     expand + AnimatePresence crossfade between short-name and Activo pill).
 * M2: FAB → bottom-sheet morph for "NUEVO USUARIO". Two-phase morph
 *     (width then height), drag-to-dismiss, scroll-to-fullscreen with
 *     hysteresis (12/2), three-state machine (closed/open/fullScreen),
 *     floating SlideButton footer.
 *
 * DS components consumed: Button, Tag, FormField, SelectionDropdown,
 * SlideButton, ToggleCards, Icon.
 *
 * Stubs flagged with `NOT-IN-DS:` are promotion candidates. See
 * losa-flotante/components/losa/DS-GAPS.md in the standalone prototype.
 * ============================================================ */

// ── Spring add-ons (losa-only, not yet in ../springs) ────────
// shrinking: closes the sheet. popping: bouncy pop-in for the Activo pill.
const SHRINKING = { type: "spring", stiffness: 224, damping: 29, mass: 1 } as const;
const POPPING = { type: "spring", stiffness: 385, damping: 22, mass: 1 } as const;

// ── Seed data ────────────────────────────────────────────────

interface User {
  id: string;
  shortName: string;
  fullName: string;
  area: string;
  status: "active" | "inactive";
  assignments: Array<{ id: string; rol: string; obra: string }>;
}

const MOCK_USERS: User[] = [
  {
    id: "u-001",
    shortName: "Juan… Perez…",
    fullName: "Juan Alberto Perez Medina",
    area: "Producción",
    status: "active",
    assignments: [
      { id: "a-001", rol: "Ingeniero", obra: "Viviendas" },
      { id: "a-002", rol: "Visor", obra: "Infraestructura" },
    ],
  },
  {
    id: "u-002",
    shortName: "María… López…",
    fullName: "María Camila López Restrepo",
    area: "Calidad",
    status: "active",
    assignments: [{ id: "a-003", rol: "Supervisora", obra: "Comercial Plaza" }],
  },
  {
    id: "u-003",
    shortName: "Carlos… Ríos…",
    fullName: "Carlos Andrés Ríos Vargas",
    area: "Operaciones",
    status: "active",
    assignments: [
      { id: "a-004", rol: "Maestro", obra: "Edificio Norte" },
      { id: "a-005", rol: "Encargado", obra: "Torre Sur" },
    ],
  },
  {
    id: "u-004",
    shortName: "Ana… Suárez…",
    fullName: "Ana Sofía Suárez Quintero",
    area: "Administración",
    status: "active",
    assignments: [{ id: "a-006", rol: "Asistente", obra: "Oficina central" }],
  },
];

const AREA_OPTIONS = ["Producción", "Calidad", "Operaciones", "Administración", "Comercial"];
const SALARIO_OPTIONS = ["Banda A", "Banda B", "Banda C", "Banda D"];
const FECHA_OPTIONS = ["01/06/26", "15/06/26", "01/07/26"];

// ── Main screen ──────────────────────────────────────────────

export function LosaFlotante() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(MOCK_USERS[0]?.id ?? null);

  return (
    <div className="lf" data-prototype>
      <div className="lf__list">
        {MOCK_USERS.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            expanded={expandedId === u.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === u.id ? null : u.id))
            }
          />
        ))}
      </div>

      <BottomActionBar />

      <NuevoUsuarioSheet
        open={sheetOpen}
        onOpen={() => setSheetOpen(true)}
        onDismiss={() => setSheetOpen(false)}
        onConfirm={() => {
          haptic.complete();
          setSheetOpen(false);
        }}
      />
    </div>
  );
}

// ── UserCard ─────────────────────────────────────────────────
//
// NOT-IN-DS: mobile collapsed↔expanded UserCard. DS only ships the desktop
// `cu-table__row`. Promote this pattern when more mobile flows need it.

function UserCard({
  user, expanded, onToggle,
}: {
  user: User;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      layout
      transition={springs.expanding}
      aria-expanded={expanded}
      className="lf-card"
    >
      <div className="lf-card__head">
        <div className="lf-card__head-main">
          <AnimatePresence initial={false} mode="popLayout">
            {expanded ? (
              <motion.div
                key="activo"
                initial={{ opacity: 0, scale: 0.85, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 8 }}
                transition={POPPING}
                className="lf-card__activo"
              >
                {/* NOT-IN-DS: Tag with trailing icon (Activo ✓).
                    DS Tag is label-only — we layer an Icon next to it. */}
                <Tag label="Activo" state="active" />
                <span aria-hidden className="lf-card__activo-check">
                  <Icon name="check" size="sm" color="currentColor" />
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="name"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={springs.expanding}
                className="lf-card__name-row"
              >
                <span className="lf-card__short-name">{user.shortName}</span>
                <span
                  className="lf-card__check-circle"
                  aria-label="Activo"
                  title="Activo"
                >
                  <Icon name="check" size="sm" color="currentColor" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ToggleCards
          size="small"
          visibility={expanded ? "close" : "open"}
          onClick={onToggle}
          ariaLabel={expanded ? "Contraer tarjeta" : "Expandir tarjeta"}
        />
      </div>

      <div
        className="lf-card__grid"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="lf-card__grid-inner">
          <motion.div
            initial={false}
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{
              duration: expanded ? 0.32 : 0.18,
              ease: "easeOut",
              delay: expanded ? 0.12 : 0,
            }}
            className="lf-card__body"
          >
            <h3 className="lf-card__full-name">{user.fullName}</h3>

            <motion.dl
              variants={{
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
                hide: {},
              }}
              animate={expanded ? "show" : "hide"}
              initial={false}
              className="lf-card__rows"
            >
              <SimpleRow label="Area" value={user.area} />
              {user.assignments.map((a) => (
                <React.Fragment key={a.id}>
                  <PairedRow label="Rol" value={a.rol} top />
                  <PairedRow label="Obras" value={a.obra} />
                </React.Fragment>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

function SimpleRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={{ show: { opacity: 1, y: 0 }, hide: { opacity: 0, y: 6 } }}
      transition={springs.expanding}
      className="lf-card__row"
    >
      <dt className="lf-card__row-label">{label}</dt>
      <dd className="lf-card__row-value"><Tag label={value} state="standard" /></dd>
    </motion.div>
  );
}

/* NOT-IN-DS: paired Rol → Obras row with vertical hairline connector.
   Bespoke layout primitive. */
function PairedRow({
  label, value, top,
}: {
  label: string;
  value: string;
  top?: boolean;
}) {
  return (
    <motion.div
      variants={{ show: { opacity: 1, y: 0 }, hide: { opacity: 0, y: 6 } }}
      transition={springs.expanding}
      className="lf-card__row"
    >
      <dt className="lf-card__row-label lf-card__row-label--paired">
        {label}
        {top ? <span aria-hidden className="lf-card__hairline" /> : null}
      </dt>
      <dd className="lf-card__row-value"><Tag label={value} state="standard" /></dd>
    </motion.div>
  );
}

// ── BottomActionBar ──────────────────────────────────────────
//
// NOT-IN-DS: mobile bottom action bar (burger + FAB pair). DS ships
// `Nav.tsx` for desktop sidebar only.

function BottomActionBar() {
  return (
    <div className="lf-bar">
      <Button
        color="black"
        layout="icon"
        icon="list"
        size="md"
        ariaLabel="Abrir menú"
      />
      <span aria-hidden className="lf-bar__spacer" />
    </div>
  );
}

// ── NuevoUsuarioSheet (M2) ───────────────────────────────────
//
// NOT-IN-DS: FAB → bottom-sheet morph surface. DS only ships desktop
// `Drawer` (CSS slide-in aside). Promote if more mobile flows need it.

type SheetTab = "personal" | "rol";

const SHEET_VARIANTS: Variants = {
  closed: {
    width: 84,
    height: 80,
    right: 24,
    bottom: 24,
    backgroundColor: "var(--ds-color-green-100)",
    borderRadius: 24,
    transition: {
      width: { delay: 0.18, ...SHRINKING },
      right: { delay: 0.18, ...SHRINKING },
      height: SHRINKING,
      bottom: SHRINKING,
      borderRadius: SHRINKING,
      backgroundColor: { duration: 0.28 },
    },
  },
  open: {
    width: "100%",
    height: "82vh",
    right: 0,
    bottom: 0,
    backgroundColor: "var(--ds-color-white)",
    borderRadius: 32,
    transition: {
      width: springs.expanding,
      right: springs.expanding,
      height: { delay: 0.18, ...springs.expanding },
      bottom: { delay: 0.18, ...springs.expanding },
      borderRadius: { delay: 0.28, ...springs.expanding },
      backgroundColor: { duration: 0.28, delay: 0.1 },
    },
  },
  fullScreen: {
    width: "100%",
    height: "100vh",
    right: 0,
    bottom: 0,
    backgroundColor: "var(--ds-color-white)",
    borderRadius: 0,
    transition: springs.expanding,
  },
};

const CASCADE_CONTAINER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.38 } },
};

const CASCADE_ITEM: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: springs.expanding },
};

function NuevoUsuarioSheet({
  open, onOpen, onDismiss, onConfirm,
}: {
  open: boolean;
  onOpen: () => void;
  onDismiss: () => void;
  onConfirm: () => void;
}) {
  const [fullScreen, setFullScreen] = useState(false);
  const [tab, setTab] = useState<SheetTab>("rol");
  const [form, setForm] = useState({
    nombre: "", apellido: "", dni: "", telefono: "", email: "",
    area: "", salario: "", puesto: "", fecha: "",
  });
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setFullScreen(false);
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el || !open) return;
    const onScroll = () => {
      const top = el.scrollTop;
      setFullScreen((prev) => {
        if (!prev && top > 12) return true;
        if (prev && top <= 2) return false;
        return prev;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open]);

  const animateTo = !open ? "closed" : fullScreen ? "fullScreen" : "open";

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!open) return;
    if (info.offset.y > 120 || info.velocity.y > 600) onDismiss();
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            key="scrim"
            type="button"
            aria-label="Cerrar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onDismiss}
            className="lf-scrim"
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        key="sheet"
        className="lf-sheet losa-stack"
        style={{
          maxWidth: open ? 402 : undefined,
          left: open ? "50%" : "auto",
          x: open ? "-50%" : 0,
          touchAction: open ? "auto" : "manipulation",
        }}
        initial="closed"
        animate={animateTo}
        variants={SHEET_VARIANTS}
        drag={open ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragStart={() => haptic.drag()}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.28 } }}
              exit={{ opacity: 0 }}
              className="lf-sheet__content"
            >
              {/* NOT-IN-DS: drag-handle / dismiss chevron at top of sheet. */}
              <div className="lf-sheet__handle">
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={onDismiss}
                  className="lf-sheet__handle-btn"
                >
                  <Icon name="close" size="md" color="var(--ds-color-gray-500)" />
                </button>
              </div>

              <motion.div
                ref={bodyRef}
                className="lf-sheet__body"
                variants={CASCADE_CONTAINER}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <motion.div variants={CASCADE_ITEM} className="lf-sheet__title-row">
                  <span className="lf-sheet__avatar">
                    <Icon name="user" size="lg" color="currentColor" />
                  </span>
                  <h2 className="lf-sheet__title">Nuevo usuario</h2>
                </motion.div>

                {/* NOT-IN-DS: two-tab segmented toggle (outlined↔filled).
                    Composed from two DS Buttons since DS has no such variant. */}
                <motion.div variants={CASCADE_ITEM} className="lf-sheet__tabs">
                  <Button
                    label="Personal"
                    color={tab === "personal" ? "black" : "white"}
                    size="sm"
                    onClick={() => setTab("personal")}
                  />
                  <Button
                    label="Rol y asignación"
                    color={tab === "rol" ? "black" : "white"}
                    size="sm"
                    onClick={() => setTab("rol")}
                  />
                </motion.div>

                <motion.div variants={CASCADE_ITEM} className="lf-sheet__divider">
                  <span className="lf-sheet__divider-line" />
                  <span className="lf-sheet__divider-label">
                    {tab === "personal" ? "Identidad" : "Asignación"}
                  </span>
                  <span className="lf-sheet__divider-line" />
                </motion.div>

                <AnimatePresence mode="wait" initial={false}>
                  {tab === "rol" ? (
                    <motion.div
                      key="rol"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={springs.expanding}
                      className="lf-sheet__pane"
                    >
                      <DropdownField
                        label="Área de trabajo"
                        value={form.area}
                        options={AREA_OPTIONS}
                        onSelect={(v) => setForm({ ...form, area: v })}
                      />
                      <DropdownField
                        label="Salario"
                        value={form.salario}
                        options={SALARIO_OPTIONS}
                        onSelect={(v) => setForm({ ...form, salario: v })}
                      />
                      <FormField
                        label="Puesto de trabajo"
                        placeholder="Placeholder"
                        value={form.puesto}
                        onChange={(e) => setForm({ ...form, puesto: e.target.value })}
                      />
                      <DropdownField
                        label="Fecha de ingreso"
                        value={form.fecha}
                        options={FECHA_OPTIONS}
                        onSelect={(v) => setForm({ ...form, fecha: v })}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="personal"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={springs.expanding}
                      className="lf-sheet__pane"
                    >
                      <FormField
                        label="Nombre"
                        placeholder="Placeholder"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      />
                      <FormField
                        label="Apellido"
                        placeholder="Placeholder"
                        value={form.apellido}
                        onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                      />
                      <FormField
                        label="DNI"
                        placeholder="Placeholder"
                        value={form.dni}
                        onChange={(e) => setForm({ ...form, dni: e.target.value })}
                      />
                      <FormField
                        label="Teléfono"
                        placeholder="Placeholder"
                        type="tel"
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      />
                      <FormField
                        label="Correo electrónico"
                        placeholder="Placeholder"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Floating footer — SlideArm stays put while form scrolls.
                  Collapsed: green "Crear usuario" pill at the trailing edge.
                  Tap → grows into a full-width SlideToConfirm with a cancel
                  X above. */}
              <div className="lf-sheet__footer">
                <SlideArm
                  label="Crear usuario"
                  collapsedWidth={200}
                  onConfirm={onConfirm}
                />
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="fab"
              type="button"
              aria-label="Crear usuario"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.24 } }}
              exit={{ opacity: 0 }}
              onPointerDown={() => haptic.select()}
              onClick={onOpen}
              className="lf-sheet__fab"
            >
              <Icon name="plus" size="lg" color="currentColor" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// ── DropdownField (DS SelectionDropdown + external label) ────

function DropdownField({
  label, value, options, onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div className="lf-dropdown-field">
      <span className="lf-dropdown-field__label">{label}</span>
      <SelectionDropdown
        label={value || "Label"}
        items={options.map((opt) => ({ label: opt, onClick: () => onSelect(opt) }))}
      />
    </div>
  );
}
