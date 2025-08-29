import React, { useEffect, useState } from 'react'
import { createHotel, deleteHotel, getHotels } from '../api/hotelService'
import { createRoom, getRoomsByHotel, patchRoomStatus } from '../api/roomService'

export default function Admin() {
  const [hotels, setHotels] = useState([])
  const [formHotel, setFormHotel] = useState({ name:'', address:'' })
  const [selectedHotel, setSelectedHotel] = useState('')
  const [rooms, setRooms] = useState([])
  const [formRoom, setFormRoom] = useState({ name:'', type:'Standard', price: 0 })

  const refreshHotels = () => getHotels().then(setHotels).catch(()=>setHotels([]))

  useEffect(() => { refreshHotels() }, [])

  useEffect(() => {
    if (selectedHotel) getRoomsByHotel(selectedHotel).then(setRooms).catch(()=>setRooms([]))
  }, [selectedHotel])

  const addHotel = async () => {
    await createHotel(formHotel)
    setFormHotel({ name:'', address:'' })
    refreshHotels()
  }

  const removeHotel = async (id) => {
    if (!confirm('Delete this hotel?')) return
    await deleteHotel(id); refreshHotels()
  }

  const addRoom = async () => {
    if (!selectedHotel) return alert('Choose a hotel first')
    await createRoom({ ...formRoom, hotelId: Number(selectedHotel) })
    setFormRoom({ name:'', type:'Standard', price:0 })
    const fresh = await getRoomsByHotel(selectedHotel); setRooms(fresh)
  }

  const toggleStatus = async (room) => {
    const next = room.status === 'Available' ? 'Unavailable' : 'Available'
    await patchRoomStatus(room.id, next)
    const fresh = await getRoomsByHotel(selectedHotel); setRooms(fresh)
  }

  return (
    <div>
      <h1>Admin</h1>

      <div className="card" style={{margin:'1rem 0'}}>
        <h3>Create hotel</h3>
        <label>Name</label>
        <input value={formHotel.name} onChange={e=>setFormHotel({...formHotel, name:e.target.value})} />
        <label>Address</label>
        <input value={formHotel.address} onChange={e=>setFormHotel({...formHotel, address:e.target.value})} />
        <button className="btn" onClick={addHotel} style={{marginTop:'.5rem'}}>Create</button>
      </div>

      <h2>Hotels</h2>
      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Address</th><th></th></tr></thead>
        <tbody>
          {hotels.map(h => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.name || h.hotelName}</td>
              <td>{h.address}</td>
              <td><button className="btn danger" onClick={()=>removeHotel(h.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card" style={{margin:'1rem 0'}}>
        <h3>Rooms</h3>
        <label>Hotel</label>
        <select value={selectedHotel} onChange={e=>setSelectedHotel(e.target.value)}>
          <option value="">-- Select hotel --</option>
          {hotels.map(h => <option key={h.id} value={h.id}>{h.name || h.hotelName}</option>)}
        </select>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'.75rem', marginTop:'.75rem'}}>
          <div>
            <label>Name</label>
            <input value={formRoom.name} onChange={e=>setFormRoom({...formRoom, name:e.target.value})} />
          </div>
          <div>
            <label>Type</label>
            <input value={formRoom.type} onChange={e=>setFormRoom({...formRoom, type:e.target.value})} />
          </div>
          <div>
            <label>Price</label>
            <input type="number" value={formRoom.price} onChange={e=>setFormRoom({...formRoom, price:e.target.value})} />
          </div>
        </div>
        <button className="btn" onClick={addRoom} style={{marginTop:'.5rem'}}>Add room</button>
      </div>

      {selectedHotel && (
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Price</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rooms.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.type || r.roomType}</td>
                <td>{r.price}</td>
                <td><span className="badge">{r.status}</span></td>
                <td><button className="btn" onClick={()=>toggleStatus(r)}>Toggle status</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
