import React, { useEffect, useMemo, useState } from 'react'
import { getHotels } from '../api/hotelService'
import HotelCard from '../components/HotelCard'
import Loader from '../components/Loader'

export default function Home() {
  const [hotels, setHotels] = useState(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    getHotels().then(setHotels).catch(() => setHotels([]))
  }, [])

  const filtered = useMemo(() => {
    if (!hotels) return []
    return hotels.filter(h => {
      const name = (h.name || h.hotelName || '').toLowerCase()
      const addr = (h.address || h.location || '').toLowerCase()
      const s = q.toLowerCase()
      return name.includes(s) || addr.includes(s)
    })
  }, [q, hotels])

  if (!hotels) return <Loader />

  return (
    <div>
      <h1>Find your perfect stay</h1>
      <div className="card" style={{margin:'1rem 0'}}>
        <label>Search</label>
        <input placeholder="Hotel name or address..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid">
        {filtered.map(h => <HotelCard key={h.id} hotel={h} />)}
      </div>
    </div>
  )
}
