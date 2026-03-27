import { useState } from 'react'
import { T, fmt, genId, nowT } from '../lib/design'
import { Btn, STitle, Input } from '../components/UI'
import { useToast } from '../components/Toast'
import { MenuBrowser } from '../components/MenuBrowser'
import { CartItem } from '../components/CartItem'
import { PaymentSheet } from '../components/PaymentSheet'
import { db } from '../lib/supabase'
import { TIME_SLOTS, BUSY_SLOTS } from '../data/menu'

export function ClientView({ onSwitchMode }) {
  const [view, setView] = useState("home")
  const [cart, setCart] = useState([])
  const [orderOpen, setOrderOpen] = useState(false)
  const toast = useToast()

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const addToCart = (item) => {
    setCart(p => {
      const ex = p.find(i => i.cartId === item.cartId)
      return ex ? p.map(i => i.cartId === item.cartId ? { ...i, qty: i.qty + 1 } : i) : [...p, item]
    })
    toast.show(`${item.emoji} ${item.name} ajouté`)
  }

  const changeQty = (cartId, d) =>
    setCart(p => p.map(i => i.cartId === cartId ? { ...i, qty: i.qty + d } : i).filter(i => i.qty > 0))

  const NAV = [
    { id: "home", icon: "🏠", label: "Accueil" },
    { id: "menu", icon: "🍕", label: "Menu" },
    { id: "cart", icon: "🛒", label: `Panier${cartCount > 0 ? ` (${cartCount})` : ""}`, badge: cartCount },
    { id: "resa", icon: "📅", label: "Réserver" },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        paddingBottom: 72,
        maxWidth: 480,
        margin: "0 auto",
        position: "relative"
      }}
    >
      <toast.ToastContainer />

      {/* Top Nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(250,250,247,.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.border}`,
          padding: "0 20px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: T.black }}>
          O <em style={{ color: T.red }}>Bella</em> Ciao
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => onSwitchMode("server")}
            style={{
              background: T.gray100,
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: T.gray600,
              cursor: "pointer"
            }}
          >
            Mode Serveur
          </button>
          <button
            onClick={() => onSwitchMode("admin")}
            style={{
              background: T.black,
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Home View */}
      {view === "home" && (
        <div style={{ padding: "0 20px" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${T.black} 0%, ${T.gray800} 100%)`,
              borderRadius: 24,
              padding: "36px 24px",
              margin: "20px 0",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 140,
                height: 140,
                background: T.red,
                borderRadius: "50%",
                opacity: 0.15
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: T.amber,
                  marginBottom: 10
                }}
              >
                Sterrebeek · Belgique
              </div>
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "2.5rem",
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: 6
                }}
              >
                O <em style={{ color: T.red }}>Bella</em><br />Ciao
              </h1>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,.6)",
                  marginBottom: 24,
                  lineHeight: 1.5
                }}
              >
                La vera pizza napoletana<br />à Sterrebeek depuis 2018
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn ch="🍕 Commander" onClick={() => setView("menu")} variant="red" size="md" />
                <Btn
                  ch="📅 Réserver"
                  onClick={() => setView("resa")}
                  variant="ghost"
                  style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
                />
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div style={{ background: T.surface, borderRadius: 16, padding: "20px", border: `1px solid ${T.border}`, marginBottom: 20 }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: T.black, marginBottom: 14 }}>
              ⏰ Horaires
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontWeight: 500, fontSize: "0.9rem", color: T.gray600 }}>Dim – Lun</span>
              <span style={{ fontWeight: 600, fontSize: "0.9rem", color: T.red }}>Fermé</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
              <span style={{ fontWeight: 500, fontSize: "0.9rem", color: T.gray600 }}>Mar – Sam</span>
              <span style={{ fontWeight: 600, fontSize: "0.9rem", color: T.green }}>9h–15h · 18h–22h</span>
            </div>
          </div>
        </div>
      )}

      {/* Menu View */}
      {view === "menu" && (
        <div style={{ padding: "16px 20px" }}>
          <STitle ch="Notre Carte" sub="Tapez sur un plat pour personnaliser les ingrédients" />
          <MenuBrowser onAdd={addToCart} compact />
        </div>
      )}

      {/* Cart View */}
      {view === "cart" && (
        <div style={{ padding: "16px 20px" }}>
          <STitle ch="Mon Panier" />
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🛒</div>
              <p style={{ color: T.gray400, marginBottom: 20 }}>Votre panier est vide</p>
              <Btn ch="Voir la carte" onClick={() => setView("menu")} variant="red" />
            </div>
          ) : (
            <>
              {cart.map(item => (
                <CartItem key={item.cartId} item={item} onQty={changeQty} />
              ))}
              <div
                style={{
                  marginTop: 16,
                  background: T.surface,
                  borderRadius: 14,
                  padding: "16px",
                  border: `1px solid ${T.border}`
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontWeight: 600,
                      color: T.gray600,
                      fontSize: "0.88rem",
                      textTransform: "uppercase",
                      letterSpacing: ".05em"
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.8rem",
                      color: T.red
                    }}
                  >
                    {fmt(cartTotal)}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <Btn ch="Modifier" onClick={() => setView("menu")} variant="ghost" style={{ flex: 1 }} />
                <Btn ch="Commander →" onClick={() => setOrderOpen(true)} variant="red" style={{ flex: 2 }} />
              </div>
            </>
          )}
        </div>
      )}

      {/* Reservation View */}
      {view === "resa" && (
        <div style={{ padding: "16px 20px" }}>
          <STitle ch="Réservation" sub="Confirmation immédiate par SMS" />
          <ReservationForm toast={toast} />
        </div>
      )}

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 480,
          background: "rgba(250,250,247,.97)",
          backdropFilter: "blur(12px)",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          zIndex: 200
        }}
      >
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => setView(n.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "10px 4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color .15s",
              position: "relative"
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{n.icon}</span>
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: view === n.id ? 700 : 400,
                color: view === n.id ? T.red : T.gray400,
                letterSpacing: ".03em"
              }}
            >
              {n.label}
            </span>
            {view === n.id && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 24,
                  height: 3,
                  background: T.red,
                  borderRadius: "0 0 4px 4px"
                }}
              />
            )}
            {n.badge > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  right: "25%",
                  width: 16,
                  height: 16,
                  background: T.red,
                  borderRadius: "50%",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {n.badge}
              </div>
            )}
          </button>
        ))}
      </div>

      {orderOpen && (
        <OrderFlow
          cart={cart}
          setCart={setCart}
          onClose={() => setOrderOpen(false)}
          onDone={() => {
            setView("home")
            setOrderOpen(false)
          }}
          toast={toast}
        />
      )}
    </div>
  )
}

// Reservation Form Component
function ReservationForm({ toast }) {
  const [done, setDone] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [guests, setGuests] = useState("2")
  const [date, setDate] = useState(() => {
    const t = new Date()
    t.setDate(t.getDate() + 1)
    return t.toISOString().split("T")[0]
  })
  const [slot, setSlot] = useState(null)
  const [note, setNote] = useState("")

  const handleSubmit = async () => {
    if (!name || !phone || !slot) {
      toast.show("Remplissez tous les champs", "err")
      return
    }

    try {
      await db.addReservation({
        name,
        phone,
        guests: parseInt(guests),
        date: "Auj.",
        time: slot,
        note,
        status: "confirmé",
        table_assigned: null,
        arrived: false
      })
      setDone(true)
      toast.show("✅ Réservation confirmée")
    } catch (error) {
      toast.show("Erreur lors de la réservation", "err")
    }
  }

  if (done) {
    return (
      <div
        style={{
          background: T.greenBg,
          borderRadius: 16,
          padding: "32px 20px",
          textAlign: "center",
          border: `1px solid ${T.green}30`
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.4rem",
            color: T.green,
            marginBottom: 10
          }}
        >
          Réservation confirmée !
        </div>
        <p style={{ color: T.gray600, marginBottom: 20 }}>
          {name} · {guests} pers. · {date} à {slot}
        </p>
        <Btn
          ch="Nouvelle réservation"
          onClick={() => {
            setDone(false)
            setName("")
            setPhone("")
            setSlot(null)
            setNote("")
          }}
          variant="green"
        />
      </div>
    )
  }

  return (
    <div>
      <Input label="Nom & Prénom" value={name} onChange={e => setName(e.target.value)} placeholder="ex: Marco Rossi" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+32 4XX…" />
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: T.gray600,
              marginBottom: 6,
              letterSpacing: ".03em",
              textTransform: "uppercase"
            }}
          >
            Couverts
          </label>
          <select
            value={guests}
            onChange={e => setGuests(e.target.value)}
            style={{
              width: "100%",
              background: T.bg,
              border: `1.5px solid ${T.border}`,
              color: T.black,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              padding: "12px 14px",
              borderRadius: 10,
              outline: "none"
            }}
          >
            {["1", "2", "3", "4", "5", "6", "7+"].map(g => (
              <option key={g} value={g}>
                {g} personne{g > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Input label="Date" value={date} onChange={e => setDate(e.target.value)} type="date" />
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: T.gray600,
            marginBottom: 8,
            letterSpacing: ".03em",
            textTransform: "uppercase"
          }}
        >
          Créneau horaire
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {TIME_SLOTS.map(s => {
            const busy = BUSY_SLOTS.includes(s)
            return (
              <button
                key={s}
                disabled={busy}
                onClick={() => setSlot(s)}
                className={busy ? "" : "press-scale"}
                style={{
                  padding: "10px 4px",
                  textAlign: "center",
                  borderRadius: 10,
                  border: `1.5px solid ${slot === s ? T.red : busy ? T.gray100 : T.border}`,
                  background: slot === s ? T.red : busy ? T.gray100 : "transparent",
                  color: slot === s ? "#fff" : busy ? T.gray300 : T.black,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: busy ? "not-allowed" : "pointer",
                  textDecoration: busy ? "line-through" : "none",
                  transition: "all .15s"
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>
      <Input
        label="Note (optionnel)"
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Anniversaire, allergie…"
        rows={2}
      />
      <Btn ch="Confirmer la réservation" onClick={handleSubmit} variant="red" full size="lg" />
    </div>
  )
}

// Order Flow Component
function OrderFlow({ cart, setCart, onClose, onDone, toast }) {
  const [step, setStep] = useState(1)
  const [otype, setOtype] = useState("pickup")
  const [slot, setSlot] = useState("19:00")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [payOpen, setPayOpen] = useState(false)
  const [orderId] = useState(genId())
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal

  const handlePaySuccess = async (method) => {
    try {
      await db.addOrder({
        order_id: orderId,
        name,
        phone,
        time: nowT(),
        type: otype,
        table_id: null,
        items: cart,
        status: "received",
        payment: method,
        slot,
        note
      })
      setPayOpen(false)
      setStep(3)
      toast.show("✅ Commande enregistrée")
    } catch (error) {
      toast.show("Erreur lors de la commande", "err")
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 7000,
        background: T.bg,
        display: "flex",
        flexDirection: "column",
        maxWidth: 480,
        margin: "0 auto",
        left: "50%",
        transform: "translateX(-50%)",
        right: "auto",
        width: "100%"
      }}
    >
      {/* Header */}
      <div
        style={{
          background: T.surface,
          padding: "16px 20px",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexShrink: 0
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: T.gray100,
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          className="press-scale"
        >
          ←
        </button>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", color: T.black }}>
          Finaliser la commande
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
          {[1, 2, 3].map(n => (
            <div
              key={n}
              style={{
                width: n === step ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: n <= step ? T.red : T.gray200,
                transition: "all .3s"
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {step === 1 && (
          <>
            <STitle ch="Livraison ou emporter ?" sub="Choisissez votre mode de réception" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                ["pickup", "🏃", "À emporter", "Venez chercher au restaurant"],
                ["delivery", "🛵", "Livraison", "Zone Sterrebeek +€2,50"]
              ].map(([v, ic, lbl, desc]) => (
                <button
                  key={v}
                  onClick={() => setOtype(v)}
                  className="press-scale"
                  style={{
                    background: otype === v ? T.black : T.surface,
                    border: `2px solid ${otype === v ? T.black : T.border}`,
                    borderRadius: 16,
                    padding: "20px 14px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all .18s"
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>{ic}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: otype === v ? "#fff" : T.black, marginBottom: 4 }}>
                    {lbl}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: otype === v ? "rgba(255,255,255,.6)" : T.gray400 }}>
                    {desc}
                  </div>
                </button>
              ))}
            </div>
            <Btn ch="Suivant →" onClick={() => setStep(2)} variant="red" full size="lg" />
          </>
        )}

        {step === 2 && (
          <>
            <STitle ch="Récapitulatif" />
            <Input label="Votre nom" value={name} onChange={e => setName(e.target.value)} placeholder="Marco Rossi" />
            <Input label="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+32 4XX XXX XXX" type="tel" />
            <Input label="Note" value={note} onChange={e => setNote(e.target.value)} placeholder="Allergies, instructions…" rows={2} />
            <div style={{ display: "flex", gap: 10 }}>
              <Btn ch="← Retour" onClick={() => setStep(1)} variant="ghost" style={{ flex: 1 }} />
              <Btn ch={`💳 Payer ${fmt(total)}`} onClick={() => setPayOpen(true)} variant="red" style={{ flex: 2 }} />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div
              style={{
                background: T.black,
                borderRadius: 20,
                padding: "40px 24px",
                textAlign: "center",
                marginBottom: 20
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: 16 }}>🍕</div>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.8rem",
                  color: "#fff",
                  marginBottom: 8
                }}
              >
                Commande confirmée !
              </div>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.3rem",
                  color: T.amber,
                  margin: "12px 0",
                  letterSpacing: ".05em"
                }}
              >
                {orderId}
              </div>
            </div>
            <Btn
              ch="← Retour à l'accueil"
              onClick={() => {
                setCart([])
                onDone()
              }}
              variant="black"
              full
              size="lg"
            />
          </>
        )}
      </div>

      {payOpen && <PaymentSheet total={total} onSuccess={handlePaySuccess} onClose={() => setPayOpen(false)} />}
    </div>
  )
}
