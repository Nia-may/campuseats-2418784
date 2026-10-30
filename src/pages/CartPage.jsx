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
    placeOrder
  } = useCart()

  const navigate = useNavigate()

  function handlePlaceOrder(details) {
    placeOrder(details)
    navigate('/orders')
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

      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </>
  )
}

export default CartPage
