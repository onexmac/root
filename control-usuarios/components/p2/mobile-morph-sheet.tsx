"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type Variants,
} from "motion/react";
import { CaretDown, Plus, UserPlus } from "@phosphor-icons/react";
import { Avatar } from "@/components/ds/avatar";
import { FormField } from "@/components/ds/form-field";
import { SelectionDropdown } from "@/components/ds/selection-dropdown";
import { SetButton } from "@/components/ds/set-button";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import {
  areasDeTrabajo,
  puestosDeTrabajo,
  salarios,
} from "@/lib/mock-users";
import { cn } from "@/lib/cn";

type Step = "personal" | "role";

type FormState = {
  nombre: string;
  cedula: string;
  area: string | null;
  puesto: string | null;
  salario: string | null;
  fechaIngreso: string | null;
};

const initial: FormState = {
  nombre: "", cedula: "", area: null, puesto: null, salario: null, fechaIngreso: null,
};

function reducer(
  s: FormState,
  a: { key: keyof FormState; value: string | null } | { reset: true },
): FormState {
  if ("reset" in a) return initial;
  return { ...s, [a.key]: a.value };
}

// Mobile two-phase morph: FAB → wide pill → bottom sheet.
const morph = springs.morphing;
const PHASE_DELAY = 0.18;
const COLOR_DELAY = 0.22;
const SHARP_CORNERS_DELAY = 0.28;
const CASCADE_START = 0.38;
const STAGGER = 0.06;

const surfaceVariants: Variants = {
  closed: {
    width: 84,
    height: 80,
    right: 16,
    bottom: 32,
    backgroundColor: "#ADD010",
    borderRadius: 24,
    transition: {
      borderRadius: { ...morph },
      backgroundColor: { duration: 0.2 },
      height: { ...morph },
      bottom: { ...morph },
      width: { delay: PHASE_DELAY, ...morph },
      right: { delay: PHASE_DELAY, ...morph },
    },
  },
  open: {
    width: "100%",
    height: "75vh",
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    transition: {
      width: { ...morph },
      right: { ...morph },
      height: { delay: PHASE_DELAY, ...morph },
      bottom: { delay: PHASE_DELAY, ...morph },
      backgroundColor: { delay: COLOR_DELAY, duration: 0.22 },
      borderRadius: { delay: SHARP_CORNERS_DELAY, ...morph },
    },
  },
  fullScreen: {
    width: "100%",
    height: "100vh",
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    borderRadius: 0,
    transition: morph,
  },
};

const plusVariants: Variants = {
  closed: { opacity: 1, scale: 1, transition: { delay: 0.32, duration: 0.15 } },
  open: { opacity: 0, scale: 0.6, transition: { duration: 0.1 } },
};

const contentVariants: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { delayChildren: CASCADE_START, staggerChildren: STAGGER } },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 10, transition: { duration: 0.15 } },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
};

const FULLSCREEN_THRESHOLD = 12;
const RESTING_THRESHOLD = 4;

export function MobileMorphSheet() {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [step, setStep] = useState<Step>("role");
  const [form, dispatch] = useReducer(reducer, initial);
  const bodyRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const headerFadeOpacity = useTransform(scrollY, [0, 24], [0, 1]);

  const close = () => {
    setOpen(false);
    setFullScreen(false);
    setStep("role");
    dispatch({ reset: true });
  };

  // Drive a motion value from native scroll using requestAnimationFrame, which
  // gives motion's own event system a stable source to react to. Then flip the
  // fullScreen flag from useMotionValueEvent — same source of truth, no React
  // re-renders per scroll frame.
  useEffect(() => {
    if (!open) return;
    const el = bodyRef.current;
    if (!el) return;
    let raf = 0;
    const sync = () => {
      scrollY.set(el.scrollTop);
      raf = requestAnimationFrame(sync);
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [open, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setFullScreen((prev) => {
      if (!prev && latest > FULLSCREEN_THRESHOLD) return true;
      if (prev && latest <= RESTING_THRESHOLD) return false;
      return prev;
    });
  });

  const animateTo = !open ? "closed" : fullScreen ? "fullScreen" : "open";

  return (
    <>
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

      <motion.div
        initial="closed"
        animate={animateTo}
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
        {/* Plus icon — only while closed */}
        <motion.span
          variants={plusVariants}
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-black"
        >
          <Plus size={28} weight="bold" />
        </motion.span>

        {/* Sheet content */}
        <motion.div
          variants={contentVariants}
          className="absolute inset-0 flex flex-col"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          {/* Drag handle */}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={close}
            aria-label="Cerrar"
            className="flex justify-center pt-4 pb-2"
          >
            <CaretDown size={20} weight="bold" className="text-gray-400" />
          </motion.button>

          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 flex items-center gap-3 px-5 pt-4"
          >
            <Avatar size={44} />
            <h2 className="text-[20px] font-semibold tracking-[0.4px]">
              NUEVO USUARIO
            </h2>
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 mt-5 grid grid-cols-2 gap-3 px-5"
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

          {/* Header → body fade. Stays in the layout but interpolates opacity
              with scroll, so the fade gradient appears naturally as content
              scrolls under the header. */}
          <motion.div
            aria-hidden
            style={{ opacity: headerFadeOpacity }}
            className="pointer-events-none relative z-10 -mb-6 h-6"
          >
            <div className="h-full w-full bg-gradient-to-b from-white via-white/85 to-transparent" />
          </motion.div>

          {/* Body */}
          <motion.div
            ref={bodyRef}
            variants={itemVariants}
            className="flex-1 overflow-y-auto px-5 pb-5 pt-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={springs.expanding}
                className="flex flex-col gap-5"
              >
                {step === "personal" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <SelectionDropdown
                      label="Área de trabajo"
                      value={form.area}
                      options={areasDeTrabajo}
                      onChange={(v) => dispatch({ key: "area", value: v })}
                    />
                    <SelectionDropdown
                      label="Salario"
                      value={form.salario}
                      options={salarios}
                      onChange={(v) => dispatch({ key: "salario", value: v })}
                    />
                    <SelectionDropdown
                      label="Puesto de trabajo"
                      value={form.puesto}
                      options={puestosDeTrabajo}
                      onChange={(v) => dispatch({ key: "puesto", value: v })}
                    />
                    <SelectionDropdown
                      label="Fecha de ingreso"
                      value={form.fechaIngreso}
                      options={["2026-01-15", "2026-03-01", "2026-05-10"]}
                      onChange={(v) => dispatch({ key: "fechaIngreso", value: v })}
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-end px-5 pb-6 pt-2"
          >
            <SetButton
              variant="green"
              icon={<UserPlus size={18} weight="bold" />}
              onClick={close}
            >
              Crear usuario
            </SetButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
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
