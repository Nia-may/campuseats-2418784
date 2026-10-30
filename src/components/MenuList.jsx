import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function MenuList({ items }) {
  const { addToCart } = useCart()

  const [maxSpice, setMaxSpice] = useLocalStorage('campuseats-max-spice', 3)

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
              onAdd={addToCart}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default MenuList
