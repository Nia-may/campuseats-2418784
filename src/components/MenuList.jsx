
import { useState } from 'react'
import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd }) {
  const [maxSpice, setMaxSpice] = useState(3)

  const filteredItems = items.filter(
    (item) => item.spiceLevel <= maxSpice
  )

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  return (
    <>
      <div className="spice-filter">
        <label htmlFor="maxSpice">
          Max spice level: {maxSpice}
        </label>

        <input
          id="maxSpice"
          type="range"
          min="0"
          max="3"
          step="1"
          value={maxSpice}
          onChange={(event) =>
            setMaxSpice(Number(event.target.value))
          }
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="muted">
          No items match this spice level.
        </p>
      ) : (
        <div className="grid">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default MenuList
