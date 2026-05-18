"use client";

/**
 * DesktopMorphSurface — green "+" FAB at top-right that morphs into a
 * 670px-wide side panel on the right edge of the viewport.
 *
 * Mirrors the polish of PedirBar but expands horizontally + vertically:
 *   Phase 1 (0-180ms):  width grows leftward (FAB → wide pill)
 *   Phase 2 (180-480ms): height grows downward (wide pill → full panel)
 *   Corner radius:      stays rounded until size is fully settled, then snaps
 *
 * Single motion.div using variants. Plus icon + sheet content live inside,
 * each fading in/out at the right moment in the timeline.
 */

import { useReducer, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { CaretLeft, CheckCircle, UserPlus, X } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/utils";
import { PressableButton, halo } from "@/components/ui/pressable-button";
import {
  areasDeTrabajo,
  fechasIngreso,
  puestosDeTrabajo,
  rolesDisponibles,
  salarios,
} from "./mock-data";

const LOSA_GREEN = "#ADD010";
const morph = springs.expanding;
const PHASE_DELAY = 0.18;
const COLOR_DELAY = 0.22;
const SHARP_CORNERS_DELAY = 0.28;
const CASCADE_START = 0.38;
const STAGGER = 0.06;

const surfaceVariants: Variants = {
  closed: {
    width: 80,
    height: 80,
    right: 32,
    top: 32,
    backgroundColor: LOSA_GREEN,
    borderRadius: 24,
    transition: {
      borderRadius: { ...morph },
      backgroundColor: { duration: 0.2 },
      height: { ...morph },
      top: { ...morph },
      width: { delay: PHASE_DELAY, ...morph },
      right: { delay: PHASE_DELAY, ...morph },
    },
  },
  open: {
    width: 670,
    height: "100vh",
    right: 0,
    top: 0,
    backgroundColor: "var(--color-card)",
    borderRadius: 0,
    transition: {
      width: { ...morph },
      right: { ...morph },
      height: { delay: PHASE_DELAY, ...morph },
      top: { delay: PHASE_DELAY, ...morph },
      backgroundColor: { delay: COLOR_DELAY, duration: 0.22 },
      borderRadius: { delay: SHARP_CORNERS_DELAY, duration: 0.18 },
    },
  },
};

const plusVariants: Variants = {
  closed: { opacity: 1, scale: 1, transition: { delay: 0.32, duration: 0.15 } },
  open: { opacity: 0, scale: 0.6, transition: { duration: 0.1 } },
};

const contentContainerVariants: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { delayChildren: CASCADE_START, staggerChildren: STAGGER } },
};

const cascadeItem: Variants = {
  closed: { opacity: 0, y: 10, transition: { duration: 0.15 } },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
};

type Step = "personal" | "role";

type FormState = {
  nombre: string;
  cedula: string;
  telefono: string;
  email: string;
  area: string | null;
  puesto: string | null;
  salario: string | null;
  fecha: string | null;
  rol: string | null;
};

const initial: FormState = {
  nombre: "",
  cedula: "",
  telefono: "",
  email: "",
  area: null,
  puesto: null,
  salario: null,
  fecha: null,
  rol: null,
};

function reducer(
  state: FormState,
  action: { key: keyof FormState; value: string | null } | { reset: true },
): FormState {
  if ("reset" in action) return initial;
  return { ...state, [action.key]: action.value };
}

export function DesktopMorphSurface() {
  const [open, setOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [step, setStep] = useState<Step>("role");
  const [form, dispatch] = useReducer(reducer, initial);

  const close = () => {
    setOpen(false);
    setIsPressed(false);
    setStep("role");
    dispatch({ reset: true });
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
            aria-label="Cerrar"
            className="fixed inset-0 z-20 cursor-default bg-black"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={surfaceVariants}
        onPointerDown={() => {
          if (!open) setIsPressed(true);
        }}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onPointerCancel={() => setIsPressed(false)}
        onClick={() => {
          if (!open) {
            haptic.select();
            // Wait 100ms so the halo registers visually before the morph kicks off
            window.setTimeout(() => setOpen(true), 100);
          }
        }}
        role={open ? "dialog" : "button"}
        aria-label={open ? "Nuevo usuario" : "Crear nuevo usuario"}
        className={cn(
          "fixed z-30 shadow-[0_4px_18px_rgba(0,0,0,0.16)]",
          open ? "cursor-default overflow-hidden" : "cursor-pointer",
        )}
      >
        {/* Halo — only visible while closed and pressed. Sits OUTSIDE the
            surface so it doesn't get clipped by overflow-hidden during morph. */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: !open && isPressed ? 1 : 0 }}
          transition={
            isPressed
              ? { duration: 0.08, ease: "easeOut" }
              : { duration: 0.18, delay: 0.12, ease: "easeOut" }
          }
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: 36,
            border: `8px solid ${halo.green}`,
            pointerEvents: "none",
          }}
        />

        {/* Plus icon */}
        <motion.span
          variants={plusVariants}
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-black"
        >
          <span className="text-3xl font-bold leading-none">+</span>
        </motion.span>

        {/* Sheet content — cascades after surface settles */}
        <motion.div
          variants={contentContainerVariants}
          className="absolute inset-0 flex flex-col"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          {/* Header */}
          <motion.div
            variants={cascadeItem}
            className="flex items-center justify-between px-8 pt-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground">
                <UserPlus size={22} weight="regular" />
              </div>
              <h2 className="text-[20px] font-semibold tracking-[0.4px]">
                NUEVO USUARIO
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10"
            >
              <X size={20} weight="bold" />
            </button>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={cascadeItem} className="grid grid-cols-2 gap-3 px-8 pt-6">
            <TabPill
              label="Personal"
              active={step === "personal"}
              onClick={() => setStep("personal")}
            />
            <TabPill
              label="Rol y asignación"
              active={step === "role"}
              onClick={() => setStep("role")}
            />
          </motion.div>

          {/* Body */}
          <motion.div
            variants={cascadeItem}
            className="flex-1 overflow-y-auto px-8 py-6"
          >
            <AnimatePresence mode="wait">
              <motion.section
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={springs.expanding}
                className="flex flex-col gap-6"
              >
                {step === "personal" ? (
                  <>
                    <SectionTitle>DATOS PERSONALES</SectionTitle>
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Nombre completo"
                        value={form.nombre}
                        placeholder="Juan Pérez"
                        onChange={(v) => dispatch({ key: "nombre", value: v })}
                      />
                      <TextField
                        label="Cédula"
                        value={form.cedula}
                        placeholder="1-0234-5678"
                        onChange={(v) => dispatch({ key: "cedula", value: v })}
                      />
                    </div>
                    <SectionTitle>CONTACTO</SectionTitle>
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Teléfono"
                        value={form.telefono}
                        placeholder="8812-3232"
                        onChange={(v) => dispatch({ key: "telefono", value: v })}
                      />
                      <TextField
                        label="Email"
                        value={form.email}
                        placeholder="juan@ejemplo.com"
                        onChange={(v) => dispatch({ key: "email", value: v })}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <SectionTitle>ASIGNACIÓN</SectionTitle>
                    <div className="grid grid-cols-2 gap-4">
                      <DropdownField label="Área de trabajo" value={form.area} options={areasDeTrabajo} />
                      <DropdownField label="Puesto de trabajo" value={form.puesto} options={puestosDeTrabajo} />
                      <DropdownField label="Salario" value={form.salario} options={salarios} />
                      <DropdownField label="Fecha de ingreso" value={form.fecha} options={fechasIngreso} />
                    </div>

                    <SectionTitle>ROL</SectionTitle>
                    <div className="rounded-card bg-foreground/5 p-5">
                      <div className="flex flex-wrap gap-3">
                        {rolesDisponibles.map((r) => {
                          const active = form.rol === r;
                          return (
                            <PressableButton
                              key={r}
                              cornerRadius={20}
                              haloColor={halo.black}
                              onClick={() =>
                                dispatch({
                                  key: "rol",
                                  value: active ? null : r,
                                })
                              }
                              style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: active ? "black" : "transparent",
                              }}
                              className={cn(
                                "text-[14px] font-medium",
                                active
                                  ? "text-white"
                                  : "text-muted-foreground ring-1 ring-foreground/15",
                              )}
                            >
                              {r}
                            </PressableButton>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </motion.section>
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={cascadeItem}
            className="flex items-center justify-between px-8 pb-8 pt-4"
          >
            <PressableButton
              haloColor={halo.black}
              cornerRadius={24}
              onClick={() => setStep("personal")}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: step === "personal" ? "transparent" : "var(--color-card)",
              }}
              className={cn(
                "flex items-center justify-center ring-1 ring-foreground/15",
                step === "personal" && "opacity-50",
              )}
              aria-label="Atrás"
            >
              <CaretLeft size={18} weight="bold" />
            </PressableButton>

            <PressableButton
              haloColor={halo.green}
              cornerRadius={24}
              onClick={() => (step === "personal" ? setStep("role") : close())}
              style={{
                backgroundColor: LOSA_GREEN,
                paddingLeft: 22,
                paddingRight: 22,
                height: 52,
                borderRadius: 24,
              }}
              className="flex items-center gap-2 text-[16px] font-semibold text-black"
            >
              <UserPlus size={18} weight="bold" />
              {step === "personal" ? "Continuar" : "Crear usuario"}
            </PressableButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[14px] font-semibold tracking-[0.4px]">{children}</h3>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[14px] font-medium text-muted-foreground">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-card bg-card-muted px-4 text-[16px] outline-none ring-1 ring-foreground/10 focus:ring-2 focus:ring-foreground/30"
      />
    </label>
  );
}

function DropdownField({
  label,
  value,
  options,
}: {
  label: string;
  value: string | null;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[14px] font-medium text-muted-foreground">{label}</span>
      <div className="flex h-12 items-center justify-between rounded-card bg-card-muted pl-4 pr-1.5 ring-1 ring-foreground/10">
        <span className={value ? "" : "text-muted-foreground"}>
          {value ?? "Label"}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-card bg-black text-white">
          <CaretLeft size={14} weight="bold" style={{ transform: "rotate(-90deg)" }} />
        </div>
      </div>
    </div>
  );
}

function TabPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <PressableButton
      cornerRadius={22}
      haloColor={halo.black}
      onClick={onClick}
      style={{
        height: 44,
        borderRadius: 22,
        backgroundColor: active ? "black" : "transparent",
      }}
      className={cn(
        "flex items-center justify-center text-[14px] font-medium",
        active ? "text-white" : "text-foreground ring-1 ring-foreground/15",
      )}
    >
      {label}
    </PressableButton>
  );
}
