import React from 'react'

export default function RoomCard({ room, onBook }) {
  const status = (room.status || '').toLowerCase()
  const available = status === 'available' || status === 'trong' || status === 'empty' || status === ''

  return (
    <div className="card">
      <h4>{room.name || `Room #${room.id}`}</h4>
      <p className="muted">Type: {room.type || room.roomType || 'Standard'}</p>
      <p className="muted">Price: {room.price ? `$${room.price}` : 'N/A'}</p>
      <p>Status: <span className="badge">{room.status || 'Available'}</span></p>
      <button className="btn" onClick={() => onBook(room)} disabled={!available}>Book</button>
    </div>
  )
}
