import { createContext, useContext, useEffect, useState } from 'react'
import { seedProperties } from '../data/properties'

const ListingsContext = createContext(null)
const LS_LISTINGS = 'thp_listings'
const LS_LEADS = 'thp_leads'

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

// In production, swap this context for a real backend (e.g. Supabase/Firebase).
// It is the single source of truth for listings + leads.
export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(() => load(LS_LISTINGS, seedProperties))
  const [leads, setLeads] = useState(() => load(LS_LEADS, []))

  useEffect(() => { try { localStorage.setItem(LS_LISTINGS, JSON.stringify(listings)) } catch {} }, [listings])
  useEffect(() => { try { localStorage.setItem(LS_LEADS, JSON.stringify(leads)) } catch {} }, [leads])

  // status: 'pending' | 'approved' | 'rejected'  → moderation state
  // dealType: 'Buy' | 'Rent'                     → from the SRS "Status (Buy/Rent)"
  const addListing = (data) => {
    const listing = { ...data, id: 'own-' + Date.now(), status: 'pending', datePosted: new Date().toISOString() }
    setListings(prev => [listing, ...prev])
    return listing
  }
  const updateListing = (id, patch) =>
    setListings(prev => prev.map(l => (l.id === id ? { ...l, ...patch } : l)))
  const deleteListing = (id) => setListings(prev => prev.filter(l => l.id !== id))
  const addLead = (lead) =>
    setLeads(prev => [{ ...lead, id: 'lead-' + Date.now(), date: new Date().toISOString() }, ...prev])
  const resetDemoData = () => { setListings(seedProperties); setLeads([]) }

  return (
    <ListingsContext.Provider value={{ listings, leads, addListing, updateListing, deleteListing, addLead, resetDemoData }}>
      {children}
    </ListingsContext.Provider>
  )
}

export const useListings = () => useContext(ListingsContext)