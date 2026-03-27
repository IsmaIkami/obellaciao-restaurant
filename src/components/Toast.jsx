import { useState } from 'react'
import { T } from '../lib/design'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const show = (msg, type = "ok") => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200)
  }

  const ToastContainer = () => (
    <div
      style={{
        position: "fixed",
        top: 72,
        right: 16,
        left: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none"
      }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          style={{
            background: t.type === "err" ? T.red : t.type === "warn" ? T.amber : T.black,
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 500,
            boxShadow: "0 8px 32px rgba(0,0,0,.15)",
            animation: "slideUp .3s ease",
            display: "flex",
            alignItems: "center",
            gap: 10
          }}
        >
          <span>{t.type === "err" ? "❌" : t.type === "warn" ? "⚠️" : "✅"}</span>
          {t.msg}
        </div>
      ))}
    </div>
  )

  return { show, ToastContainer }
}
