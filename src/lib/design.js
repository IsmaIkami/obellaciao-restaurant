// Design System — Modern Italian Palette
export const T = {
  // Neutrals
  black: "#0D0D0D",
  dark: "#1A1A1A",
  gray800: "#2C2C2C",
  gray600: "#4A4A4A",
  gray400: "#8A8A8A",
  gray200: "#D4D4D0",
  gray100: "#EBEBEB",
  white: "#FAFAF7",
  // Brand
  red: "#E63946",
  redDark: "#C1121F",
  redBg: "#FFF0F0",
  green: "#2D6A4F",
  greenMid: "#40916C",
  greenBg: "#F0FAF4",
  amber: "#F4A261",
  amberDk: "#E76F51",
  amberBg: "#FFF8F0",
  blue: "#2563EB",
  blueBg: "#EFF6FF",
  // Surfaces
  surface: "#FFFFFF",
  bg: "#F5F5F2",
  border: "#E8E8E4",
}

export const FONT_URL = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"

export const ORDER_STATUS = {
  received: { label: "Reçu", color: T.amber, bg: T.amberBg, next: "preparing", nLabel: "→ En prépa" },
  preparing: { label: "En prépa", color: T.blue, bg: T.blueBg, next: "ready", nLabel: "→ Prêt ✓" },
  ready: { label: "Prêt ✓", color: T.green, bg: T.greenBg, next: null },
}

// Utility functions
export const fmt = (n) => "€" + n.toFixed(2).replace(".", ",")
export const genId = () => "#OBC-" + (Math.floor(Math.random() * 9000) + 1000)
export const nowT = () => new Date().toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" })
export const sx = (...args) => Object.assign({}, ...args)
