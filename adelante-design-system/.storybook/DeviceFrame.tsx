import React from "react";

// ─── Phone Frame (iPhone 16 style) ────────────────────────────────────────────

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex",
      flexDirection: "column",
      background: "#1a1a1a",
      borderRadius: "48px",
      padding: "14px",
      boxShadow: `
        0 0 0 1px #3a3a3a,
        0 0 0 3px #1a1a1a,
        0 30px 80px rgba(0,0,0,0.5),
        inset 0 0 0 1px #444
      `,
      position: "relative",
    }}>
      {/* Side buttons */}
      <div style={{ position: "absolute", left: "-3px", top: "100px", width: "3px", height: "36px", background: "#333", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: "-3px", top: "148px", width: "3px", height: "64px", background: "#333", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: "-3px", top: "224px", width: "3px", height: "64px", background: "#333", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", right: "-3px", top: "160px", width: "3px", height: "80px", background: "#333", borderRadius: "0 2px 2px 0" }} />

      {/* Screen */}
      <div style={{
        width: "393px",
        height: "852px",
        background: "#f3f3f3",
        borderRadius: "38px",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "34px",
          background: "#000",
          borderRadius: "20px",
          zIndex: 10,
        }} />

        {/* Content */}
        <div style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </div>

        {/* Home indicator */}
        <div style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "5px",
          background: "#000",
          borderRadius: "3px",
          opacity: 0.3,
          zIndex: 10,
        }} />
      </div>
    </div>
  );
}

// ─── Tablet Frame (iPad style) ────────────────────────────────────────────────

export function TabletFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex",
      flexDirection: "column",
      background: "#1a1a1a",
      borderRadius: "28px",
      padding: "18px 24px",
      boxShadow: `
        0 0 0 1px #3a3a3a,
        0 30px 80px rgba(0,0,0,0.4),
        inset 0 0 0 1px #444
      `,
      position: "relative",
    }}>
      {/* Camera */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#2a2a2a",
        border: "1px solid #444",
      }} />

      {/* Screen */}
      <div style={{
        width: "820px",
        height: "1180px",
        background: "#f3f3f3",
        borderRadius: "12px",
        overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── Desktop / Browser Frame ──────────────────────────────────────────────────

export function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex",
      flexDirection: "column",
      background: "#d0d0d0",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Browser Chrome */}
      <div style={{
        background: "#e8e8e8",
        padding: "10px 16px 0",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "2px" }}>
          <div style={{
            background: "#f3f3f3",
            borderRadius: "8px 8px 0 0",
            padding: "6px 20px",
            fontSize: "12px",
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "200px",
          }}>
            <div style={{ width: 14, height: 14, background: "#add010", borderRadius: "3px" }} />
            Adelante · Registro de Boletas
          </div>
        </div>
      </div>

      {/* URL bar */}
      <div style={{
        background: "#f3f3f3",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid #ddd",
      }}>
        {/* Nav arrows */}
        <div style={{ display: "flex", gap: "8px" }}>
          {["←", "→", "↻"].map((s, i) => (
            <div key={i} style={{ fontSize: "14px", color: "#888", cursor: "default", userSelect: "none" }}>{s}</div>
          ))}
        </div>

        {/* Address bar */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "20px",
          padding: "4px 14px",
          fontSize: "12px",
          color: "#555",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <span style={{ color: "#28c840", fontSize: "10px" }}>🔒</span>
          adelante-web.vercel.app
        </div>
      </div>

      {/* Viewport */}
      <div style={{
        width: "1366px",
        height: "768px",
        background: "#f3f3f3",
        overflow: "auto",
      }}>
        {children}
      </div>
    </div>
  );
}
