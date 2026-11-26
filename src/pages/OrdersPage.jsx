import { Link } from 'react-router'
import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderActions from '../components/OrdersActions.jsx'
import OrderStatus from '../components/OrderStatus.jsx' 

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()
  //receive this three values from useMy orders()

  if (loading) return <p>Loading orders...</p>
  if (error) return <p>Error: {error}</p>

  const activeOrders = orders.filter(
    (order) => order.status !== 'Cancelled'
  )
  //want to filter that only order that not cancel shown to the order page


  if (activeOrders.length === 0) {
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

      <ul className="order-list">
        {activeOrders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">{order.vendorName} · pickup {order.pickupTime}</p>
            <p className="muted">{order.items.map((i) => `${i.qty}× ${i.name}`).join(',')}</p>
            <p className="muted">Placed {order.createdAt ? order.createdAt.toDate().toLocaleString('en-MY') : 'just now'}</p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            <OrderStatus status={order.status} />
            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </>
  )
}

export default OrdersPage
