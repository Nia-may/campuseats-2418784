import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <>
        <h2>My orders</h2>
        <p>No orders yet.</p>
        <Link to="/">Browse vendors</Link>
      </>
    )
  }

  return (
    <>
      <h2>My orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="card">
          <p>
            Pickup {order.pickupTime} · Mahallah {order.mahallah}
          </p>

          <p>
            {order.lines?.map((l) => `${l.qty}× ${l.item.name}`).join(', ') || 'No items'}
          </p>

          <p>RM {order.total.toFixed(2)}</p>
        </div>
      ))}
    </>
  )
}

export default OrdersPage
