/**
 * Control-usuarios prototype routes — force LIGHT token values regardless of
 * system theme, so the surface matches the Figma H4 file (Losa Flotante).
 * Token overrides scoped to this wrapper; adelante's own dark mode still
 * works elsewhere in the app.
 */

export default function ControlUsuariosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="losa-scope"
      style={
        {
          // Override token vars AND set explicit color/background so the
          // inherited cascade picks up the light values even when `.dark`
          // is on <html> (which sets body color: rgb(244 244 244)).
          "--surface-bg": "243 243 243",
          "--surface-card": "255 255 255",
          "--surface-card-muted": "235 235 235",
          "--fg-primary": "17 17 17",
          "--fg-secondary": "115 115 115",
          "--color-background": "rgb(243, 243, 243)",
          "--color-card": "rgb(255, 255, 255)",
          "--color-card-muted": "rgb(235, 235, 235)",
          "--color-foreground": "rgb(17, 17, 17)",
          "--color-muted-foreground": "rgb(115, 115, 115)",
          color: "rgb(17, 17, 17)",
          background: "rgb(243, 243, 243)",
          minHeight: "100vh",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
