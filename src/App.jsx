import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'
 
function App() {

  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')

   useEffect(() => {
    const controller = new AbortController()

    async function fetchVendors() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error('Failed to load vendors')
        }

        const data = await res.json()

        setVendors(data)
        setSelectedVendorId(data[0]?.id ?? null)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchVendors()

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  )

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (line) => line.item.id === item.id
      )

      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) =>
      prevCart.filter((line) => line.item.id !== itemId)
    )
  }

  // B3: Count all items, including repeated quantities
  const cartCount = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  // Temporary order handler; B5 can add pickup time and total
  const [lastOrder, setLastOrder] = useState(null)
  
  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0
    )

    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  let content
  if (view === 'cart') {
    content = (
      <CartPage cart={cart} onChangeQty={handleChangeQty}
                onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
    )
  } else if (view === 'done') {
    content = lastOrder ? (
      <section>
        <h2>Order placed</h2>
        <p>Name: {lastOrder.name}</p>
        <p>Mahallah: {lastOrder.mahallah}</p>
        <p>Pickup time: {lastOrder.pickupTime}</p>
        <p>Total: RM {lastOrder.total.toFixed(2)}</p>
      </section>
    ) : (
      <p>No order details available.</p>
    )   // TODO (B5): show pickup time and total
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 
  1)} />
  } else {
    content = (<>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
        )}
    </>
    )
  }
  
  return (
    <>
      <Header cartCount={cartCount}
              onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}
 
export default App