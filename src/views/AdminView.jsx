import { useState, useEffect } from 'react'
import { T, fmt, ORDER_STATUS } from '../lib/design'
import { Btn, STitle, Badge } from '../components/UI'
import { useToast } from '../components/Toast'
import { db } from '../lib/supabase'

export function AdminView({ onSwitchMode }) {
  const [tab, setTab] = useState("kitchen")
  const [orders, setOrders] = useState([])
  const [reservations, setReservations] = useState([])
  const [tables, setTables] = useState([])
  const [calls, setCalls] = useState([])
  const toast = useToast()

  useEffect(() => {
    loadData()
    // Subscribe to real-time updates
    const ordersSub = db.subscribeToOrders(() => loadOrders())
    const resSub = db.subscribeToReservations(() => loadReservations())
    const tablesSub = db.subscribeToTables(() => loadTables())
    const callsSub = db.subscribeToCalls(() => loadCalls())

    return () => {
      ordersSub.unsubscribe()
      resSub.unsubscribe()
      tablesSub.unsubscribe()
      callsSub.unsubscribe()
    }
  }, [])

  const loadData = async () => {
    await Promise.all([loadOrders(), loadReservations(), loadTables(), loadCalls()])
  }

  const loadOrders = async () => {
    try {
      const data = await db.getOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  const loadReservations = async () => {
    try {
      const data = await db.getReservations()
      setReservations(data)
    } catch (error) {
      console.error('Error loading reservations:', error)
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

  const loadCalls = async () => {
    try {
      const data = await db.getCalls()
      setCalls(data)
    } catch (error) {
      console.error('Error loading calls:', error)
    }
  }

  const pendingCalls = calls.filter(c => !c.done).length
  const activeOrders = orders.filter(o => o.status !== "ready").length
  const kitchenQ = orders.filter(o => o.status === "received" || o.status === "preparing").length
  const ca = orders
    .filter(o => o.payment && o.status === "ready")
    .reduce((s, o) => s + (o.items?.reduce((ss, i) => ss + i.price * i.qty, 0) || 0), 0)

  const TABS = [
    { id: "kitchen", icon: "🍳", label: `Cuisine (${kitchenQ})` },
    { id: "orders", icon: "📋", label: `Commandes (${activeOrders})` },
    { id: "resa", icon: "📅", label: "Réservations" },
    { id: "tables", icon: "🪑", label: "Tables" },
    { id: "dash", icon: "📊", label: "Dashboard" },
  ]

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: T.bg,
        maxWidth: 900,
        margin: "0 auto"
      }}
    >
      <toast.ToastContainer />

      {/* Top bar */}
      <div
        style={{
          background: T.black,
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          gap: 12
        }}
      >
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: "#fff", flexShrink: 0 }}>
          O <em style={{ color: T.red }}>Bella</em> Ciao{" "}
          <span style={{ color: T.amber, fontSize: "0.8rem" }}>Admin</span>
        </div>

        {/* Live KPIs */}
        <div style={{ display: "flex", gap: 12, overflowX: "auto", flex: 1 }}>
          {[
            [`🪑 ${tables.filter(t => t.status === "occupé").length}/${tables.length}`, "Tables"],
            [`📋 ${activeOrders}`, "Actives"],
            [`🚨 ${pendingCalls}`, "Alertes"],
            [`💶 ${fmt(ca)}`, "CA"]
          ].map(([v, l]) => (
            <div key={l} style={{ flexShrink: 0, textAlign: "center" }}>
              <div
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: l === "Alertes" && pendingCalls > 0 ? T.red : T.amber
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: "0.55rem",
                  color: "rgba(255,255,255,.4)",
                  textTransform: "uppercase",
                  letterSpacing: ".06em"
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => onSwitchMode("client")}
            style={{
              background: "rgba(255,255,255,.1)",
              border: "none",
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "rgba(255,255,255,.6)",
              cursor: "pointer"
            }}
          >
            Site
          </button>
          <button
            onClick={() => onSwitchMode("server")}
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
            Serveur
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          flexShrink: 0,
          overflowX: "auto"
        }}
      >
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              minWidth: 80,
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
                fontSize: "0.6rem",
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
        {/* KITCHEN TAB */}
        {tab === "kitchen" && (
          <>
            <STitle ch="Cuisine — Queue de préparation" />
            {["received", "preparing"].map(status => {
              const filtered = orders.filter(o => o.status === status)
              if (filtered.length === 0) return null
              const cfg = ORDER_STATUS[status]

              return (
                <div key={status} style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: cfg.color,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginBottom: 12
                    }}
                  >
                    {cfg.label} ({filtered.length})
                  </div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {filtered.map(o => (
                      <div
                        key={o.id}
                        style={{
                          background: T.surface,
                          border: `2px solid ${cfg.color}`,
                          borderRadius: 14,
                          overflow: "hidden"
                        }}
                      >
                        <div
                          style={{
                            background: cfg.color,
                            padding: "12px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <div style={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>
                            {o.order_id} · {o.table_id ? `Table ${o.table_id}` : o.name}
                          </div>
                          <span style={{ color: "rgba(255,255,255,.8)", fontSize: "0.8rem" }}>⏰ {o.time}</span>
                        </div>
                        <div style={{ padding: "16px" }}>
                          {o.items?.map((it, i) => (
                            <div
                              key={i}
                              style={{
                                background: it.removed?.length > 0 ? T.amberBg : T.bg,
                                border: `1px solid ${it.removed?.length > 0 ? T.amber + "40" : T.border}`,
                                borderRadius: 10,
                                padding: "12px",
                                marginBottom: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: 12
                              }}
                            >
                              <div
                                style={{
                                  width: 48,
                                  height: 48,
                                  background: `linear-gradient(135deg, ${T.black}, ${T.gray800})`,
                                  borderRadius: 10,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "2rem",
                                  flexShrink: 0
                                }}
                              >
                                {it.emoji}
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: T.black, marginBottom: 4 }}>
                                  ×{it.qty} {it.name}
                                </div>
                                {it.removed?.length > 0 && (
                                  <div
                                    style={{
                                      fontSize: "0.85rem",
                                      color: T.red,
                                      fontWeight: 600,
                                      marginBottom: 2
                                    }}
                                  >
                                    ⚠️ SANS: {it.removed.join(", ").toUpperCase()}
                                  </div>
                                )}
                                {it.note && (
                                  <div style={{ fontSize: "0.78rem", color: T.gray600, fontStyle: "italic" }}>
                                    Note: {it.note}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          <Btn
                            ch={cfg.nLabel}
                            onClick={async () => {
                              try {
                                await db.updateOrder(o.id, { status: cfg.next })
                                toast.show(`✅ ${ORDER_STATUS[cfg.next].label}`)
                                loadOrders()
                              } catch (error) {
                                toast.show("Erreur de mise à jour", "err")
                              }
                            }}
                            variant={status === "preparing" ? "green" : "black"}
                            size="lg"
                            full
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
            {kitchenQ === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: T.gray400 }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
                <p style={{ fontSize: "1.1rem" }}>Aucune commande en cuisine</p>
              </div>
            )}
          </>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <>
            <STitle ch="Toutes les commandes" />
            {orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: T.gray400 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📋</div>
                <p>Aucune commande</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {orders.map(o => {
                  const cfg = ORDER_STATUS[o.status]
                  return (
                    <div
                      key={o.id}
                      style={{
                        background: T.surface,
                        border: `1.5px solid ${cfg.color}30`,
                        borderRadius: 14,
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          background: cfg.bg,
                          padding: "10px 16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: `1px solid ${T.border}`
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, color: T.black, fontSize: "0.9rem" }}>
                            {o.order_id}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: T.gray600, marginTop: 2 }}>
                            {o.table_id ? `Table ${o.table_id}` : o.name} · {o.time}
                          </div>
                        </div>
                        <Badge label={cfg.label} color={cfg.color} bg={cfg.bg} />
                      </div>
                      <div style={{ padding: "12px 16px" }}>
                        {o.items?.map((it, i) => (
                          <div key={i} style={{ fontSize: "0.85rem", padding: "3px 0", color: T.gray600 }}>
                            {it.emoji} {it.name} ×{it.qty}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* RESERVATIONS TAB */}
        {tab === "resa" && (
          <>
            <STitle ch="Réservations" />
            {reservations.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: T.gray400 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📅</div>
                <p>Aucune réservation</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {reservations.map(r => (
                  <div
                    key={r.id}
                    style={{
                      background: T.surface,
                      border: `1.5px solid ${T.blue}30`,
                      borderRadius: 14,
                      padding: "16px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1.1rem", color: T.black, marginBottom: 4 }}>
                          {r.name}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: T.gray600 }}>
                          👥 {r.guests} pers. · ⏰ {r.date} {r.time}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: T.gray400, marginTop: 2 }}>
                          📞 {r.phone}
                        </div>
                      </div>
                      <Badge
                        label={r.status}
                        color={r.status === "confirmé" ? T.green : T.amber}
                      />
                    </div>
                    {r.note && (
                      <div
                        style={{
                          background: T.amberBg,
                          border: `1px solid ${T.amber}40`,
                          borderRadius: 8,
                          padding: "8px 12px",
                          fontSize: "0.8rem",
                          color: T.black,
                          marginTop: 8
                        }}
                      >
                        ⚠️ {r.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* TABLES TAB */}
        {tab === "tables" && (
          <>
            <STitle ch="Plan de salle" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
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
                      background: cfg.bg,
                      border: `2px solid ${cfg.c}`,
                      borderRadius: 14,
                      padding: "16px",
                      textAlign: "center"
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.5rem",
                        color: T.black,
                        marginBottom: 8
                      }}
                    >
                      Table {t.id}
                    </div>
                    <Badge label={t.status} color={cfg.c} />
                    <div style={{ fontSize: "0.7rem", color: T.gray600, marginTop: 8 }}>
                      {t.seats} places<br />
                      {t.waiter}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* DASHBOARD TAB */}
        {tab === "dash" && (
          <>
            <STitle ch="Vue d'ensemble" />
            <div style={{ display: "grid", gap: 16 }}>
              {/* Stats Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                {[
                  { label: "Commandes actives", value: activeOrders, icon: "📋", color: T.blue },
                  { label: "En cuisine", value: kitchenQ, icon: "🍳", color: T.amber },
                  { label: "Tables occupées", value: tables.filter(t => t.status === "occupé").length, icon: "🪑", color: T.red },
                  { label: "Chiffre d'affaires", value: fmt(ca), icon: "💶", color: T.green }
                ].map(stat => (
                  <div
                    key={stat.label}
                    style={{
                      background: T.surface,
                      border: `1.5px solid ${stat.color}30`,
                      borderRadius: 14,
                      padding: "16px",
                      textAlign: "center"
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>{stat.icon}</div>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.8rem",
                        color: stat.color,
                        marginBottom: 4
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: T.gray600, textTransform: "uppercase", letterSpacing: ".05em" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
