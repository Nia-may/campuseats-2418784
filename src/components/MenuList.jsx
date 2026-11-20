import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'
import {useAuth} from '../hooks/useAuth.js'
import { useNavigate } from 'react-router' //when guests add food direct to login page

function MenuList({ items, maxSpice, setMaxSpice }) {
  const { addToCart } = useCart()

  //get current auth info
  const {user, loading} = useAuth()

  const navigate = useNavigate()

  function handleAddToCart(item) {
    if (loading) return

    if (!user) {
      navigate('/login')
      return
    }

    addToCart(item)
  }

  //firebase check authnetication
  if (loading){
    return <p className='muted'>Loading...</p>
  }

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  return (
    <>
      <div className="spice-filter">
        <label htmlFor="maxSpice">
          Max spice level 🌶️: {maxSpice === 3 ? 'Any': maxSpice}
        </label>

        <input
          id="maxSpice"
          type="range"
          min="0"
          max="3"
          step="1"
          value={maxSpice}
          disabled={!user}
          onChange={(event) =>
            setMaxSpice(Number(event.target.value))
          }
        />

        {!user && (
          <p className="muted">
            Guests use the default spice setting: Any.
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <p className="muted">
          No items match this spice level.
        </p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAdd={handleAddToCart}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default MenuList
//HTML range sliders return strings.
//Your Firestore spiceLevel is stored as a number.
//Number() converts the slider value into the correct data type.