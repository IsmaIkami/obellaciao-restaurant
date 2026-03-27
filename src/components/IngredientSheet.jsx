import { useState } from 'react'
import { T, fmt } from '../lib/design'
import { Btn, Input } from './UI'

export function IngredientSheet({ item, onConfirm, onClose }) {
  const [removed, setRemoved] = useState([])
  const [note, setNote] = useState("")

  const toggle = (ing) => setRemoved(p => p.includes(ing) ? p.filter(x => x !== ing) : [...p, ing])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.5)",
          backdropFilter: "blur(4px)"
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "relative",
          background: T.surface,
          borderRadius: "20px 20px 0 0",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -20px 60px rgba(0,0,0,.2)",
          animation: "slideUp .35s ease"
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: 40,
            height: 4,
            background: T.gray200,
            borderRadius: 2,
            margin: "12px auto 0"
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.2rem",
                color: T.black
              }}
            >
              {item.emoji} {item.name}
            </div>
            <div style={{ fontSize: "0.78rem", color: T.gray400, marginTop: 2 }}>
              Retirez les ingrédients indésirables
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: T.gray100,
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.gray600
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: "auto", padding: "16px 20px", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {item.ingredients.map(ing => {
              const out = removed.includes(ing)
              return (
                <button
                  key={ing}
                  onClick={() => toggle(ing)}
                  className="press-scale"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 16px",
                    background: out ? T.redBg : T.bg,
                    border: `1.5px solid ${out ? T.red : T.border}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all .15s"
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: out ? "transparent" : T.green,
                      border: `2px solid ${out ? T.red : T.green}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all .15s"
                    }}
                  >
                    {!out && <span style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 700 }}>✓</span>}
                    {out && <span style={{ color: T.red, fontSize: "0.8rem", fontWeight: 700 }}>✕</span>}
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: out ? 400 : 500,
                      color: out ? T.red : T.black,
                      textDecoration: out ? "line-through" : "none",
                      flex: 1
                    }}
                  >
                    {ing}
                  </span>
                  {out && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: T.red,
                        textTransform: "uppercase",
                        letterSpacing: ".05em"
                      }}
                    >
                      Retiré
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <Input
            label="Note spéciale"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Ex: bien cuit, sans sel..."
            rows={2}
          />

          {removed.length > 0 && (
            <div
              style={{
                background: T.redBg,
                border: `1px solid ${T.red}30`,
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 16
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: T.red,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: ".05em"
                }}
              >
                Sans :
              </div>
              <div style={{ fontSize: "0.88rem", color: T.red }}>
                {removed.join(" · ")}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${T.border}` }}>
          <Btn
            ch={`Ajouter — ${fmt(item.price)}`}
            onClick={() => onConfirm(removed, note)}
            variant="red"
            full
            size="lg"
          />
        </div>
      </div>
    </div>
  )
}
