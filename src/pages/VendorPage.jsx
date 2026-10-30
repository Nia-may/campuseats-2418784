import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()

  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />

  if (error) return <ErrorMessage error={error} onRetry={reload} />
//It searches for the vendor whose ID matches the URL parameter.
  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <>
        <h2>Vendor not found</h2>
        <p>There is no vendor called "{id}".</p>
        <Link to="/">Back to vendors</Link>
      </>
    )
  }

  return (
    <>
      <Link to="/">← All vendors</Link>

      <h2>{vendor.name}</h2>

      <p>
        {vendor.location} · {vendor.openHours}
      </p>

      <MenuList items={vendor.menu} />
    </>
  )
}

export default VendorPage
