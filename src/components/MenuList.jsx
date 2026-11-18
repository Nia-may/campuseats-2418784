import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'
import {useAuth} from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useNavigate } from 'react-router' //when guests add food direct to login page

function MenuList({ items }) {
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

  //unique storage key for each user
  const storageKey = user? 'ce-spice-' + user.uid: null

  const [maxSpice, setMaxSpice] = useLocalStorage(storageKey, 'any', !loading && Boolean(user))

  const filteredItems = items.filter(
    (item) => maxSpice === 'any'|| item.spiceLevel <= Number(maxSpice)
  )

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
          Max spice level 🌶️: {maxSpice === 'any' ? 'Any': maxSpice}
        </label>

        <input
          id="maxSpice"
          type="range"
          min="0"
          max="3"
          step="1"
          value={maxSpice === 'any' ? 3 : Number(maxSpice)}
          disabled={!user}
          onChange={(event) =>
            setMaxSpice(event.target.value)
          }
        />

        {!user && (
          <p className="muted">
            Guests use the default spice setting: Any.
          </p>
        )}
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
              onAdd={handleAddToCart}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default MenuList
