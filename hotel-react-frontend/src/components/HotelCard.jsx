import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCard({ hotel }) {
  return (
    <div className="card">
      <h3>{hotel.name || hotel.hotelName || 'Hotel'}</h3>
      <p className="muted">{hotel.address || hotel.location || ''}</p>
      <div style={{display:'flex', gap:'.5rem'}}>
        <Link to={`/hotels/${hotel.id}`} className="btn">View</Link>
      </div>
    </div>
  )
}
