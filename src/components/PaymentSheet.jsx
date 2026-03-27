import { useState } from 'react'
import { T, fmt } from '../lib/design'
import { Btn, Input } from './UI'

export function PaymentSheet({ total, onSuccess, onClose }) {
  const [method, setMethod] = useState(null)
  const [step, setStep] = useState("choose")
  const [cash, setCash] = useState("")

  const change = cash && parseFloat(cash) >= total ? fmt(parseFloat(cash) - total) : null

  const pay = () => {
    if (!method) return
    if (method === "cash") {
      setStep("cash")
      return
    }
    if (method === "counter") {
      onSuccess("counter")
      return
    }
    setStep("processing")
    setTimeout(() => setStep("done"), 2000)
  }

  const METHODS = [
    { id: "qr", icon: "📱", label: "QR / Bancontact" },
    { id: "card", icon: "💳", label: "Visa / Mastercard" },
    { id: "cash", icon: "💶", label: "Espèces" },
    { id: "counter", icon: "🏪", label: "Au comptoir" },
  ]

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.5)",
          backdropFilter: "blur(4px)"
        }}
        onClick={step === "choose" ? onClose : undefined}
      />
      <div
        style={{
          position: "relative",
          background: T.surface,
          borderRadius: "20px 20px 0 0",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp .35s ease"
        }}
      >
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
                color: step === "done" ? T.green : T.black
              }}
            >
              {step === "done" ? "✅ Paiement confirmé" : "💳 Paiement"}
            </div>
            <div style={{ fontSize: "0.78rem", color: T.gray400, marginTop: 2 }}>
              Total : <strong style={{ color: T.red, fontSize: "1rem" }}>{fmt(total)}</strong>
            </div>
          </div>
          {step === "choose" && (
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
                color: T.gray600
              }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ overflowY: "auto", padding: "20px", flex: 1 }}>
          {/* CHOOSE */}
          {step === "choose" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className="press-scale"
                    style={{
                      background: method === m.id ? T.black : T.bg,
                      color: method === m.id ? "#fff" : T.black,
                      border: `2px solid ${method === m.id ? T.black : T.border}`,
                      borderRadius: 14,
                      padding: "16px 12px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all .18s"
                    }}
                  >
                    <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.82rem" }}>{m.label}</div>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn ch="Retour" onClick={onClose} variant="ghost" style={{ flex: 1 }} />
                <Btn
                  ch={method === "counter" ? "Confirmer" : `Payer ${fmt(total)}`}
                  onClick={pay}
                  variant="red"
                  style={{ flex: 2 }}
                  disabled={!method}
                />
              </div>
            </>
          )}

          {/* CASH */}
          {step === "cash" && (
            <>
              <div
                style={{
                  background: T.bg,
                  borderRadius: 14,
                  padding: "16px",
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    color: T.gray600,
                    fontSize: "0.82rem",
                    textTransform: "uppercase",
                    letterSpacing: ".05em"
                  }}
                >
                  Montant dû
                </span>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "2rem",
                    color: T.red
                  }}
                >
                  {fmt(total)}
                </span>
              </div>
              <Input
                label="Montant remis (€)"
                value={cash}
                onChange={e => setCash(e.target.value)}
                placeholder="ex: 20.00"
                type="number"
              />
              {change && (
                <div
                  style={{
                    background: T.greenBg,
                    border: `1px solid ${T.green}40`,
                    borderRadius: 12,
                    padding: "14px 16px",
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span style={{ fontWeight: 600, color: T.gray600, fontSize: "0.82rem" }}>
                    Monnaie à rendre
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.8rem",
                      color: T.green
                    }}
                  >
                    {change}
                  </span>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                {[10, 15, 20, 50].map(a => (
                  <button
                    key={a}
                    onClick={() => setCash(a.toString())}
                    style={{
                      flex: 1,
                      minWidth: 60,
                      background: T.bg,
                      border: `1.5px solid ${T.border}`,
                      borderRadius: 10,
                      padding: "10px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer"
                    }}
                    className="press-scale"
                  >
                    €{a}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn ch="← Retour" onClick={() => setStep("choose")} variant="ghost" style={{ flex: 1 }} />
                <Btn
                  ch="✓ Valider"
                  onClick={() => {
                    if (cash && parseFloat(cash) >= total) setStep("done")
                  }}
                  variant="green"
                  style={{ flex: 2 }}
                  disabled={!cash || parseFloat(cash) < total}
                />
              </div>
            </>
          )}

          {/* PROCESSING */}
          {step === "processing" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: 16,
                  display: "inline-block",
                  animation: "spin 1s linear infinite"
                }}
              >
                ⚙️
              </div>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.3rem",
                  color: T.black
                }}
              >
                Traitement…
              </div>
            </div>
          )}

          {/* DONE */}
          {step === "done" && (
            <>
              <div
                style={{
                  background: `linear-gradient(135deg, ${T.green}, ${T.greenMid})`,
                  borderRadius: 16,
                  padding: "36px 24px",
                  textAlign: "center",
                  marginBottom: 20
                }}
              >
                <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>✅</div>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.6rem",
                    color: "#fff",
                    marginBottom: 8
                  }}
                >
                  Paiement accepté !
                </div>
                <div style={{ color: "rgba(255,255,255,.7)", fontSize: "0.88rem" }}>
                  Merci pour votre visite 🍕
                </div>
              </div>
              <Btn
                ch="Fermer"
                onClick={() => onSuccess(method || "card")}
                variant="black"
                full
                size="lg"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
