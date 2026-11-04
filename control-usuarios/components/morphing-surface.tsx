"use client";

import { useReducer, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Plus, UserPlus, X } from "@phosphor-icons/react";
import { Avatar } from "@/components/ds/avatar";
import { FormField } from "@/components/ds/form-field";
import { SelectionDropdown } from "@/components/ds/selection-dropdown";
import { Tag } from "@/components/ds/tag";
import { SetButton } from "@/components/ds/set-button";
import { NavCircleButton } from "@/components/ds/navigation-controls";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import {
  areasDeTrabajo,
  puestosDeTrabajo,
  roles,
  salarios,
  type UserRole,
} from "@/lib/mock-users";
import { cn } from "@/lib/cn";

type Step = "personal" | "role";

type FormState = {
  nombre: string;
  cedula: string;
  telefono: string;
  email: string;
  area: string | null;
  puesto: string | null;
  salario: string | null;
  fechaIngreso: string | null;
  rol: UserRole | null;
};

const initial: FormState = {
  nombre: "", cedula: "", telefono: "", email: "",
  area: null, puesto: null, salario: null, fechaIngreso: null, rol: null,
};

function formReducer(
  state: FormState,
  action: { key: keyof FormState; value: string | null } | { reset: true },
): FormState {
  if ("reset" in action) return initial;
  return { ...state, [action.key]: action.value };
}

// Two-phase morph timing
// Open:  width grows first (0 → ~280ms), height follows (180 → ~460ms), corners stay rounded
//        until both dimensions are settled, then snap to sharp edges (~480ms).
// Close: edges round back first, then height collapses, then width.
const morphOpen = springs.morphing;
const morphClose = springs.morphing;
const PHASE_DELAY = 0.18;
const COLOR_DELAY = 0.22;            // color flip starts ~mid-morph (after width done, into height)
const SHARP_CORNERS_DELAY = 0.28;    // hold corners during phase 1, then spring smoothly to sharp through phase 2
const CASCADE_START = 0.38;
const STAGGER = 0.06;

const surfaceVariants: Variants = {
  closed: {
    width: 80,
    height: 80,
    right: 32,
    top: 32,
    backgroundColor: "#ADD010",
    borderRadius: 32,
    transition: {
      // On close: corners spring back to rounded with the same physics, no delay.
      borderRadius: { ...morphClose },
      backgroundColor: { duration: 0.22 },
      height: { ...morphClose },
      top: { ...morphClose },
      width: { delay: PHASE_DELAY, ...morphClose },
      right: { delay: PHASE_DELAY, ...morphClose },
    },
  },
  open: {
    width: 670,
    height: "100vh",
    right: 0,
    top: 0,
    backgroundColor: "#ffffff",
    borderRadius: 0,
    transition: {
      width: { ...morphOpen },
      right: { ...morphOpen },
      height: { delay: PHASE_DELAY, ...morphOpen },
      top: { delay: PHASE_DELAY, ...morphOpen },
      backgroundColor: { delay: COLOR_DELAY, duration: 0.22 },
      // Radius springs smoothly from 32 → 0 during phase 2 of the morph,
      // so the corners feel like they're being absorbed into the rectangle
      // rather than snapping flat at the end.
      borderRadius: { delay: SHARP_CORNERS_DELAY, ...morphOpen },
    },
  },
};

const plusVariants: Variants = {
  closed: { opacity: 1, scale: 1, transition: { delay: 0.32, duration: 0.15 } },
  open: { opacity: 0, scale: 0.6, transition: { duration: 0.1 } },
};

const contentVariants: Variants = {
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: CASCADE_START, staggerChildren: STAGGER },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 12, transition: { duration: 0.15 } },
  open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 28 } },
};


export function MorphingSurface() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("role");
  const [form, dispatch] = useReducer(formReducer, initial);

  const close = () => {
    setOpen(false);
    setStep("role");
    dispatch({ reset: true });
  };

  return (
    <>
      {/* Dim overlay */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={close}
            aria-label="Cerrar"
            className="fixed inset-0 z-20 cursor-default bg-black"
          />
        )}
      </AnimatePresence>

      {/* Single morphing surface — always rendered, animates between two layouts */}
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={surfaceVariants}
        onClick={() => {
          if (!open) {
            haptic.select();
            setOpen(true);
          }
        }}
        role={open ? "dialog" : "button"}
        aria-label={open ? "Nuevo usuario" : "Crear nuevo usuario"}
        className={cn(
          "fixed z-30 overflow-hidden shadow-big",
          open ? "cursor-default" : "cursor-pointer",
        )}
      >
        {/* Plus icon — visible only when closed */}
        <motion.span
          variants={plusVariants}
          className="absolute inset-0 flex items-center justify-center text-black"
          aria-hidden
        >
          <Plus size={28} weight="bold" />
        </motion.span>

        {/* Panel content — cascades in after surface morph completes */}
        <motion.div
          variants={contentVariants}
          className="absolute inset-0 flex flex-col"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between px-8 pt-8"
          >
            <div className="flex items-center gap-3">
              <Avatar size={44} />
              <h2 className="text-[20px] font-semibold tracking-[0.4px]">
                NUEVO USUARIO
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X size={20} weight="bold" />
            </button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={itemVariants}
            className="mt-6 grid grid-cols-2 gap-3 px-8"
          >
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

          {/* Body — cascades as the third item (header → tabs → body → footer) */}
          <motion.div
            variants={itemVariants}
            className="flex-1 overflow-y-auto px-8 py-6"
          >
            <AnimatePresence mode="wait">
              {step === "personal" ? (
                <motion.section
                  key="personal"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={springs.expanding}
                  className="flex flex-col gap-6"
                >
                  <SectionTitle>DATOS PERSONALES</SectionTitle>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Nombre completo"
                      value={form.nombre}
                      placeholder="Juan Pérez"
                      onChange={(v) => dispatch({ key: "nombre", value: v })}
                    />
                    <FormField
                      label="Cédula"
                      value={form.cedula}
                      placeholder="1-0234-5678"
                      onChange={(v) => dispatch({ key: "cedula", value: v })}
                    />
                  </div>

                  <SectionTitle>CONTACTO</SectionTitle>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Teléfono"
                      value={form.telefono}
                      placeholder="8812-3232"
                      onChange={(v) => dispatch({ key: "telefono", value: v })}
                    />
                    <FormField
                      label="Email"
                      value={form.email}
                      placeholder="juan@ejemplo.com"
                      onChange={(v) => dispatch({ key: "email", value: v })}
                    />
                  </div>
                </motion.section>
              ) : (
                <motion.section
                  key="role"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={springs.expanding}
                  className="flex flex-col gap-6"
                >
                  <SectionTitle>ASIGNACIÓN</SectionTitle>
                  <div className="grid grid-cols-2 gap-4">
                    <SelectionDropdown
                      label="Área de trabajo"
                      value={form.area}
                      options={areasDeTrabajo}
                      onChange={(v) => dispatch({ key: "area", value: v })}
                    />
                    <SelectionDropdown
                      label="Puesto de trabajo"
                      value={form.puesto}
                      options={puestosDeTrabajo}
                      onChange={(v) => dispatch({ key: "puesto", value: v })}
                    />
                    <SelectionDropdown
                      label="Salario"
                      value={form.salario}
                      options={salarios}
                      onChange={(v) => dispatch({ key: "salario", value: v })}
                    />
                    <SelectionDropdown
                      label="Fecha de ingreso"
                      value={form.fechaIngreso}
                      options={["2026-01-15", "2026-03-01", "2026-05-10"]}
                      onChange={(v) => dispatch({ key: "fechaIngreso", value: v })}
                    />
                  </div>

                  <SectionTitle>ROL</SectionTitle>
                  <div className="rounded-md bg-gray-100/70 p-5">
                    <div className="flex flex-wrap gap-3">
                      {roles.map((r) => (
                        <Tag
                          key={r}
                          variant={form.rol === r ? "rolePicked" : "roleIdle"}
                          onClick={() =>
                            dispatch({
                              key: "rol",
                              value: form.rol === r ? null : r,
                            })
                          }
                        >
                          {r}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between px-8 pb-8 pt-4"
          >
            <NavCircleButton
              direction="back"
              onClick={() => setStep("personal")}
              disabled={step === "personal"}
            />

            {step === "personal" ? (
              <SetButton
                variant="primary"
                icon={<UserPlus size={18} weight="bold" />}
                onClick={() => setStep("role")}
              >
                Continuar
              </SetButton>
            ) : (
              <SetButton
                variant="primary"
                icon={<UserPlus size={18} weight="bold" />}
                onClick={close}
              >
                Crear usuario
              </SetButton>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[14px] font-semibold tracking-[0.4px] text-black">
      {children}
    </h3>
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
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-full text-[14px] font-medium transition-colors",
        active
          ? "bg-black text-white"
          : "bg-white text-black ring-1 ring-gray-200 hover:bg-gray-100",
      )}
    >
      {label}
    </button>
  );
}
