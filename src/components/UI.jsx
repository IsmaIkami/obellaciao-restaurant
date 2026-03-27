import { T, sx } from '../lib/design'

// Primary button
export const Btn = ({ ch, onClick, variant = "red", size = "md", full = false, icon, disabled = false, style = {} }) => {
  const vars = {
    red: { bg: T.red, color: "#fff", border: "none" },
    green: { bg: T.green, color: "#fff", border: "none" },
    black: { bg: T.black, color: "#fff", border: "none" },
    ghost: { bg: "transparent", color: T.black, border: `1.5px solid ${T.border}` },
    amber: { bg: T.amber, color: "#fff", border: "none" },
  }
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "0.72rem" },
    md: { padding: "12px 22px", fontSize: "0.78rem" },
    lg: { padding: "15px 28px", fontSize: "0.85rem" }
  }
  const v = vars[variant] || vars.red
  const s = sizes[size] || sizes.md

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="press-scale"
      style={sx({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: disabled ? T.gray200 : v.bg,
        color: disabled ? T.gray400 : v.color,
        border: v.border,
        borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: ".01em",
        cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto",
        transition: "opacity .15s, transform .1s",
        ...s,
        ...style
      })}
    >
      {icon && <span>{icon}</span>}
      {ch}
    </button>
  )
}

// Badge pill
export const Badge = ({ label, color = T.green, bg }) => (
  <span
    style={{
      background: bg || color + "20",
      color,
      border: `1px solid ${color}30`,
      borderRadius: 99,
      padding: "3px 10px",
      fontSize: "0.68rem",
      fontWeight: 600,
      fontFamily: "'DM Sans', sans-serif",
      whiteSpace: "nowrap",
      letterSpacing: ".01em"
    }}
  >
    {label}
  </span>
)

// Card
export const Card = ({ ch, style = {} }) => (
  <div
    style={sx({
      background: T.surface,
      borderRadius: 16,
      border: `1px solid ${T.border}`,
      overflow: "hidden"
    }, style)}
  >
    {ch}
  </div>
)

// Section title
export const STitle = ({ ch, sub, center = false }) => (
  <div style={{ textAlign: center ? "center" : "left", marginBottom: 24 }}>
    <h2
      style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
        color: T.black,
        lineHeight: 1.1,
        marginBottom: sub ? 8 : 0
      }}
    >
      {ch}
    </h2>
    {sub && (
      <p style={{ fontSize: "1rem", color: T.gray600, fontWeight: 300, lineHeight: 1.6 }}>
        {sub}
      </p>
    )}
  </div>
)

// Input
export const Input = ({ label, value, onChange, placeholder, type = "text", rows, style = {} }) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <label
        style={{
          display: "block",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: T.gray600,
          marginBottom: 6,
          letterSpacing: ".03em",
          textTransform: "uppercase"
        }}
      >
        {label}
      </label>
    )}
    {rows ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={sx({
          width: "100%",
          background: T.bg,
          border: `1.5px solid ${T.border}`,
          color: T.black,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.95rem",
          padding: "12px 14px",
          borderRadius: 10,
          resize: "none",
          outline: "none"
        }, style)}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={sx({
          width: "100%",
          background: T.bg,
          border: `1.5px solid ${T.border}`,
          color: T.black,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.95rem",
          padding: "12px 14px",
          borderRadius: 10,
          outline: "none"
        }, style)}
      />
    )}
  </div>
)

// Divider
export const Div = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
    <div style={{ flex: 1, height: 1, background: T.border }} />
    {label && (
      <span
        style={{
          fontSize: "0.72rem",
          color: T.gray400,
          fontWeight: 500,
          whiteSpace: "nowrap"
        }}
      >
        {label}
      </span>
    )}
    <div style={{ flex: 1, height: 1, background: T.border }} />
  </div>
)
