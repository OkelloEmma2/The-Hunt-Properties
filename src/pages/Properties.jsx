import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import SearchFilters from '../components/SearchFilters'
import PropertyCard from '../components/PropertyCard'
import AdBanner from '../components/AdBanner'

export default function Properties() {
  const [params] = useSearchParams()
  const { listings } = useListings()

  const results = useMemo(() => {
    const q = (params.get('q') || '').toLowerCase()
    const location = params.get('location') || ''
    const category = params.get('category') || ''
    const status = params.get('status') || ''          // Buy / Rent → matches listing.dealType
    const min = Number(params.get('minPrice')) || 0
    const max = Number(params.get('maxPrice')) || Infinity
    return listings.filter(l =>
      l.status === 'approved'
      && (!q || `${l.title} ${l.location} ${l.district} ${l.description}`.toLowerCase().includes(q))
      && (!location || l.district === location)
      && (!category || l.category === category)
      && (!status || l.dealType === status)
      && l.price >= min && l.price <= max
    )
  }, [params, listings])

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Search Properties</h1>
          <p>Filter by location, category, price and status to find your perfect match.</p>
        </div>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SearchFilters />
          <div className="results-bar">
            <p className="section-sub">{results.length} propert{results.length === 1 ? 'y' : 'ies'} found</p>
          </div>
          {results.length === 0 ? (
            <div className="card empty-state">
              <SearchX size={40} />
              <h3>No properties match your filters</h3>
              <p className="section-sub">Try widening your price range or clearing some filters.</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {results.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          )}
          <div className="mt-ad"><AdBanner /></div>
        </div>
      </section>
    </>
  )
}