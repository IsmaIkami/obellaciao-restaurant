import { useState } from 'react'
import { MENU, CATEGORIES } from '../data/menu'
import { T } from '../lib/design'
import { MenuCard } from './MenuCard'
import { IngredientSheet } from './IngredientSheet'

export function MenuBrowser({ onAdd, compact = false }) {
  const [cat, setCat] = useState("all")
  const [ingItem, setIngItem] = useState(null)

  const filtered = cat === "all" ? MENU : MENU.filter(i => i.cat === cat)

  const handleTap = (item) => setIngItem(item)

  const handleConfirm = (removed, note) => {
    onAdd({ ...ingItem, qty: 1, removed, note, cartId: Date.now() + Math.random() })
    setIngItem(null)
  }

  return (
    <div>
      {/* Category filter */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
          marginBottom: 18,
          scrollbarWidth: "none"
        }}
      >
        {CATEGORIES.map(c => (
          <button
            key={c.k}
            onClick={() => setCat(c.k)}
            className="press-scale"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "8px 14px",
              borderRadius: 20,
              border: `1.5px solid ${cat === c.k ? T.black : T.border}`,
              background: cat === c.k ? T.black : "transparent",
              color: cat === c.k ? "#fff" : T.gray600,
              fontWeight: 600,
              fontSize: "0.78rem",
              cursor: "pointer",
              flexShrink: 0,
              whiteSpace: "nowrap",
              transition: "all .18s"
            }}
          >
            <span>{c.i}</span>
            {c.l}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12
        }}
      >
        {filtered.map(item => (
          <MenuCard key={item.id} item={item} onTap={handleTap} />
        ))}
      </div>

      {ingItem && (
        <IngredientSheet
          item={ingItem}
          onConfirm={handleConfirm}
          onClose={() => setIngItem(null)}
        />
      )}
    </div>
  )
}
