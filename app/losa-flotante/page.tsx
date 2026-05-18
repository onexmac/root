"use client";

/**
 * Losa Flotante storybook — one page, all components.
 *
 * Source of truth: Figma file `oRDLRL9OUNcTQ0k6G5MBPS` ("Losa Flotante / Core")
 *
 * Three statuses per section:
 *   • Foundation  → tokens (color, type, spacing, radii, shadow, icons)
 *   • Linked      → known interaction, implemented in our prototypes, points back
 *                   to PressableButton / WorkerCard / NuevoUsuarioSheet / etc.
 *   • Flat        → visual showcase only; interaction & variants flagged as
 *                   TODOs so the next pass can fill them in.
 *
 * If you implement a flat section, change the `status="flat"` to "linked" and
 * remove the <Note> blocks.
 */

import { useState } from "react";
import {
  ArrowRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretUpDown,
  CheckCircle,
  IdentificationCard,
  MagnifyingGlass,
  Minus,
  Plus,
  SlidersHorizontal,
  Sparkle,
  Trash,
  User,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { PressableButton, halo } from "@/components/ui/pressable-button";
import { CheckboxMark } from "@/components/ui/checkbox-mark";
import { haptic } from "@/lib/haptic";
import { springs } from "@/lib/springs";
import { Section, Variants, Note, Code } from "@/components/losa-flotante/showcase";
import { motion } from "motion/react";

const TOC = [
  { id: "foundation-colors", label: "Colors" },
  { id: "foundation-typography", label: "Typography" },
  { id: "foundation-spacing", label: "Spacing & radii" },
  { id: "foundation-shadows", label: "Shadows" },
  { id: "set-buttons", label: "setButtons" },
  { id: "navigation-controls", label: "navigationControls" },
  { id: "toggle-cards", label: "toggleCards" },
  { id: "tabs-menu", label: "tabsMenu" },
  { id: "tab-filter-bar", label: "tabFilterBar" },
  { id: "filter-options", label: "filterOptions" },
  { id: "selection-dropdown", label: "selectionDropdown" },
  { id: "form-field", label: "formField" },
  { id: "checkbox", label: "checkBox" },
  { id: "tags", label: "tags" },
  { id: "labels", label: "labels" },
  { id: "option-label", label: "optionLabel" },
  { id: "search-bar", label: "searchBar" },
  { id: "toggle-menu", label: "toggleMenu" },
  { id: "quantity-selector", label: "quantitySelector" },
  { id: "slide-button", label: "slideButton" },
  { id: "summary-card", label: "summaryCard" },
  { id: "progress-bar", label: "progressBar" },
];

export default function LosaFlotanteStorybook() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-24 pt-12">
      {/* Header */}
      <header>
        <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5D636C]">
          Storybook · Losa Flotante
        </div>
        <h1 className="mt-2 text-[40px] font-bold leading-tight">
          Design System Components
        </h1>
        <p className="mt-3 max-w-[640px] text-[15px] text-[#5D636C]">
          One page per component family from the Losa Flotante Figma. Sections
          with full interaction logic are <strong>Linked</strong> back to the
          prototype components (PressableButton, WorkerCard, NuevoUsuarioSheet).
          Sections without a known spec ship <strong>Flat</strong> — visual
          only, with TODO comments flagging the gaps.
        </p>
      </header>

      {/* Table of contents */}
      <nav className="mt-8 grid grid-cols-2 gap-x-6 gap-y-1 rounded-2xl bg-white p-5 sm:grid-cols-3">
        {TOC.map((entry) => (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            className="text-[13px] text-[#5D636C] hover:text-black hover:underline"
          >
            {entry.label}
          </a>
        ))}
      </nav>

      <FoundationsColors />
      <FoundationsTypography />
      <FoundationsSpacing />
      <FoundationsShadows />

      <SetButtonsSection />
      <NavigationControlsSection />
      <ToggleCardsSection />
      <TabsMenuSection />
      <TabFilterBarSection />
      <FilterOptionsSection />
      <SelectionDropdownSection />
      <FormFieldSection />
      <CheckboxSection />
      <TagsSection />
      <LabelsSection />
      <OptionLabelSection />

      <SearchBarSection />
      <ToggleMenuSection />
      <QuantitySelectorSection />
      <SlideButtonSection />
      <SummaryCardSection />
      <ProgressBarSection />
    </div>
  );
}

/* ========================================================================== */
/*  FOUNDATIONS                                                               */
/* ========================================================================== */

function FoundationsColors() {
  const tokens: Array<{ name: string; hex: string; group: string }> = [
    { name: "green-100 (brand)", hex: "#ADD010", group: "Brand" },
    { name: "green-200 (halo)", hex: "#88A024", group: "Brand" },
    { name: "black", hex: "#000000", group: "Neutral" },
    { name: "charcoal", hex: "#1C1C1C", group: "Neutral" },
    { name: "black-100 (overlay)", hex: "#000000CC", group: "Neutral" },
    { name: "white", hex: "#FFFFFF", group: "Neutral" },
    { name: "background", hex: "#F3F3F3", group: "Neutral" },
    { name: "gray-100", hex: "#EBEBEB", group: "Gray" },
    { name: "gray-200", hex: "#D9D9D9", group: "Gray" },
    { name: "gray-300", hex: "#AAAFB6", group: "Gray" },
    { name: "gray-400", hex: "#747B86", group: "Gray" },
    { name: "gray-500", hex: "#5D636C", group: "Gray" },
    { name: "red-100", hex: "#C96C6C", group: "Status" },
    { name: "red-200", hex: "#BB4A4A", group: "Status" },
    { name: "yellow", hex: "#F0C802", group: "Status" },
  ];

  const groups = ["Brand", "Neutral", "Gray", "Status"];

  return (
    <Section
      id="foundation-colors"
      title="Colors"
      status="foundation"
      description="Hex values from Figma. Use named tokens in code (bg-brand, text-foreground). Raw hex only when the design uses an off-token tone."
    >
      {groups.map((g) => (
        <div key={g} className="mb-3">
          <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-[#5D636C]">
            {g}
          </div>
          <div className="flex flex-wrap gap-3">
            {tokens
              .filter((t) => t.group === g)
              .map((t) => (
                <div key={t.name} className="flex w-[180px] flex-col gap-1">
                  <div
                    className="h-16 rounded-xl ring-1 ring-black/5"
                    style={{ background: t.hex }}
                  />
                  <div className="text-[13px] font-semibold">{t.name}</div>
                  <div className="text-[11px] text-[#5D636C]">{t.hex}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </Section>
  );
}

function FoundationsTypography() {
  const types = [
    { name: "heading/semibold 32px", size: 32, weight: 600, lh: 40, ls: 0.4 },
    { name: "subtitle/semibold 24px", size: 24, weight: 600, lh: 24, ls: 0.4 },
    { name: "subtitle/regular 24px", size: 24, weight: 400, lh: 24, ls: 0.4 },
    { name: "subtitle/semibold 20px", size: 20, weight: 600, lh: 24, ls: 0.4 },
    { name: "subtitle/regular 20px", size: 20, weight: 400, lh: 24, ls: 0.4 },
    { name: "body/semibold 16px", size: 16, weight: 600, lh: 24, ls: 0 },
    { name: "body/regular 16px", size: 16, weight: 400, lh: 24, ls: 0 },
    { name: "body/semibold 12px", size: 12, weight: 600, lh: 16, ls: 0 },
    { name: "body/regular 12px", size: 12, weight: 400, lh: 16, ls: 0 },
  ];
  return (
    <Section
      id="foundation-typography"
      title="Typography"
      status="foundation"
      description="Roboto across the board. Tracking 0.4 only on subtitles & headings."
    >
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6">
        {types.map((t) => (
          <div
            key={t.name}
            className="flex items-baseline justify-between gap-6 border-b border-black/5 pb-3 last:border-0"
          >
            <span
              style={{
                fontSize: t.size,
                fontWeight: t.weight,
                lineHeight: `${t.lh}px`,
                letterSpacing: t.ls,
                color: "#000",
              }}
            >
              The quick brown fox
            </span>
            <span className="shrink-0 font-mono text-[11px] text-[#5D636C]">
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FoundationsSpacing() {
  const spacing = [2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
  const radii = [4, 8, 16, 24, 32];
  return (
    <Section
      id="foundation-spacing"
      title="Spacing & radii"
      status="foundation"
    >
      <div className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-[#5D636C]">
        Spacing scale (px)
      </div>
      <div className="flex flex-wrap items-end gap-4 rounded-2xl bg-white p-6">
        {spacing.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div
              style={{ width: s, height: s, background: "#ADD010" }}
              className="rounded-sm"
            />
            <span className="font-mono text-[11px] text-[#5D636C]">{s}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-4 text-[12px] font-semibold uppercase tracking-wider text-[#5D636C]">
        Corner radii (px)
      </div>
      <div className="flex flex-wrap items-end gap-4 rounded-2xl bg-white p-6">
        {radii.map((r) => (
          <div key={r} className="flex flex-col items-center gap-2">
            <div
              style={{
                width: 56,
                height: 56,
                background: "#1C1C1C",
                borderRadius: r,
              }}
            />
            <span className="font-mono text-[11px] text-[#5D636C]">{r}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FoundationsShadows() {
  return (
    <Section
      id="foundation-shadows"
      title="Shadows"
      status="foundation"
      description="Cards float on shadow-01; soft modals on shadow-02-soft; raised sheets on shadow-03-big."
    >
      <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white p-6">
        {[
          {
            name: "shadow-01",
            css: "0 4px 8px rgba(170, 175, 182, 0.25)",
          },
          {
            name: "shadow-02-soft",
            css: "0 0 6px rgba(0, 0, 0, 0.16)",
          },
          {
            name: "shadow-03-big",
            css: "0 2px 4px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.16)",
          },
        ].map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <div
              className="h-20 w-32 rounded-xl bg-white"
              style={{ boxShadow: s.css }}
            />
            <div className="text-[12px] font-semibold">{s.name}</div>
            <code className="text-center font-mono text-[10px] text-[#5D636C]">
              {s.css}
            </code>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ========================================================================== */
/*  setButtons  — Linked                                                      */
/* ========================================================================== */

function SetButtonsSection() {
  return (
    <Section
      id="set-buttons"
      title="setButtons"
      figmaNode="434:2434"
      status="linked"
      description="Every interactive surface in the prototype. Implemented as <PressableButton>: halo 8px outside the bounds, 80ms press-in / 180ms release (delayed 120ms), onClick fires after a 100ms grace period."
    >
      <Variants label="Variants — sized for FAB / sidebar / card chevron">
        <PressableButton
          cornerRadius={24}
          haloColor={halo.green}
          onPressStart={() => haptic.select()}
          style={{
            width: 84,
            height: 80,
            borderRadius: 24,
            background: "#ADD010",
            color: "#000",
          }}
          aria-label="Crear"
        >
          <Plus size={26} weight="bold" />
        </PressableButton>
        <PressableButton
          cornerRadius={24}
          haloColor={halo.black}
          onPressStart={() => haptic.select()}
          style={{
            width: 84,
            height: 80,
            borderRadius: 24,
            background: "#1C1C1C",
            color: "#FFFFFF",
          }}
          aria-label="Menú"
        >
          <SlidersHorizontal size={24} weight="bold" />
        </PressableButton>
        <PressableButton
          cornerRadius={14}
          haloColor={halo.white}
          onPressStart={() => haptic.select()}
          style={{
            width: 60,
            height: 56,
            borderRadius: 14,
            background: "#000",
            color: "#FFFFFF",
          }}
          aria-label="Expandir"
        >
          <CaretUpDown size={16} weight="bold" />
        </PressableButton>
        <PressableButton
          cornerRadius={999}
          haloColor={halo.green}
          onPressStart={() => haptic.select()}
          style={{
            height: 48,
            borderRadius: 999,
            background: "#ADD010",
            color: "#000",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600 }}>Crear usuario</span>
        </PressableButton>
        <PressableButton
          cornerRadius={999}
          haloColor={halo.white}
          onPressStart={() => haptic.select()}
          style={{
            height: 40,
            borderRadius: 999,
            background: "rgba(0,0,0,0.06)",
            color: "#000",
            paddingLeft: 18,
            paddingRight: 18,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600 }}>Cancelar</span>
        </PressableButton>
      </Variants>

      <Code>{`import { PressableButton, halo } from "@/components/ui/pressable-button";

<PressableButton
  cornerRadius={24}
  haloColor={halo.green}
  onPressStart={() => haptic.select()}
  onClick={() => setOpen(true)}
  style={{ width: 84, height: 80, background: "#ADD010" }}
  aria-label="Crear usuario"
>
  <Plus size={26} weight="bold" />
</PressableButton>`}</Code>
    </Section>
  );
}

/* ========================================================================== */
/*  navigationControls  — Linked                                              */
/* ========================================================================== */

function NavigationControlsSection() {
  return (
    <Section
      id="navigation-controls"
      title="navigationControls"
      figmaNode="1023:3659"
      status="linked"
      description="Circular back/forward used in sheet footers and step wizards. Same press contract as setButtons; the halo color matches the fill (halo.white on the light back button)."
    >
      <Variants>
        <PressableButton
          cornerRadius={30}
          haloColor={halo.white}
          onPressStart={() => haptic.select()}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            background: "rgba(0,0,0,0.06)",
            color: "#000",
          }}
          aria-label="Atrás"
        >
          <CaretLeft size={18} weight="bold" />
        </PressableButton>
        <PressableButton
          cornerRadius={30}
          haloColor={halo.green}
          onPressStart={() => haptic.select()}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            background: "#ADD010",
            color: "#000",
          }}
          aria-label="Siguiente"
        >
          <CaretRight size={18} weight="bold" />
        </PressableButton>
        <PressableButton
          cornerRadius={28}
          haloColor={halo.green}
          onPressStart={() => haptic.select()}
          style={{
            height: 56,
            borderRadius: 28,
            background: "#ADD010",
            color: "#000",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            Continuar <ArrowRight size={16} weight="bold" />
          </span>
        </PressableButton>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  toggleCards — Linked                                                      */
/* ========================================================================== */

function ToggleCardsSection() {
  const [open, setOpen] = useState(false);
  return (
    <Section
      id="toggle-cards"
      title="toggleCards"
      figmaNode="1023:3745"
      status="linked"
      description="The black chevron pill on the right of every employee card. 60×56, corner 14, halo.white. Collapsed shows stacked ▲▼; expanded shows ▼ only. Drives the card's grid-template-rows expand/collapse."
    >
      <Variants>
        <PressableButton
          cornerRadius={14}
          haloColor={halo.white}
          onPressStart={() => haptic.select()}
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 60,
            height: 56,
            borderRadius: 14,
            background: "#000",
            color: "#FFFFFF",
          }}
          aria-label={open ? "Colapsar" : "Expandir"}
        >
          {open ? (
            <CaretDown size={16} weight="bold" />
          ) : (
            <div className="flex flex-col items-center gap-0.5">
              <CaretUp size={12} weight="bold" />
              <CaretDown size={12} weight="bold" />
            </div>
          )}
        </PressableButton>
        <span className="text-[13px] text-[#5D636C]">
          Click ↑ to toggle — same component lives on each WorkerCard
        </span>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  tabsMenu — Linked                                                         */
/* ========================================================================== */

function TabsMenuSection() {
  const [active, setActive] = useState("usuarios");
  const items = [
    { key: "perfil", Icon: IdentificationCard, label: "Perfil" },
    { key: "usuarios", Icon: User, label: "Usuarios" },
    { key: "equipos", Icon: UsersThree, label: "Equipos" },
  ];
  return (
    <Section
      id="tabs-menu"
      title="tabsMenu"
      figmaNode="1014:3648"
      status="linked"
      description="Vertical icon-only sidebar nav. Each item is a 52×52 PressableButton with halo.white. Active state uses rgba(255,255,255,0.18) on a #1C1C1C background."
    >
      <Variants background="#1C1C1C">
        <nav className="flex w-[102px] flex-col items-center gap-6 py-6">
          {items.map(({ key, Icon, label }) => {
            const isActive = key === active;
            return (
              <PressableButton
                key={key}
                cornerRadius={26}
                haloColor={halo.white}
                onPressStart={() => haptic.select()}
                onClick={() => setActive(key)}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: isActive
                    ? "rgba(255,255,255,0.18)"
                    : "transparent",
                  color: "#FFFFFF",
                }}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={24} weight="regular" />
              </PressableButton>
            );
          })}
        </nav>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  tabFilterBar — Linked                                                     */
/* ========================================================================== */

function TabFilterBarSection() {
  const [active, setActive] = useState("activos");
  const tabs = ["activos", "completados", "todos"];
  return (
    <Section
      id="tab-filter-bar"
      title="tabFilterBar"
      figmaNode="859:3039"
      status="linked"
      description="Horizontal filter pills. Active filled black; disabled outlined gray. Pill radius 999, padding 16/8."
    >
      <Variants>
        {tabs.map((t) => {
          const isActive = t === active;
          return (
            <PressableButton
              key={t}
              cornerRadius={999}
              haloColor={isActive ? halo.black : halo.white}
              onPressStart={() => haptic.select()}
              onClick={() => setActive(t)}
              style={{
                height: 40,
                borderRadius: 999,
                background: isActive ? "#000" : "transparent",
                color: isActive ? "#FFFFFF" : "#5D636C",
                paddingLeft: 16,
                paddingRight: 16,
                border: isActive ? "none" : "1px solid #AAAFB6",
              }}
              aria-pressed={isActive}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  textTransform: "capitalize",
                }}
              >
                {t}
              </span>
            </PressableButton>
          );
        })}
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  filterOptions — Flat                                                      */
/* ========================================================================== */

function FilterOptionsSection() {
  return (
    <Section
      id="filter-options"
      title="filterOptions"
      figmaNode="1023:3630"
      status="flat"
      description="Filter chip group — used to slice a list by area / role / status. Not yet implemented in a prototype."
    >
      <Variants>
        <div className="flex flex-wrap gap-2">
          {["Todos", "Producción", "Logística", "Bodega"].map((label, i) => {
            const active = i === 1;
            return (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full"
                style={{
                  padding: "8px 16px",
                  background: active ? "#000" : "transparent",
                  color: active ? "#FFFFFF" : "#5D636C",
                  border: active ? "none" : "1px solid #AAAFB6",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                }}
              >
                {label}
                {active && <X size={12} weight="bold" />}
              </span>
            );
          })}
        </div>
      </Variants>
      <Note>
        Need spec for: (a) single vs multi-select, (b) "clear all" affordance,
        (c) does selecting an option close the bar or stay open?, (d) interaction
        with searchBar when both visible.
      </Note>
    </Section>
  );
}

/* ========================================================================== */
/*  selectionDropdown — Linked                                                */
/* ========================================================================== */

function SelectionDropdownSection() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const options = ["Producción", "Logística", "Bodega"];
  return (
    <Section
      id="selection-dropdown"
      title="selectionDropdown"
      figmaNode="1027:3905"
      status="linked"
      description="Form field with a chevron-up-down trigger pill. 48 tall, radius 12, gray border. The trigger pill on the right is a 32×32 black square with the CaretUpDown."
    >
      <Variants>
        <div className="relative w-[280px]">
          <PressableButton
            cornerRadius={12}
            haloColor={halo.white}
            onPressStart={() => haptic.select()}
            onClick={() => setOpen((o) => !o)}
            style={{
              height: 48,
              width: "100%",
              borderRadius: 12,
              background: "#FFFFFF",
              border: "1px solid #D9D9D9",
              paddingLeft: 16,
              paddingRight: 8,
              justifyContent: "space-between",
            }}
            aria-label="Área"
          >
            <span style={{ fontSize: 16, color: value ? "#000" : "#AAAFB6" }}>
              {value ?? "Área de trabajo"}
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
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springs.expanding}
              className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
            >
              {options.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    setValue(o);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-3 text-left text-[14px] hover:bg-black/5"
                >
                  {o}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  formField — Linked                                                        */
/* ========================================================================== */

function FormFieldSection() {
  const [value, setValue] = useState("");
  return (
    <Section
      id="form-field"
      title="formField"
      figmaNode="763:2791"
      status="linked"
      description="Labeled text input. Label 13/regular #5D636C; input 48px tall, radius 12, gray-200 border."
    >
      <Variants>
        <label className="flex w-[280px] flex-col gap-1.5">
          <span style={{ fontSize: 13, color: "#5D636C" }}>Nombre completo</span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Juan Pérez"
            className="rounded-xl px-4 outline-none focus:border-black"
            style={{
              height: 48,
              border: "1px solid #D9D9D9",
              fontSize: 16,
              color: "#000",
            }}
          />
        </label>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  checkBox — Linked                                                         */
/* ========================================================================== */

function CheckboxSection() {
  const [on, setOn] = useState(false);
  return (
    <Section
      id="checkbox"
      title="checkBox"
      figmaNode="1029:4233"
      status="linked"
      description="Animated checkbox using the existing CheckboxMark primitive. Filled ring with the SVG check stroke springing in via completing."
    >
      <Variants>
        <PressableButton
          cornerRadius={999}
          haloColor={halo.black}
          haloWidth={3}
          onPressStart={() => haptic.select()}
          onClick={() => setOn((v) => !v)}
          style={{ width: 32, height: 32, borderRadius: 999 }}
          aria-label={on ? "Desmarcar" : "Marcar"}
        >
          <CheckboxMark isOn={on} />
        </PressableButton>
        <span className="text-[13px] text-[#5D636C]">
          Click ↑ to toggle (reuses components/ui/checkbox-mark.tsx)
        </span>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  tags — Linked                                                             */
/* ========================================================================== */

function TagsSection() {
  return (
    <Section
      id="tags"
      title="tags"
      figmaNode="1123:24554"
      status="linked"
      description="Status pills. Active = black/white with leading ✓ (filled). Inactive = rgba(0,0,0,0.08) / #5D636C. Outlined = transparent + gray-300 border. Always rounded-full."
    >
      <Variants>
        <span
          className="inline-flex items-center gap-1.5"
          style={{
            background: "#000",
            color: "#FFFFFF",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0.4,
          }}
        >
          <CheckCircle size={11} weight="fill" />
          Activo
        </span>
        <span
          className="inline-flex items-center"
          style={{
            background: "rgba(0,0,0,0.08)",
            color: "#5D636C",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0.4,
          }}
        >
          Inactivo
        </span>
        <span
          className="inline-flex items-center"
          style={{
            background: "transparent",
            color: "#5D636C",
            padding: "6px 12px",
            border: "1px solid #AAAFB6",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Ingeniero
        </span>
        <span
          className="inline-flex items-center gap-1"
          style={{
            background: "transparent",
            color: "#5D636C",
            padding: "6px 12px",
            border: "1px solid #AAAFB6",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Casa Bosque
          <CaretDown size={12} weight="bold" />
        </span>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  labels — Linked                                                           */
/* ========================================================================== */

function LabelsSection() {
  return (
    <Section
      id="labels"
      title="labels"
      figmaNode="434:3501"
      status="linked"
      description="Standalone label patterns — used inside setButtons and AttributeRow. 'Label' = 13/regular #5D636C; 'Strong' = 16/semibold #000."
    >
      <Variants>
        <div className="flex flex-col gap-2">
          <span style={{ fontSize: 13, fontWeight: 400, color: "#5D636C" }}>
            Área de trabajo
          </span>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#000" }}>
            Producción
          </span>
        </div>
      </Variants>
    </Section>
  );
}

/* ========================================================================== */
/*  optionLabel — Flat                                                        */
/* ========================================================================== */

function OptionLabelSection() {
  return (
    <Section
      id="option-label"
      title="optionLabel"
      figmaNode="778:2883"
      status="flat"
      description="A radio-style row used inside lists (likely 'pick one of these'). Visually like OrderCard's option rows."
    >
      <Variants>
        <div className="flex w-full max-w-[320px] flex-col">
          {["Entrega estándar", "Entrega express", "Recoger en almacén"].map(
            (label, i) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-4 rounded-xl py-2 text-left"
              >
                <span
                  className="relative h-7 w-7 shrink-0 rounded-full"
                  style={{
                    border: "2.5px solid",
                    borderColor: i === 0 ? "#000" : "#AAAFB6",
                  }}
                >
                  {i === 0 && (
                    <span
                      className="absolute inset-1.5 rounded-full"
                      style={{ background: "#000" }}
                    />
                  )}
                </span>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{label}</span>
              </button>
            ),
          )}
        </div>
      </Variants>
      <Note>
        Need spec for: (a) single vs multi-select, (b) is the icon always a
        ring-and-dot or does it swap to a checkmark on select?, (c) what happens
        if the option opens further detail.
      </Note>
    </Section>
  );
}

/* ========================================================================== */
/*  searchBar — Flat                                                          */
/* ========================================================================== */

function SearchBarSection() {
  return (
    <Section
      id="search-bar"
      title="searchBar"
      figmaNode="1014:3556"
      status="flat"
      description="Search input — appears in lists where filter > 8 items. Two layout variants in Figma: 'label' and (probably) 'no label'."
    >
      <Variants>
        <div className="w-[320px]">
          <label
            className="flex items-center gap-2 rounded-full bg-white px-4"
            style={{
              height: 48,
              border: "1px solid #D9D9D9",
            }}
          >
            <MagnifyingGlass size={18} weight="regular" color="#AAAFB6" />
            <input
              type="search"
              placeholder="Buscar..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: 16, color: "#000" }}
            />
          </label>
        </div>
      </Variants>
      <Note>
        Need spec for: (a) keyboard shortcut on focus (e.g. ⌘K?), (b) clear
        button position when there's text, (c) does it expand from a search icon
        on mobile?, (d) loading/spinner state during async search.
      </Note>
    </Section>
  );
}

/* ========================================================================== */
/*  toggleMenu — Flat                                                         */
/* ========================================================================== */

function ToggleMenuSection() {
  return (
    <Section
      id="toggle-menu"
      title="toggleMenu"
      figmaNode="1026:3823"
      status="flat"
      description="Menu with a single-toggled active state. Visually similar to tabsMenu but horizontal-only?"
    >
      <Variants>
        <div
          className="inline-flex rounded-xl p-1"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          {["Lista", "Tarjetas"].map((label, i) => {
            const active = i === 0;
            return (
              <button
                key={label}
                type="button"
                className="rounded-lg px-5"
                style={{
                  height: 36,
                  background: active ? "#000" : "transparent",
                  color: active ? "#FFFFFF" : "#5D636C",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </Variants>
      <Note>
        Need spec for: (a) how it differs from tabFilterBar — orientation? max
        items? icon vs text?, (b) does it manage URL state or just UI state?,
        (c) keyboard nav between options.
      </Note>
    </Section>
  );
}

/* ========================================================================== */
/*  quantitySelector — Flat                                                   */
/* ========================================================================== */

function QuantitySelectorSection() {
  const [qty, setQty] = useState(3);
  return (
    <Section
      id="quantity-selector"
      title="quantitySelector"
      figmaNode="879:4242"
      status="flat"
      description="Stepper input. Likely distinct from the existing /components/quantity-slider (which is drag-based)."
    >
      <Variants>
        <div className="inline-flex items-center gap-2 rounded-full bg-white p-1.5 ring-1 ring-[#D9D9D9]">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(0, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
            aria-label="Restar"
          >
            <Minus size={14} weight="bold" />
          </button>
          <span
            className="min-w-[40px] text-center font-mono"
            style={{ fontSize: 18, fontWeight: 600 }}
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
            aria-label="Sumar"
          >
            <Plus size={14} weight="bold" />
          </button>
        </div>
      </Variants>
      <Note>
        Need spec for: (a) min/max bounds and what happens past them, (b) hold-
        to-repeat behavior, (c) editable text middle vs read-only, (d) haptic on
        each tick, (e) is this distinct from quantity-slider or replaces it?
      </Note>
    </Section>
  );
}

/* ========================================================================== */
/*  slideButton — Linked                                                      */
/* ========================================================================== */

function SlideButtonSection() {
  return (
    <Section
      id="slide-button"
      title="slideButton"
      figmaNode="997:3096"
      status="linked"
      description="Slide-to-confirm. Drag the green knob right past 72% of the track to commit. Full implementation lives in components/ui/slide-to-confirm.tsx and is showcased at /components/slide-to-confirm."
    >
      <Variants>
        <div className="w-full max-w-[400px]">
          <div
            className="relative flex h-20 items-center rounded-[20px] px-1"
            style={{ background: "#000" }}
          >
            <div
              className="flex h-[72px] items-center justify-center rounded-[16px]"
              style={{ width: 160, background: "#ADD010" }}
            >
              <ArrowRight size={22} weight="bold" color="#000" />
            </div>
            <span
              className="absolute inset-y-0 right-6 flex items-center text-white"
              style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0.4 }}
            >
              Desliza para confirmar
            </span>
          </div>
        </div>
      </Variants>
      <Code>{`import { SlideToConfirm } from "@/components/ui/slide-to-confirm";

<SlideToConfirm
  isArmed
  label="Crear usuario"
  onConfirm={() => createUser()}
  onReset={() => setArmed(false)}
  successHoldMs={700}
/>`}</Code>
    </Section>
  );
}

/* ========================================================================== */
/*  summaryCard — Flat                                                        */
/* ========================================================================== */

function SummaryCardSection() {
  return (
    <Section
      id="summary-card"
      title="summaryCard"
      figmaNode="1027:3998"
      status="flat"
      description="A read-only summary card — likely the 'review your input' step before a slide-to-confirm. Structure unknown without more screens."
    >
      <Variants>
        <div className="w-[320px] rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <div
            className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider"
            style={{ color: "#5D636C" }}
          >
            <Sparkle size={14} weight="fill" color="#ADD010" />
            Resumen
          </div>
          <div className="mt-3 space-y-2">
            {[
              ["Trabajador", "Juan Pérez"],
              ["Área", "Producción"],
              ["Rol", "Ingeniero"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <span style={{ fontSize: 13, color: "#5D636C" }}>{k}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#000" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-black/5 pt-3">
            <span style={{ fontSize: 11, color: "#AAAFB6" }}>
              Toca para editar antes de confirmar
            </span>
          </div>
        </div>
      </Variants>
      <Note>
        Need spec for: (a) total/footer line (cost? duration? user count?), (b)
        edit affordance — does tapping a row open it, or is there a dedicated
        Edit button?, (c) does this co-exist with a Confirm button or always sit
        above slideButton?
      </Note>
    </Section>
  );
}

/* ========================================================================== */
/*  progressBar — Flat                                                        */
/* ========================================================================== */

function ProgressBarSection() {
  return (
    <Section
      id="progress-bar"
      title="progressBar"
      figmaNode="801:3386"
      status="flat"
      description="Linear progress indicator — likely used in multi-step forms or upload flows."
    >
      <Variants>
        <div className="flex w-full flex-col gap-3">
          {[0.25, 0.6, 1].map((pct, i) => (
            <div
              key={i}
              className="h-2 w-full overflow-hidden rounded-full"
              style={{ background: "#EBEBEB" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct * 100}%`,
                  background: i === 2 ? "#88A024" : "#ADD010",
                  transition: "width 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>
          ))}
        </div>
      </Variants>
      <Note>
        Need spec for: (a) determinate vs indeterminate (animated stripe?), (b)
        height — 2px from Figma but check at the source, (c) does it have an
        end-state success color, (d) labels above/below the bar?, (e) integrate
        with the multi-step sheet flow.
      </Note>
    </Section>
  );
}
