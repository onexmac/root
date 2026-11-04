import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";
import { SearchBar } from "../react/SearchBar/SearchBar";
import { TabsMenu, FilterBar, TabFilterChip } from "../react/TabsMenu/TabsMenu";
import { ToggleCards } from "../react/ToggleCards/ToggleCards";
import { SelectionDropdown } from "../react/SelectionDropdown/SelectionDropdown";
import { NavigationControls, FilterOptions, ToggleMenu } from "../react/Nav/Nav";
import { NavAnnotation, NavStateLabel, NavSection } from "./helpers";

const meta: Meta = {
  title: "Nav",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  name: "Overview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{
      background:  "var(--ds-color-surface)",
      padding:     "54px 48px 120px",
      fontFamily:  "var(--ds-font-family)",
      minHeight:   "100vh",
      position:    "relative",
      boxSizing:   "border-box",
    }}>
      <div style={{
        position:        "absolute",
        top:             20,
        right:           20,
        writingMode:     "vertical-rl",
        textOrientation: "mixed",
        transform:       "rotate(180deg)",
        fontSize:        10,
        fontWeight:      600,
        letterSpacing:   "0.4px",
        lineHeight:      1.4,
        textAlign:       "center",
        color:           "var(--ds-color-black)",
      }}>
        {"01.00\nversion"}
      </div>

      <h1 style={{
        fontSize:      32,
        fontWeight:    600,
        lineHeight:    "40px",
        letterSpacing: "0.4px",
        margin:        "0 0 72px 0",
        color:         "var(--ds-color-black)",
      }}>
        NAVIGATION
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>

        {/* ── 1. searchBar ─────────────────────────────────────────────── */}
        <NavSection name="searchBar" desc="This is search bar">
          <div>
            <SearchBar layout="label" value="LADRILLO" />
            <NavStateLabel text="layout: label / state: standard" />
          </div>
          <div>
            <SearchBar layout="normal" />
            <NavStateLabel text="layout: normal / state: standard" />
          </div>
          <div>
            <SearchBar layout="icon" />
            <NavStateLabel text="layout: icon / state: standard" />
          </div>
          <div>
            <SearchBar layout="icon" state="pressed" />
            <NavStateLabel text="layout: icon / state: pressed" />
          </div>
          <div>
            <SearchBar
              layout="expanded"
              value="LADRILLO"
              suggestions={[
                { id: 1, name: "LADRILLO TIPO A" },
                { id: 2, name: "LADRILLO TIPO B" },
              ]}
            />
            <NavStateLabel text="layout: expanded / state: standard" />
          </div>
        </NavSection>

        {/* ── 2. tabsMenu ──────────────────────────────────────────────── */}
        <NavSection name="tabsMenu" desc="This is a tabs">
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Boleta"   layout="label+icon" icon="boleta"  state="standard" />
              <TabsMenu label="Traslado" layout="label+icon" icon="traslado" state="standard" />
              <TabsMenu label="Entrega"  layout="label+icon" icon="entrega"  state="standard" />
            </div>
            <NavStateLabel text="layout: label+icon / state: standard / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Boleta"   layout="label+icon" icon="boleta"  state="pressed" />
              <TabsMenu label="Traslado" layout="label+icon" icon="traslado" state="standard" />
              <TabsMenu label="Entrega"  layout="label+icon" icon="entrega"  state="standard" />
            </div>
            <NavStateLabel text="layout: label+icon / state: pressed / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Opción 1" layout="label" state="standard" />
              <TabsMenu label="Opción 2" layout="label" state="standard" />
              <TabsMenu label="Opción 3" layout="label" state="standard" />
            </div>
            <NavStateLabel text="layout: label / state: standard / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Opción 1" layout="label" state="pressed" />
              <TabsMenu label="Opción 2" layout="label" state="standard" />
              <TabsMenu label="Opción 3" layout="label" state="standard" />
            </div>
            <NavStateLabel text="layout: label / state: pressed / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", opacity: 0.4 }}>
              <TabsMenu label="Opción 1" layout="label" state="standard" />
              <TabsMenu label="Opción 2" layout="label" state="standard" />
              <TabsMenu label="Opción 3" layout="label" state="standard" />
            </div>
            <NavStateLabel text="layout: label / mode: disabled" />
          </div>
        </NavSection>

        {/* ── 3. toggleCards ───────────────────────────────────────────── */}
        <NavSection name="toggleCards" desc="This is a toggle cards">
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="big" mode="normal" visibility="open" />
              <ToggleCards size="big" mode="normal" visibility="open" />
              <ToggleCards size="big" mode="normal" visibility="open" />
              <ToggleCards size="big" mode="normal" visibility="open" />
            </div>
            <NavStateLabel text="size: big / mode: normal / visibility: open / state: standard" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="big" mode="disabled" visibility="open" />
              <ToggleCards size="big" mode="disabled" visibility="open" />
              <ToggleCards size="big" mode="disabled" visibility="open" />
              <ToggleCards size="big" mode="disabled" visibility="open" />
            </div>
            <NavStateLabel text="size: big / mode: disabled / visibility: open" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="small" mode="normal" visibility="open" />
              <ToggleCards size="small" mode="normal" visibility="open" />
              <ToggleCards size="small" mode="normal" visibility="open" />
              <ToggleCards size="small" mode="normal" visibility="open" />
            </div>
            <NavStateLabel text="size: small / mode: normal / state: standard" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="small" mode="disabled" visibility="open" />
              <ToggleCards size="small" mode="disabled" visibility="open" />
              <ToggleCards size="small" mode="disabled" visibility="open" />
              <ToggleCards size="small" mode="disabled" visibility="open" />
            </div>
            <NavStateLabel text="size: small / mode: disabled" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="big" mode="normal" visibility="close" />
              <ToggleCards size="big" mode="normal" visibility="close" />
            </div>
            <NavStateLabel text="size: big / visibility: close" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="small" mode="normal" visibility="close" />
              <ToggleCards size="small" mode="normal" visibility="close" />
            </div>
            <NavStateLabel text="size: small / visibility: close" />
          </div>
        </NavSection>

        {/* ── 4. toggleMenu ────────────────────────────────────────────── */}
        <NavSection name="toggleMenu" desc="This is a toggle menu">
          <div>
            <ToggleMenu mode="open" state="standard" />
            <NavStateLabel text="mode: open / state: standard" />
          </div>
          <div>
            <ToggleMenu mode="open" state="pressed" />
            <NavStateLabel text="mode: open / state: pressed" />
          </div>
          <div>
            <ToggleMenu mode="close" state="standard" />
            <NavStateLabel text="mode: close / state: standard" />
          </div>
          <div>
            <ToggleMenu mode="close" state="pressed" />
            <NavStateLabel text="mode: close / state: pressed" />
          </div>
        </NavSection>

        {/* ── 5. navigationControls ────────────────────────────────────── */}
        <NavSection name="navigationControls" desc="This is a navigation controls">
          <div>
            <NavigationControls navigation="back" state="standard" />
            <NavStateLabel text="navigation: back / state: standard" />
          </div>
          <div>
            <NavigationControls navigation="back" state="pressed" />
            <NavStateLabel text="navigation: back / state: pressed" />
          </div>
          <div>
            <NavigationControls navigation="go" state="standard" />
            <NavStateLabel text="navigation: go / state: standard" />
          </div>
          <div>
            <NavigationControls navigation="go" state="pressed" />
            <NavStateLabel text="navigation: go / state: pressed" />
          </div>
        </NavSection>

        {/* ── 6. filterOptions ─────────────────────────────────────────── */}
        <NavSection name="filterOptions" desc="This is a filter options">
          <div>
            <FilterOptions mode="normal" state="standard" />
            <NavStateLabel text="mode: normal / state: standard" />
          </div>
          <div>
            <FilterOptions mode="normal" state="pressed" />
            <NavStateLabel text="mode: normal / state: pressed" />
          </div>
          <div>
            <FilterOptions mode="close" state="standard" />
            <NavStateLabel text="mode: close / state: standard" />
          </div>
        </NavSection>

        {/* ── 7. tabFilterBar ──────────────────────────────────────────── */}
        <NavSection name="tabFilterBar" desc="This is a tab filter bar">
          <div>
            <TabFilterChip label="Aprobado" state="active" icon="completado" />
            <NavStateLabel text="state: active" />
          </div>
          <div>
            <TabFilterChip label="Pendiente" state="disabled" icon="sin-autorizar" />
            <NavStateLabel text="state: disabled" />
          </div>
        </NavSection>

        {/* ── 8. filterBar ─────────────────────────────────────────────── */}
        <NavSection name="filterBar" desc="This is a filter bar">
          <div>
            <FilterBar chips={[
              { label: "Aprobado",  state: "active",   icon: "completado"    },
              { label: "Denegado",  state: "disabled", icon: "sin-stock"     },
              { label: "Pendiente", state: "disabled", icon: "sin-autorizar" },
            ]} />
            <NavStateLabel text="state: standard" />
          </div>
        </NavSection>

        {/* ── 9. selectionDropdown ─────────────────────────────────────── */}
        <NavSection name="selectionDropdown" desc="This is a drop down">
          <div>
            <SelectionDropdown label="Tipo de material" />
            <NavStateLabel text="state: compressed" />
          </div>
          <div>
            <SelectionDropdown
              label="Tipo de material"
              isOpen={true}
              items={[
                { label: "Ladrillo" },
                { label: "Bloque" },
                { label: "Cerámica" },
              ]}
            />
            <NavStateLabel text="state: expanded" />
          </div>
        </NavSection>

      </div>
    </div>
  ),
};
