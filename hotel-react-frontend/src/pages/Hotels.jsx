import React, { useEffect, useState } from 'react'
import { getHotels } from '../api/hotelService'
import HotelCard from '../components/HotelCard'
import Loader from '../components/Loader'

export default function Hotels() {
  const [hotels, setHotels] = useState(null)

  useEffect(() => {
    getHotels().then(setHotels).catch(() => setHotels([]))
  }, [])

  if (!hotels) return <Loader />

  return (
    <div>
      <h1>All Hotels</h1>
      <div className="grid">
        {hotels.map(h => <HotelCard key={h.id} hotel={h} />)}
      </div>
    </div>
  )
}
