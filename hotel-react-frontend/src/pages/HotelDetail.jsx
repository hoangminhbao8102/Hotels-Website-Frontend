import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHotelById } from '../api/hotelService'
import { getRoomsByHotel } from '../api/roomService'
import { createBooking } from '../api/bookingService'
import { getReviewsByHotel, createReview } from '../api/reviewService'
import RoomCard from '../components/RoomCard'
import Loader from '../components/Loader'
import RatingStars from '../components/RatingStars'
import { useAuth } from '../context/AuthContext'

export default function HotelDetail() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = useState(null)
  const [reviews, setReviews] = useState(null)
  const { user } = useAuth()
  const [form, setForm] = useState({ checkInDate: '', checkOutDate: '', guests: 1 })

  useEffect(() => {
    getHotelById(id).then(setHotel).catch(()=>setHotel({}))
    getRoomsByHotel(id).then(setRooms).catch(()=>setRooms([]))
    getReviewsByHotel(id).then(setReviews).catch(()=>setReviews([]))
  }, [id])

  const onBook = async (room) => {
    if (!user) return alert('Please login first.')
    if (!form.checkInDate || !form.checkOutDate) return alert('Select check-in and check-out dates.')
    const payload = {
      userId: user.id,
      roomId: room.id,
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate,
      guests: Number(form.guests)
    }
    try {
      await createBooking(payload)
      alert('Booking created')
    } catch (e) {
      console.error(e)
      alert('Booking failed')
    }
  }

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const submitReview = async () => {
    if (!user) return alert('Please login first.')
    try {
      await createReview({ hotelId: Number(id), userId: user.id, rating, comment })
      setComment(''); setRating(5)
      const fresh = await getReviewsByHotel(id)
      setReviews(fresh)
    } catch (e) {
      console.error(e)
      alert('Failed to submit review')
    }
  }

  if (!hotel || !rooms || !reviews) return <Loader />

  return (
    <div>
      <h1>{hotel.name || hotel.hotelName || 'Hotel'}</h1>
      <p className="muted">{hotel.address || hotel.location || ''}</p>

      <div className="card" style={{margin:'1rem 0'}}>
        <h3>Book a room</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'.75rem'}}>
          <div>
            <label>Check-in</label>
            <input type="date" value={form.checkInDate} onChange={e=>setForm({...form, checkInDate:e.target.value})} />
          </div>
          <div>
            <label>Check-out</label>
            <input type="date" value={form.checkOutDate} onChange={e=>setForm({...form, checkOutDate:e.target.value})} />
          </div>
          <div>
            <label>Guests</label>
            <input type="number" min="1" value={form.guests} onChange={e=>setForm({...form, guests:e.target.value})} />
          </div>
        </div>
      </div>

      <h2>Rooms</h2>
      <div className="grid">
        {rooms.map(r => <RoomCard key={r.id} room={r} onBook={onBook} />)}
      </div>

      <h2 style={{marginTop:'2rem'}}>Reviews</h2>
      <div className="card" style={{margin:'1rem 0'}}>
        <RatingStars value={rating} onChange={setRating} />
        <textarea rows="3" placeholder="Write your review..." value={comment} onChange={e=>setComment(e.target.value)} />
        <button className="btn" onClick={submitReview}>Submit Review</button>
      </div>
      {reviews.length === 0 && <div className="muted">No reviews yet.</div>}
      {reviews.map((rv, idx) => (
        <div key={idx} className="card" style={{marginBottom:'.5rem'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <strong>Rating: {'★'.repeat(rv.rating || 0)}</strong>
            <span className="muted">{rv.createdAt ? new Date(rv.createdAt).toLocaleDateString() : ''}</span>
          </div>
          <p>{rv.comment}</p>
        </div>
      ))}
    </div>
  )
}
