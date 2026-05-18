"use client";

/**
 * NuevoUsuarioSheet — the FAB → bottom sheet morphing surface.
 * Mirrors P2_SPEC.md §3.7 (BottomActionBar), §3.8 (NewUserSheet), §4.4
 * (two-phase morph), §4.5 (drag-to-dismiss), §4.6 (scroll-to-fullscreen).
 *
 * State machine — variant driven by the parent (page.tsx):
 *   "collapsed"   — green FAB 84×80 at right:16, bottom:24
 *   "sheet"       — white surface 100% × 75vh at right:0, bottom:0
 *   "fullScreen"  — white surface 100% × 100vh, borderRadius: 0
 *
 * Critical close behavior (P2_SPEC.md §4.4): from "sheet" back to "collapsed",
 * the height collapses FIRST, then the width contracts, then the bg shifts
 * green. The variant transitions encode this with `delay` on width/right/bg.
 *
 * Sheet content stays mounted across the close so the bg color morph plays
 * on the same element — see the lesson in P2_SPEC.md §8.1.
 */

import {
  forwardRef,
  useEffect,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type Ref,
} from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  CaretLeft,
  CaretUpDown,
  Plus,
  X,
} from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { PressableButton, halo } from "@/components/ui/pressable-button";
import {
  areasDeTrabajo,
  fechasIngreso,
  puestosDeTrabajo,
  rolesDisponibles,
  salarios,
} from "./mock-data";

type Variant = "collapsed" | "sheet" | "fullScreen";
type Tab = "personal" | "rol";

type FormState = {
  nombre: string;
  cedula: string;
  contacto: string;
  area: string | null;
  puesto: string | null;
  salario: string | null;
  fechaIngreso: string | null;
  rol: string | null;
};

type FormAction =
  | { key: keyof FormState; value: string | null }
  | { reset: true };

const initialForm: FormState = {
  nombre: "",
  cedula: "",
  contacto: "",
  area: null,
  puesto: null,
  salario: null,
  fechaIngreso: null,
  rol: null,
};

function formReducer(state: FormState, action: FormAction): FormState {
  if ("reset" in action) return initialForm;
  return { ...state, [action.key]: action.value };
}

// P2_SPEC.md §4.4 — surface variants. Open: width first, then height.
// Close: height first, then width (delays mirrored).
const surfaceVariants: Variants = {
  collapsed: {
    width: 84,
    height: 80,
    right: 16,
    bottom: 24,
    backgroundColor: "#ADD010",
    borderRadius: 24,
    transition: {
      height:          { ...springs.shrinking },
      bottom:          { ...springs.shrinking },
      borderRadius:    { ...springs.shrinking },
      width:           { delay: 0.18, ...springs.shrinking },
      right:           { delay: 0.18, ...springs.shrinking },
      backgroundColor: { duration: 0.28, delay: 0.18 },
    },
  },
  sheet: {
    width: "100%",
    height: "75vh",
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    transition: {
      width:           { ...springs.expanding },
      right:           { ...springs.expanding },
      height:          { delay: 0.18, ...springs.expanding },
      bottom:          { delay: 0.18, ...springs.expanding },
      backgroundColor: { duration: 0.28, delay: 0.10 },
      borderRadius:    { ...springs.expanding },
    },
  },
  fullScreen: {
    width: "100%",
    height: "100vh",
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    transition: springs.expanding,
  },
};

export interface NuevoUsuarioSheetProps {
  variant: Variant;
  onOpen: () => void;
  onClose: () => void;
  isFullScreen: boolean;
  setIsFullScreen: (v: boolean) => void;
}

export function NuevoUsuarioSheet({
  variant,
  onOpen,
  onClose,
  isFullScreen,
  setIsFullScreen,
}: NuevoUsuarioSheetProps) {
  const [tab, setTab] = useState<Tab>("personal");
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const bodyRef = useRef<HTMLDivElement>(null);

  // P2_SPEC.md §4.6 — scroll-to-fullscreen with hysteresis (12 enter / 2 exit)
  useEffect(() => {
    const el = bodyRef.current;
    if (!el || variant === "collapsed") return;
    const onScroll = () => {
      const top = el.scrollTop;
      if (!isFullScreen && top > 12) setIsFullScreen(true);
      else if (isFullScreen && top <= 2) setIsFullScreen(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [variant, isFullScreen, setIsFullScreen]);

  // Reset the form whenever the sheet closes
  useEffect(() => {
    if (variant === "collapsed") {
      dispatch({ reset: true });
      setTab("personal");
    }
  }, [variant]);

  return (
    <motion.div
      drag={variant !== "collapsed" ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragStart={() => haptic.drag()}
      onDragEnd={(_, info) => {
        // P2_SPEC.md §4.5 — two-step descent
        if (isFullScreen) {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            haptic.select();
            setIsFullScreen(false);
          }
          return;
        }
        if (variant === "sheet") {
          if (info.offset.y > 120 || info.velocity.y > 600) {
            haptic.select();
            onClose();
          }
        }
      }}
      initial="collapsed"
      animate={variant}
      variants={surfaceVariants}
      onClick={() => {
        if (variant === "collapsed") {
          haptic.select();
          onOpen();
        }
      }}
      role={variant === "collapsed" ? "button" : "dialog"}
      aria-label={
        variant === "collapsed" ? "Crear nuevo usuario" : "Nuevo usuario"
      }
      className="fixed z-40 shadow-[0_-2px_16px_rgba(0,0,0,0.12)]"
      style={{
        cursor: variant === "collapsed" ? "pointer" : "default",
        touchAction: variant !== "collapsed" ? "pan-y" : "manipulation",
      }}
    >
      {/* FAB plus icon — only visible while collapsed */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          opacity: variant === "collapsed" ? 1 : 0,
          scale: variant === "collapsed" ? 1 : 0.6,
        }}
        transition={
          variant === "collapsed"
            ? { ...springs.completing, delay: 0.32 }
            : { duration: 0.1 }
        }
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: "#000" }}
      >
        <Plus size={26} weight="bold" />
      </motion.span>

      {/* Sheet content — stays mounted across the close so the surface bg
          morph plays on the same element. See P2_SPEC.md §8.1. */}
      <motion.div
        initial={false}
        animate={{
          opacity: variant === "collapsed" ? 0 : 1,
        }}
        transition={{
          duration: variant === "collapsed" ? 0.18 : 0.28,
          delay: variant === "collapsed" ? 0 : 0.18,
          ease: "easeOut",
        }}
        className="absolute inset-0 flex flex-col"
        style={{
          pointerEvents: variant === "collapsed" ? "none" : "auto",
        }}
      >
        <SheetHeader onClose={onClose} />
        <TabToggle tab={tab} onTabChange={setTab} />
        <SheetBody
          ref={bodyRef}
          tab={tab}
          form={form}
          dispatch={dispatch}
          isFullScreen={isFullScreen}
        />
        <SheetFooter onClose={onClose} />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function SheetHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative shrink-0" style={{ paddingTop: 10 }}>
      <div
        aria-hidden
        className="mx-auto rounded-full"
        style={{ width: 36, height: 4, background: "#AAAFB6" }}
      />
      <div className="flex items-center justify-between px-5 pt-3 pb-3">
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#000",
            letterSpacing: 0.4,
          }}
        >
          Nuevo Usuario
        </h2>
        <PressableButton
          haloColor={halo.white}
          cornerRadius={22}
          onPressStart={() => haptic.select()}
          onClick={onClose}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: "rgba(0,0,0,0.06)",
          }}
          className="text-[#000]"
          aria-label="Cerrar"
        >
          <X size={16} weight="bold" />
        </PressableButton>
      </div>
    </div>
  );
}

function TabToggle({
  tab,
  onTabChange,
}: {
  tab: Tab;
  onTabChange: (t: Tab) => void;
}) {
  return (
    <div className="shrink-0 px-5 pb-3">
      <div
        className="relative grid grid-cols-2 gap-1 rounded-xl p-1"
        style={{ background: "rgba(0,0,0,0.05)", height: 44 }}
      >
        {(["personal", "rol"] as const).map((value) => {
          const active = tab === value;
          return (
            <PressableButton
              key={value}
              haloColor={active ? halo.black : halo.white}
              cornerRadius={10}
              onPressStart={() => haptic.select()}
              onClick={() => onTabChange(value)}
              style={{
                height: 36,
                borderRadius: 10,
                background: active ? "#000" : "transparent",
                color: active ? "#FFFFFF" : "#5D636C",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.4,
              }}
              aria-label={value === "personal" ? "Personal" : "Rol y asignación"}
              aria-pressed={active}
            >
              {value === "personal" ? "Personal" : "Rol y asignación"}
            </PressableButton>
          );
        })}
      </div>
    </div>
  );
}

const SheetBody = forwardRef<
  HTMLDivElement,
  {
    tab: Tab;
    form: FormState;
    dispatch: Dispatch<FormAction>;
    isFullScreen: boolean;
  }
>(function SheetBody({ tab, form, dispatch, isFullScreen }, ref) {
  return (
    <div className="relative min-h-0 flex-1">
      {/* Top fade — only visible in fullScreen, per P2_SPEC.md §4.6 */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: isFullScreen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-x-0 top-0 z-10"
        style={{
          height: 24,
          background: "linear-gradient(to bottom, #FFFFFF, transparent)",
        }}
      />
      <div
        ref={ref}
        className="h-full overflow-y-auto px-5 pt-2 pb-6"
        style={{ overscrollBehavior: "contain" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={springs.expanding}
            className="flex flex-col gap-5"
          >
            {tab === "personal" ? (
              <PersonalFields form={form} dispatch={dispatch} />
            ) : (
              <RolFields form={form} dispatch={dispatch} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

function SheetFooter({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="shrink-0 border-t px-5 py-3"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        background: "rgba(255,255,255,0.96)",
      }}
    >
      <div className="flex items-center gap-3" style={{ height: 64 }}>
        <PressableButton
          haloColor={halo.white}
          cornerRadius={30}
          onPressStart={() => haptic.select()}
          onClick={onClose}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            background: "rgba(0,0,0,0.06)",
          }}
          className="text-[#000]"
          aria-label="Volver"
        >
          <CaretLeft size={18} weight="bold" />
        </PressableButton>
        <PressableButton
          haloColor={halo.green}
          cornerRadius={28}
          onPressStart={() => haptic.select()}
          onClick={() => {
            haptic.complete();
            onClose();
          }}
          style={{
            flex: 1,
            height: 60,
            borderRadius: 28,
            background: "#ADD010",
            color: "#000",
          }}
          aria-label="Crear usuario"
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 0.4,
            }}
          >
            Crear usuario
          </span>
        </PressableButton>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form fields                                                               */
/* -------------------------------------------------------------------------- */

function PersonalFields({
  form,
  dispatch,
}: {
  form: FormState;
  dispatch: Dispatch<FormAction>;
}) {
  return (
    <>
      <TextField
        label="Nombre completo"
        placeholder="Juan Pérez"
        value={form.nombre}
        onChange={(v) => dispatch({ key: "nombre", value: v })}
      />
      <TextField
        label="Cédula"
        placeholder="1-0234-5678"
        value={form.cedula}
        onChange={(v) => dispatch({ key: "cedula", value: v })}
      />
      <TextField
        label="Contacto"
        placeholder="8812-3232"
        value={form.contacto}
        onChange={(v) => dispatch({ key: "contacto", value: v })}
      />
    </>
  );
}

function RolFields({
  form,
  dispatch,
}: {
  form: FormState;
  dispatch: Dispatch<FormAction>;
}) {
  return (
    <>
      <DropdownField
        label="Área de trabajo"
        value={form.area}
        options={areasDeTrabajo}
        onChange={(v) => dispatch({ key: "area", value: v })}
      />
      <DropdownField
        label="Puesto de trabajo"
        value={form.puesto}
        options={puestosDeTrabajo}
        onChange={(v) => dispatch({ key: "puesto", value: v })}
      />
      <DropdownField
        label="Salario"
        value={form.salario}
        options={salarios}
        onChange={(v) => dispatch({ key: "salario", value: v })}
      />
      <DropdownField
        label="Fecha de ingreso"
        value={form.fechaIngreso}
        options={fechasIngreso}
        onChange={(v) => dispatch({ key: "fechaIngreso", value: v })}
      />
      <DropdownField
        label="Rol"
        value={form.rol}
        options={rolesDisponibles}
        onChange={(v) => dispatch({ key: "rol", value: v })}
      />
    </>
  );
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: "#5D636C",
        }}
      >
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl px-4 outline-none"
        style={{
          height: 48,
          background: "#FFFFFF",
          border: "1px solid #D9D9D9",
          fontSize: 16,
          color: "#000",
        }}
      />
    </label>
  );
}

function DropdownField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col gap-1.5">
      <span
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: "#5D636C",
        }}
      >
        {label}
      </span>
      <PressableButton
        haloColor={halo.white}
        cornerRadius={12}
        onPressStart={() => haptic.select()}
        onClick={() => setOpen((o) => !o)}
        style={{
          height: 48,
          borderRadius: 12,
          background: "#FFFFFF",
          border: "1px solid #D9D9D9",
          paddingLeft: 16,
          paddingRight: 8,
        }}
        className="flex w-full items-center justify-between"
        aria-label={label}
      >
        <span
          style={{
            fontSize: 16,
            color: value ? "#000" : "#AAAFB6",
          }}
        >
          {value ?? "Label"}
        </span>
        <span
          className="flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#000",
            color: "#FFFFFF",
          }}
        >
          <CaretUpDown size={16} weight="bold" />
        </span>
      </PressableButton>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={springs.expanding}
            className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  haptic.select();
                  onChange(opt);
                  setOpen(false);
                }}
                className="block w-full px-4 py-3 text-left text-[14px] hover:bg-black/5"
                style={{ color: "#000" }}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
