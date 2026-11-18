import { CartContext } from './cart-context.js'
import { useEffect, useState } from 'react'
import {useAuth} from '../hooks/useAuth.js'
//import { useLocalStorage } from '../hooks/useLocalStorage.js'

//get saved data
function getSavedData(key) {
  if (!key) return []

  try {
    const saved = localStorage.getItem(key)
    return saved !== null ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Owns the cart and the orders, and shares them with every component inside it.
export function CartProvider({ children }) {
  const { user } = useAuth()

  //each user had different key for cart and order
  const cartKey = user ? `campuseats-cart-${user.uid}` : null
  const ordersKey = user ? `campuseats-orders-${user.uid}` : null

  return (
    <UserCartProvider
      key={user?.uid ?? 'guest'}
      cartKey={cartKey}
      ordersKey={ordersKey}
    >
      {children}
    </UserCartProvider>
  )
}

// This component remounts when the user changes.
function UserCartProvider({ children, cartKey, ordersKey }) {

  const [cart, setCart] = useState(() => getSavedData(cartKey))
  const [orders, setOrders] = useState(() => getSavedData(ordersKey))

  // Save the current user's cart.
  useEffect(() => {
    if (!cartKey) return

    try {
      localStorage.setItem(cartKey, JSON.stringify(cart))
    } catch {
      // Keep working if storage is unavailable.
    }
  }, [cartKey, cart])

  // Save the current user's orders.
  useEffect(() => {
    if (!ordersKey) return

    try {
      localStorage.setItem(ordersKey, JSON.stringify(orders))
    } catch {
      // Keep working if storage is unavailable.
    }
  }, [ordersKey, orders])

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)

      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prev, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) =>
      prev.filter((line) => line.item.id !== itemId)
    )
  }

  // details = { name, mahallah, pickupTime } from CheckoutForm
  function placeOrder(details) {
    const order = {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...details,
      lines: cart,
      total: cart.reduce(
        (sum, line) => sum + line.item.price * line.qty,
        0
      ),
    }

    setOrders((prev) => [order, ...prev])

    // Empty the cart after placing an order
    setCart([])

    return order
  }

  const count = cart.reduce(
    (sum, line) => sum + line.qty,
    0
  )

  // Calculate the total price of all cart items
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
