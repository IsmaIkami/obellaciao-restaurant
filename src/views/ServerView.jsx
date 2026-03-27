import { useState, useEffect } from 'react'
import { T, fmt, genId, nowT, ORDER_STATUS } from '../lib/design'
import { Btn, STitle, Input, Badge } from '../components/UI'
import { useToast } from '../components/Toast'
import { MenuBrowser } from '../components/MenuBrowser'
import { CartItem } from '../components/CartItem'
import { PaymentSheet } from '../components/PaymentSheet'
import { db } from '../lib/supabase'

export function ServerView({ onSwitchMode }) {
  const [tab, setTab] = useState("order")
  const [cart, setCart] = useState([])
  const [clientName, setClientName] = useState("")
  const [tableId, setTableId] = useState("")
  const [orders, setOrders] = useState([])
  const [calls, setCalls] = useState([])
  const [tables, setTables] = useState([])
  const [payOpen, setPayOpen] = useState(false)
  const [payTotal, setPayTotal] = useState(0)
  const [pendingO, setPendingO] = useState(null)
  const toast = useToast()

  useEffect(() => {
    loadData()
    // Subscribe to real-time updates
    const ordersSub = db.subscribeToOrders(() => loadOrders())
    const callsSub = db.subscribeToCalls(() => loadCalls())
    const tablesSub = db.subscribeToTables(() => loadTables())

    return () => {
      ordersSub.unsubscribe()
      callsSub.unsubscribe()
      tablesSub.unsubscribe()
    }
  }, [])

  const loadData = async () => {
    await Promise.all([loadOrders(), loadCalls(), loadTables()])
  }

  const loadOrders = async () => {
    try {
      const data = await db.getOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  const loadCalls = async () => {
    try {
      const data = await db.getCalls()
      setCalls(data)
    } catch (error) {
      console.error('Error loading calls:', error)
    }
  }

  const loadTables = async () => {
    try {
      const data = await db.getTables()
      setTables(data)
    } catch (error) {
      console.error('Error loading tables:', error)
    }
  }

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const activeCalls = calls.filter(c => !c.done)
  const activeOrders = orders.filter(o => o.status !== "ready")
  const readyForService = orders.filter(o => o.status === "ready" && o.type === "table")

  const changeQty = (cartId, d) =>
    setCart(p => p.map(i => i.cartId === cartId ? { ...i, qty: i.qty + d } : i).filter(i => i.qty > 0))

  const handleCheckout = () => {
    if (!cart.length) return
    setPayTotal(cartTotal)
    setPendingO({ cart: [...cart], tableId, clientName })
    setPayOpen(true)
  }

  const handlePaySuccess = async (method) => {
    try {
      await db.addOrder({
        order_id: genId(),
        name: pendingO.clientName || "Serveur",
        time: nowT(),
        type: pendingO.tableId ? "table" : "counter",
        table_id: pendingO.tableId ? parseInt(pendingO.tableId) : null,
        items: pendingO.cart,
        status: "received",
        payment: method,
        waiter: "Serveur"
      })

      if (pendingO.tableId) {
        await db.updateTable(parseInt(pendingO.tableId), { status: "occupé" })
      }

      setCart([])
      setClientName("")
      setTableId("")
      setPayOpen(false)
      setPendingO(null)
      toast.show("✅ Commande enregistrée")
      setTab("orders")
      loadData()
    } catch (error) {
      toast.show("Erreur lors de l'enregistrement", "err")
    }
  }

  const TABS = [
    { id: "order", icon: "🍕", label: "Commande" },
    { id: "orders", icon: "📋", label: `Actives (${activeOrders.length})` },
    { id: "waiter", icon: "🛎", label: `Alertes (${activeCalls.length})` },
    { id: "tables", icon: "🪑", label: "Tables" },
  ]

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: T.bg,
        maxWidth: 480,
        margin: "0 auto"
      }}
    >
      <toast.ToastContainer />

      {/* Header */}
      <div
        style={{
          background: T.black,
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0
        }}
      >
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: "#fff" }}>
          O <em style={{ color: T.red }}>Bella</em> Ciao —{" "}
          <span style={{ color: T.amber, fontSize: "0.85rem" }}>Serveur</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => onSwitchMode("client")}
            style={{
              background: "rgba(255,255,255,.1)",
              border: "none",
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "rgba(255,255,255,.7)",
              cursor: "pointer"
            }}
          >
            Site
          </button>
          <button
            onClick={() => onSwitchMode("admin")}
            style={{
              background: T.red,
              border: "none",
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", flexShrink: 0 }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "10px 4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderTop: `3px solid ${tab === t.id ? T.red : "transparent"}`,
              transition: "all .15s"
            }}
          >
            <span style={{ fontSize: "1rem" }}>{t.icon}</span>
            <span
              style={{
                fontSize: "0.58rem",
                fontWeight: tab === t.id ? 700 : 400,
                color: tab === t.id ? T.red : T.gray400,
                letterSpacing: ".03em"
              }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {/* ORDER TAB */}
        {tab === "order" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <Input
                label="Client"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Nom client"
                style={{ marginBottom: 0 }}
              />
              <Input
                label="Table"
                value={tableId}
                onChange={e => setTableId(e.target.value)}
                placeholder="N° table"
                style={{ marginBottom: 0 }}
              />
            </div>
            <MenuBrowser
              onAdd={item => {
                setCart(p => {
                  const ex = p.find(i => i.cartId === item.cartId)
                  return ex ? p.map(i => i.cartId === item.cartId ? { ...i, qty: i.qty + 1 } : i) : [...p, item]
                })
                toast.show(`${item.emoji} ajouté`)
              }}
              compact
            />
            {cart.length > 0 && (
              <div
                style={{
                  position: "sticky",
                  bottom: 0,
                  marginTop: 20,
                  background: T.black,
                  borderRadius: 16,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.5)", fontWeight: 600 }}>
                    {cart.reduce((s, i) => s + i.qty, 0)} article(s)
                  </div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: T.amber }}>
                    {fmt(cartTotal)}
                  </div>
                </div>
                <Btn ch="💳 Encaisser" onClick={handleCheckout} variant="red" size="md" />
              </div>
            )}
          </>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <>
            <STitle ch="Commandes actives" />
            {activeOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: T.gray400 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✅</div>
                <p>Aucune commande active</p>
              </div>
            ) : (
              activeOrders.map(o => {
                const cfg = ORDER_STATUS[o.status]
                return (
                  <div
                    key={o.id}
                    style={{
                      background: T.surface,
                      borderRadius: 14,
                      border: `1.5px solid ${cfg.color}30`,
                      marginBottom: 12,
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        background: cfg.color,
                        padding: "10px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.88rem" }}>
                        {o.table_id ? `Table ${o.table_id}` : o.name}
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span
                          style={{
                            background: "rgba(255,255,255,.2)",
                            color: "#fff",
                            borderRadius: 6,
                            padding: "2px 8px",
                            fontSize: "0.7rem",
                            fontWeight: 600
                          }}
                        >
                          {cfg.label}
                        </span>
                        <span style={{ color: "rgba(255,255,255,.7)", fontSize: "0.72rem" }}>⏰{o.time}</span>
                      </div>
                    </div>
                    <div style={{ padding: "12px 16px" }}>
                      {o.items?.map((it, i) => (
                        <div key={i} style={{ fontSize: "0.88rem", color: T.black, padding: "3px 0" }}>
                          {it.emoji} {it.name} ×{it.qty}
                          {it.removed?.length > 0 && (
                            <span style={{ color: T.red, fontSize: "0.72rem" }}>
                              {" "}
                              ⚠️ sans: {it.removed.join(", ")}
                            </span>
                          )}
                        </div>
                      ))}
                      {cfg.next && (
                        <Btn
                          ch={cfg.nLabel}
                          onClick={async () => {
                            try {
                              await db.updateOrder(o.id, { status: cfg.next })
                              toast.show(`→ ${ORDER_STATUS[cfg.next].label}`)
                              loadOrders()
                            } catch (error) {
                              toast.show("Erreur de mise à jour", "err")
                            }
                          }}
                          variant="black"
                          size="sm"
                          style={{ marginTop: 10 }}
                        />
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </>
        )}

        {/* WAITER ALERTS TAB */}
        {tab === "waiter" && (
          <>
            <STitle ch="Alertes & Service" />
            {activeCalls.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: T.red,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    marginBottom: 10
                  }}
                >
                  🚨 Appels en attente
                </div>
                {activeCalls.map(c => (
                  <div
                    key={c.id}
                    style={{
                      background: T.redBg,
                      border: `1.5px solid ${T.red}30`,
                      borderRadius: 14,
                      padding: "14px 16px",
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: T.black, fontSize: "1rem" }}>
                        {c.type === "bill" ? "🧾 Addition" : "🛎 Appel serveur"} — Table {c.table_id}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: T.gray400, marginTop: 2 }}>depuis {c.time}</div>
                    </div>
                    <Btn
                      ch="✓ OK"
                      onClick={async () => {
                        try {
                          await db.resolveCall(c.id)
                          toast.show("✅ Traité")
                          loadCalls()
                        } catch (error) {
                          toast.show("Erreur", "err")
                        }
                      }}
                      variant="green"
                      size="sm"
                    />
                  </div>
                ))}
              </>
            )}
            {readyForService.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: T.green,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    marginTop: 20
                  }}
                >
                  ✅ Prêts à servir
                </div>
                {readyForService.map(o => (
                  <div
                    key={o.id}
                    style={{
                      background: T.greenBg,
                      border: `1.5px solid ${T.green}30`,
                      borderRadius: 14,
                      padding: "14px 16px",
                      marginBottom: 10
                    }}
                  >
                    <div style={{ fontWeight: 700, color: T.black, marginBottom: 6 }}>Table {o.table_id}</div>
                    {o.items?.map((it, i) => (
                      <div key={i} style={{ fontSize: "0.85rem", color: T.gray600, padding: "2px 0" }}>
                        {it.emoji} {it.name} ×{it.qty}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {/* TABLES TAB */}
        {tab === "tables" && (
          <>
            <STitle ch="Plan de salle" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {tables.map(t => {
                const cfg = {
                  libre: { c: T.green, bg: T.greenBg },
                  occupé: { c: T.red, bg: T.redBg },
                  réservé: { c: T.blue, bg: T.blueBg }
                }[t.status] || { c: T.gray400, bg: T.gray100 }

                return (
                  <div
                    key={t.id}
                    style={{
                      background: T.surface,
                      border: `1.5px solid ${cfg.c}30`,
                      borderRadius: 14,
                      padding: "16px 14px",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setTableId(t.id.toString())
                      setTab("order")
                      toast.show(`Table ${t.id} sélectionnée`)
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.15rem",
                        color: T.black,
                        marginBottom: 6
                      }}
                    >
                      Table {t.id}
                    </div>
                    <Badge label={t.status} color={cfg.c} bg={cfg.bg} />
                    <div style={{ fontSize: "0.72rem", color: T.gray400, marginTop: 8 }}>
                      {t.seats} couverts · {t.waiter}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Cart viewer in order tab */}
      {tab === "order" && cart.length > 0 && (
        <div
          style={{
            background: T.surface,
            borderTop: `1px solid ${T.border}`,
            padding: "12px 20px",
            flexShrink: 0
          }}
        >
          <div style={{ maxHeight: 120, overflowY: "auto" }}>
            {cart.map(item => (
              <CartItem key={item.cartId} item={item} onQty={changeQty} />
            ))}
          </div>
        </div>
      )}

      {payOpen && <PaymentSheet total={payTotal} onSuccess={handlePaySuccess} onClose={() => setPayOpen(false)} />}
    </div>
  )
}
