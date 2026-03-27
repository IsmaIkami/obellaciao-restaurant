import { T, fmt } from '../lib/design'

export function MenuCard({ item, onTap }) {
  return (
    <div
      onClick={() => onTap(item)}
      className="press-scale"
      style={{
        background: T.surface,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${T.border}`,
        cursor: "pointer",
        transition: "box-shadow .2s"
      }}
    >
      <div
        style={{
          height: 130,
          background: `linear-gradient(135deg, ${T.black} 0%, ${T.gray800} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3.5rem",
          position: "relative"
        }}
      >
        {item.emoji}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            background: T.red,
            color: "#fff",
            borderRadius: 8,
            padding: "3px 8px",
            fontFamily: "'DM Serif Display', serif",
            fontSize: "0.9rem",
            fontWeight: 700
          }}
        >
          {fmt(item.price)}
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1rem",
            color: T.black,
            marginBottom: 4
          }}
        >
          {item.name}
        </div>
        <div style={{ fontSize: "0.78rem", color: T.gray600, lineHeight: 1.5 }}>
          {item.desc}
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span style={{ fontSize: "0.68rem", color: T.gray400 }}>🖊 Personnaliser</span>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: T.red,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.2rem"
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  )
}
