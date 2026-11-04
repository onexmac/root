import React from "react";

/** Annotation label on the right side of a section */
export function NavAnnotation({ name, desc }: { name: string; desc: string }) {
  return (
    <div style={{ minWidth: 160, textAlign: "right", flexShrink: 0, paddingTop: 4 }}>
      <div style={{
        fontSize:      14,
        fontWeight:    600,
        letterSpacing: "0.4px",
        color:         "var(--ds-color-black)",
        lineHeight:    "20px",
        fontFamily:    "inherit",
      }}>{name}</div>
      <div style={{
        fontSize:   14,
        fontWeight: 400,
        color:      "var(--ds-color-gray-500)",
        lineHeight: "20px",
        fontFamily: "inherit",
      }}>{desc}</div>
    </div>
  );
}

/** Small state caption below a component demo */
export function NavStateLabel({ text }: { text: string }) {
  return (
    <span style={{
      display:    "block",
      fontSize:   12,
      fontWeight: 400,
      color:      "var(--ds-color-gray-500)",
      lineHeight: "20px",
      marginTop:  6,
      fontFamily: "inherit",
    }}>{text}</span>
  );
}

/** Row layout: component demos on the left, annotation on the right */
export function NavSection({ name, desc, children }: {
  name: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 48 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
        {children}
      </div>
      <NavAnnotation name={name} desc={desc} />
    </div>
  );
}
