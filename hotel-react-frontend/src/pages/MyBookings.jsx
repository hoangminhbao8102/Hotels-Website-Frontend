import React, { useEffect, useState } from 'react'
import { getBookingsByUser, cancelBooking } from '../api/bookingService'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

export default function MyBookings() {
  const { user } = useAuth()
  const [data, setData] = useState(null)

  const refresh = () => {
    getBookingsByUser(user.id).then(setData).catch(()=>setData([]))
  }

  useEffect(() => { refresh() }, [])

  if (!data) return <Loader />

  return (
    <div>
      <h1>My Bookings</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.roomId}</td>
              <td>{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString() : ''}</td>
              <td>{b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString() : ''}</td>
              <td><span className="badge">{b.status || 'Booked'}</span></td>
              <td>
                <button className="btn danger" onClick={async()=>{ 
                  if (!confirm('Cancel this booking?')) return
                  await cancelBooking(b.id); refresh();
                }}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
