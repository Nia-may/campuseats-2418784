import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CartPage() {
  const {
    cart,
    total,
    changeQty,
    removeFromCart,
    clearCart
  } = useCart()

  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handlePlaceOrder(details) {
    setError('')
    try {
      await placeOrders(user, cart, details)
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
  }

  if (cart.length === 0) {
    return (
      <>
        <h2>Your cart</h2>
        <p>Your cart is empty. Pick something from a menu.</p>
      </>
    )
  }

  return (
    <>
      <h2>Your cart</h2>

      <div>
        {cart.map((line) => (
          <CartItem
            key={line.item.id}
            line={line}
            onChangeQty={changeQty}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <h3>Total: RM {total.toFixed(2)}</h3>

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <CheckoutForm
        defaultName={user?.displayName ?? ''}
        onPlaceOrder={handlePlaceOrder}
      />
    </>
  )
}

export default CartPage
