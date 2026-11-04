/**
 * Losa Flotante storybook — force LIGHT tokens regardless of system theme.
 * Same pattern as /control-usuarios. See DESIGN.md §3.1.
 */

export default function LosaFlotanteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="losa-scope"
      style={
        {
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
