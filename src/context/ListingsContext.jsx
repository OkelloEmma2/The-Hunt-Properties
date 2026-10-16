import { createContext, useContext, useEffect, useState } from 'react'
import { seedProperties } from '../data/properties'
import { posts as seedPosts } from '../data/posts'

const ListingsContext = createContext(null)
const LS_LISTINGS = 'thp_listings'
const LS_LEADS = 'thp_leads'
const LS_POSTS = 'thp_posts'

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

// Single source of truth. Only the Admin Panel creates/edits listings & posts.
export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(() => load(LS_LISTINGS, seedProperties))
  const [posts, setPosts] = useState(() => load(LS_POSTS, seedPosts))
  const [leads, setLeads] = useState(() => load(LS_LEADS, []))

  useEffect(() => { try { localStorage.setItem(LS_LISTINGS, JSON.stringify(listings)) } catch {} }, [listings])
  useEffect(() => { try { localStorage.setItem(LS_POSTS, JSON.stringify(posts)) } catch {} }, [posts])
  useEffect(() => { try { localStorage.setItem(LS_LEADS, JSON.stringify(leads)) } catch {} }, [leads])

  // ---- Listings (admin only) — status: 'approved' (published) | 'hidden' ----
  const addListing = (data) => {
    const listing = { ...data, id: 'thp-' + Date.now(), status: 'approved', datePosted: new Date().toISOString() }
    setListings(prev => [listing, ...prev])
    return listing
  }
  const updateListing = (id, patch) => setListings(prev => prev.map(l => (l.id === id ? { ...l, ...patch } : l)))
  const deleteListing = (id) => setListings(prev => prev.filter(l => l.id !== id))

  // ---- Blog posts (admin only) ----
  const addPost = (data) => {
    const post = {
      ...data,
      slug: (data.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        + '-' + Date.now().toString(36),
    }
    setPosts(prev => [post, ...prev])
    return post
  }
  const deletePost = (slug) => setPosts(prev => prev.filter(p => p.slug !== slug))

  // ---- Leads (contact form) ----
  const addLead = (lead) =>
    setLeads(prev => [{ ...lead, id: 'lead-' + Date.now(), date: new Date().toISOString() }, ...prev])

  const resetDemoData = () => { setListings(seedProperties); setPosts(seedPosts); setLeads([]) }

  return (
    <ListingsContext.Provider
      value={{ listings, posts, leads, addListing, updateListing, deleteListing, addPost, deletePost, addLead, resetDemoData }}
    >
      {children}
    </ListingsContext.Provider>
  )
}

export const useListings = () => useContext(ListingsContext)