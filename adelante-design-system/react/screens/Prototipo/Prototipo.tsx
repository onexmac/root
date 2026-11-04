import React, { useState } from "react";
import { Usuarios } from "../Usuarios/Usuarios";
import { RolesV2 } from "../RolesV2/RolesV2";

export type PrototipoScreen = "usuarios" | "roles";

interface PrototipoProps {
  initialScreen?: PrototipoScreen;
  /** Pasa props a Usuarios cuando arranca en esa pantalla (ej. stepperFooter). */
  usuariosProps?: Omit<
    React.ComponentProps<typeof Usuarios>,
    "onNavigate" | "currentScreen"
  >;
  /** Pasa props a RolesV2 cuando arranca en esa pantalla. */
  rolesProps?: Omit<
    React.ComponentProps<typeof RolesV2>,
    "onNavigate" | "currentScreen"
  >;
}

/**
 * Prototipo unificado — combina Usuarios + RolesV2 en una sola experiencia
 * navegable. El sidebar de cada pantalla cambia entre ambas vía onNavigate.
 * Los roles asignados en Usuarios.UsuarioTab vienen de la lista compartida
 * (RolesV2/mock-data ROLE_GROUPS).
 */
export function Prototipo({
  initialScreen = "usuarios",
  usuariosProps = {},
  rolesProps = {},
}: PrototipoProps = {}) {
  const [screen, setScreen] = useState<PrototipoScreen>(initialScreen);
  // Estado del sidebar lifted al wrapper → se preserva al navegar entre Usuarios/Roles.
  // Default: cerrado (collapsed), igual que RolesV2 por defecto.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((v) => !v);

  if (screen === "roles") {
    return (
      <RolesV2
        {...rolesProps}
        currentScreen="roles"
        onNavigate={setScreen}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={toggleSidebar}
      />
    );
  }
  return (
    <Usuarios
      {...usuariosProps}
      currentScreen="usuarios"
      onNavigate={setScreen}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={toggleSidebar}
    />
  );
}
