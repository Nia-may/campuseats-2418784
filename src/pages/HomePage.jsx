import { useVendors } from '../hooks/useVendors.js'
import VendorCard from '../components/VendorCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />

  if (error) return <ErrorMessage error={error} onRetry={reload} />

  return (
    <>
      <h2>Choose a vendor</h2>

      <div className="grid">
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
          />
        ))}
      </div>
    </>
  )
}

export default HomePage
//map. It takes every vendor in the vendors array and creates a VendorCard component for it.