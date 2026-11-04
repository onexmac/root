"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate as animateValue,
  motion,
  useMotionValue,
} from "motion/react";
import { CaretLineDown, Plus, UserPlus } from "@phosphor-icons/react";
import { FormField } from "@/components/ds/form-field";
import { SelectionDropdown } from "@/components/ds/selection-dropdown";
import { Tag } from "@/components/ds/tag";
import { SolicitarSlider } from "@/components/pedido/solicitar-slider";
import { SavingVeil } from "@/components/pedido/saving-veil";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { useShake } from "@/lib/use-shake";
import { cn } from "@/lib/cn";
import {
  areasDeTrabajo,
  puestosDeTrabajo,
  roles,
  type UserRole,
} from "@/lib/mock-users";

/**
 * NuevoUsuarioSheet (mobile) — the bottom-first counterpart of the desktop
 * Nuevo Pedido side panel. Same architecture, rotated for the thumb:
 *
 *   collapsed  a green FAB in the bottom-right
 *   open       a bottom sheet — handle / pinned header+tabs / scrolling body /
 *              pinned footer with the slide-to-confirm
 *
 * Everything here follows MOTION_GOTCHAS.md; the load-bearing bits:
 *   · two-phase morph — width grows first, height follows +180 ms, corners
 *     stay rounded until the surface has finished growing (§2 of the sheet spec)
 *   · animate targets carry LITERAL colors and a PIXEL height (#1, #2)
 *   · NO motion `drag` prop — the handle hand-rolls the gesture into a `y`
 *     transform, which never fights the layout animation (#3)
 *   · a blocked Solicitar shakes the slider AND the group that's missing (#11)
 *   · closing rewinds the form, so it always reopens empty
 */

// FAB (collapsed) — matches BottomActionBar's burger metrics.
const FAB_W = 84;
const FAB_H = 80;
const FAB_INSET = 24;
const FAB_RADIUS = 24;
const SHEET_RADIUS = 32;
const SHEET_MAX_W = 402;

// Literals: motion cannot interpolate var() colors (#1).
const GREEN = "#ADD010";
const WHITE = "#ffffff";

// Drag-to-dismiss (SHEET_MORPH.md §6–§7).
const RUBBER_KNEE = 240;
const STEP_OFFSET = 100;
const STEP_PREDICTED = 250;

// Two-phase morph timing.
const PHASE_DELAY = 0.18;
const CORNER_DELAY = 0.26;
const CASCADE_STEP = 0.07;

type Step = "personal" | "rol";

export function NuevoUsuarioSheet({
  open,
  onOpen,
  onDismiss,
  onCreated,
}: {
  open: boolean;
  onOpen: () => void;
  onDismiss: () => void;
  onCreated: () => void;
}) {
  const [step, setStep] = useState<Step>("personal");
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [area, setArea] = useState<string | null>(null);
  const [puesto, setPuesto] = useState<string | null>(null);
  const [rol, setRol] = useState<UserRole | null>(null);
  const [saving, setSaving] = useState(false);

  // Viewport height in PX — motion can't animate height across unit types (#2).
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const sheetH = vh > 0 ? Math.max(vh - 180, 320) : 560;

  // What's still missing, and the shake that points at it.
  const personalDone = nombre.trim() !== "" && cedula.trim() !== "";
  const rolDone = rol !== null;
  const armed = personalDone && rolDone && !saving;
  const [shakeSignal, setShakeSignal] = useState(0);
  const shakePersonal = useShake(shakeSignal, !personalDone);
  const shakeRol = useShake(shakeSignal, personalDone && !rolDone);

  const refuse = () => {
    // Jump to the tab that actually needs work, then shake it there.
    setStep(personalDone ? "rol" : "personal");
    setShakeSignal((n) => n + 1);
  };

  const reset = () => {
    setStep("personal");
    setNombre("");
    setCedula("");
    setTelefono("");
    setArea(null);
    setPuesto(null);
    setRol(null);
    setSaving(false);
  };

  const close = () => {
    onDismiss();
    reset();
  };

  // ── Drag-to-dismiss, hand-rolled ─────────────────────────────────────
  // Capture on the handle is safe: unlike the draggable rows, this node never
  // re-parents mid-gesture (#7).
  const dragY = useMotionValue(0);
  const drag = useRef<{
    startY: number;
    lastY: number;
    lastT: number;
    vy: number;
    moved: boolean;
  } | null>(null);

  const onHandleDown = (e: React.PointerEvent) => {
    if (!open || saving) return;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    drag.current = {
      startY: e.clientY,
      lastY: e.clientY,
      lastT: e.timeStamp,
      vy: 0,
      moved: false,
    };
    haptic.drag();
  };

  const onHandleMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const raw = Math.max(0, e.clientY - d.startY);
    // 1:1 to the knee, then 35 % of any further pull.
    dragY.set(raw < RUBBER_KNEE ? raw : RUBBER_KNEE + (raw - RUBBER_KNEE) * 0.35);
    if (Math.abs(e.clientY - d.startY) > 8) d.moved = true;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.vy = (e.clientY - d.lastY) / dt;
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
  };

  const onHandleUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      // A still press on the handle is a tap → dismiss.
      animateValue(dragY, 0, springs.snappy);
      close();
      return;
    }
    const translation = dragY.get();
    // Predicted endpoint: a quick flick closes like a long slow pull.
    const predicted = translation + d.vy * 100;
    if (translation > STEP_OFFSET || predicted > STEP_PREDICTED) {
      haptic.select();
      animateValue(dragY, 0, springs.settling);
      close();
    } else {
      animateValue(dragY, 0, springs.snappy);
    }
  };

  // Reset the drag offset whenever the sheet closes by any other route.
  useEffect(() => {
    if (!open) dragY.set(0);
  }, [open, dragY]);

  const surfaceTarget = open
    ? {
        width: "100%",
        height: sheetH,
        right: 0,
        bottom: 0,
        backgroundColor: WHITE,
        borderRadius: SHEET_RADIUS,
      }
    : {
        width: FAB_W,
        height: FAB_H,
        right: FAB_INSET,
        bottom: FAB_INSET,
        backgroundColor: GREEN,
        borderRadius: FAB_RADIUS,
      };

  // Two-phase: width first, height +180 ms, corners last so they stay rounded
  // through the whole grow instead of snapping flat early.
  const surfaceTransition = open
    ? {
        width: springs.morphing,
        right: springs.morphing,
        height: { ...springs.morphing, delay: PHASE_DELAY },
        bottom: { ...springs.morphing, delay: PHASE_DELAY },
        backgroundColor: { duration: 0.22, delay: 0.1 },
        borderRadius: { ...springs.morphing, delay: CORNER_DELAY },
      }
    : {
        height: springs.shrinking,
        bottom: springs.shrinking,
        width: { ...springs.shrinking, delay: 0.12 },
        right: { ...springs.shrinking, delay: 0.12 },
        backgroundColor: { duration: 0.22 },
        borderRadius: springs.shrinking,
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
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={close}
            className="fixed inset-0 z-40 cursor-default border-0 bg-black p-0"
          />
        ) : null}
      </AnimatePresence>

      {/* Centered mobile column. The surface is ABSOLUTE inside it, so
          `right: 24` means 24 px from the column edge — the collapsed FAB stays
          in the phone frame instead of flying to the desktop viewport edge. */}
      <div className="pointer-events-none fixed inset-0 z-50 mx-auto max-w-[402px]">
      <motion.div
        initial={false}
        animate={surfaceTarget}
        transition={surfaceTransition}
        onClick={() => {
          if (!open) {
            haptic.select();
            onOpen();
          }
        }}
        role={open ? "dialog" : "button"}
        aria-label={open ? "Nuevo usuario" : "Crear usuario"}
        style={{
          position: "absolute",
          overflow: "hidden",
          y: dragY, // hand-rolled drag offset — a transform, never layout (#3)
          boxShadow: "0 2px 4px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.16)",
          cursor: open ? "default" : "pointer",
        }}
        className="pointer-events-auto flex flex-col"
      >
        {/* Collapsed face: the + glyph. Stacked opacity, not AnimatePresence,
            so nothing can strand a node mid-exit (#5). */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
          transition={{ duration: open ? 0.1 : 0.15, delay: open ? 0 : 0.28 }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-black"
        >
          <Plus size={28} weight="bold" />
        </motion.span>

        {/* Open face — flex column: handle / header+tabs pinned / body scrolls /
            footer pinned. The body is the ONLY scroll surface. */}
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, delay: open ? 0.24 : 0 }}
          className={cn(
            "flex h-full flex-col",
            open ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          {/* Drag handle — hold and pull down to dismiss, tap to dismiss. */}
          <div
            onPointerDown={onHandleDown}
            onPointerMove={onHandleMove}
            onPointerUp={onHandleUp}
            onPointerCancel={onHandleUp}
            role="button"
            aria-label="Cerrar"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                close();
              }
            }}
            style={{ touchAction: "none", cursor: "grab" }}
            className="flex shrink-0 items-center justify-center pb-1 pt-3"
          >
            <span className="flex h-7 w-14 items-center justify-center rounded-[8px] text-gray-300">
              <CaretLineDown size={20} weight="bold" />
            </span>
          </div>

          {/* Header — pinned. */}
          <div className="relative flex shrink-0 items-center gap-3 px-6 pb-4">
            <SavingVeil active={saving} delay={0} radius={16} />
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <UserPlus size={22} weight="regular" />
            </span>
            <h2 className="text-[20px] font-semibold tracking-[0.2px]">
              Nuevo usuario
            </h2>
          </div>

          {/* Tabs — pinned. Sliding pill via layoutId. */}
          <div className="shrink-0 px-6 pb-5">
            <div className="relative grid grid-cols-2 rounded-[24px] bg-white p-1 ring-1 ring-gray-200">
              <SavingVeil active={saving} delay={CASCADE_STEP} radius={24} />
              {(
                [
                  { key: "personal", label: "Personal", done: personalDone },
                  { key: "rol", label: "Rol", done: rolDone },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    haptic.select();
                    setStep(t.key);
                  }}
                  className="relative h-11 rounded-[20px] text-[14px] font-medium"
                >
                  {step === t.key ? (
                    <motion.span
                      layoutId="movil-tab-pill"
                      transition={springs.morphing}
                      className="absolute inset-0 rounded-[20px] bg-black"
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-10 inline-flex items-center gap-2 transition-colors duration-150",
                      step === t.key
                        ? "font-semibold text-white"
                        : "text-black",
                    )}
                  >
                    {t.label}
                    {/* Completion dot — tells you which tab still owes data. */}
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        t.done
                          ? "bg-green-100"
                          : step === t.key
                            ? "bg-white/40"
                            : "bg-gray-200",
                      )}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Body — flex-1 + min-h-0 so it fills the surface and scrolls
              INSIDE it; without min-h-0 a flex child refuses to shrink and the
              content gets clipped by the surface's overflow:hidden. */}
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-2">
            <AnimatePresence mode="wait" initial={false}>
              {step === "personal" ? (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={springs.expanding}
                >
                  <motion.div
                    animate={shakePersonal}
                    className="relative flex flex-col gap-4"
                  >
                    <SavingVeil active={saving} delay={CASCADE_STEP * 2} radius={16} />
                    <FormField
                      label="Nombre completo"
                      value={nombre}
                      placeholder="Juan Pérez"
                      onChange={setNombre}
                    />
                    <FormField
                      label="Cédula"
                      value={cedula}
                      placeholder="1-0234-5678"
                      onChange={setCedula}
                    />
                    <FormField
                      label="Teléfono"
                      value={telefono}
                      placeholder="8812-3232"
                      onChange={setTelefono}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="rol"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={springs.expanding}
                >
                  <motion.div
                    animate={shakeRol}
                    className="relative flex flex-col gap-4"
                  >
                    <SavingVeil active={saving} delay={CASCADE_STEP * 2} radius={16} />
                    <SelectionDropdown
                      label="Área de trabajo"
                      value={area}
                      options={areasDeTrabajo}
                      onChange={setArea}
                    />
                    <SelectionDropdown
                      label="Puesto"
                      value={puesto}
                      options={puestosDeTrabajo}
                      onChange={setPuesto}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-[14px] font-medium text-gray-500">
                        Rol
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {roles.map((r) => (
                          <Tag
                            key={r}
                            variant={rol === r ? "rolePicked" : "roleIdle"}
                            onClick={() => {
                              haptic.select();
                              setRol(rol === r ? null : r);
                            }}
                          >
                            {r}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer — pinned. Bottom-first: the commit gesture sits in the
              thumb zone, and the slider only arms once the form is complete. */}
          <div
            className="shrink-0 px-6 pt-3"
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
            }}
          >
            <div className="mb-4 h-px bg-gray-200" />
            <SolicitarSlider
              label="Crear usuario"
              armed={armed}
              expandedWidth={330}
              successHoldMs={1200}
              onBlocked={refuse}
              onCommitStart={() => setSaving(true)}
              onConfirm={() => {
                onCreated();
                close();
              }}
            />
          </div>
        </motion.div>
      </motion.div>
      </div>
    </>
  );
}
