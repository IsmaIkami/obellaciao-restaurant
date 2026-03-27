import { T, fmt } from '../lib/design'

export function CartItem({ item, onQty }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 0",
        borderBottom: `1px solid ${T.border}`,
        alignItems: "flex-start"
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          background: `linear-gradient(135deg, ${T.black}, ${T.gray800})`,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          flexShrink: 0
        }}
      >
        {item.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: "0.95rem", color: T.black }}>
          {item.name}
        </div>
        {item.removed?.length > 0 && (
          <div style={{ fontSize: "0.7rem", color: T.red, fontWeight: 600, marginTop: 2 }}>
            Sans: {item.removed.join(" · ")}
          </div>
        )}
        {item.note && (
          <div style={{ fontSize: "0.72rem", color: T.gray400, fontStyle: "italic", marginTop: 1 }}>
            "{item.note}"
          </div>
        )}
        <div style={{ fontSize: "0.85rem", color: T.gray600, marginTop: 2 }}>
          {fmt(item.price)}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button
          onClick={() => onQty(item.cartId, -1)}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: T.gray100,
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700
          }}
          className="press-scale"
        >
          −
        </button>
        <span style={{ fontWeight: 700, minWidth: 16, textAlign: "center", fontSize: "0.95rem" }}>
          {item.qty}
        </span>
        <button
          onClick={() => onQty(item.cartId, 1)}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: T.black,
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#fff"
          }}
          className="press-scale"
        >
          +
        </button>
      </div>
    </div>
  )
}
