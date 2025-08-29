import React, { useEffect, useState } from 'react'
import { getEmployeesByHotel, createEmployee, deleteEmployee } from '../api/employeeService'

export default function Employees() {
  const [hotelId, setHotelId] = useState('')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ fullName:'', position:'' })

  const refresh = (hid) => {
    if (!hid) return
    getEmployeesByHotel(hid).then(setItems).catch(()=>setItems([]))
  }

  useEffect(() => { if (hotelId) refresh(hotelId) }, [hotelId])

  const add = async () => {
    if (!hotelId) return alert('Enter hotelId first')
    await createEmployee({ hotelId: Number(hotelId), fullName: form.fullName, position: form.position })
    setForm({ fullName:'', position:'' })
    refresh(hotelId)
  }

  const remove = async (id) => {
    if (!confirm('Delete this employee?')) return
    await deleteEmployee(id)
    refresh(hotelId)
  }

  return (
    <div>
      <h1>Employees</h1>
      <div className="card" style={{margin:'1rem 0'}}>
        <label>Hotel ID</label>
        <input value={hotelId} onChange={e=>setHotelId(e.target.value)} placeholder="Enter hotel id..." />
      </div>
      <div className="card" style={{margin:'1rem 0'}}>
        <h3>Add employee</h3>
        <label>Full name</label>
        <input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} />
        <label>Position</label>
        <input value={form.position} onChange={e=>setForm({...form, position:e.target.value})} />
        <button className="btn" onClick={add} style={{marginTop:'.5rem'}}>Add</button>
      </div>
      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Position</th><th></th></tr></thead>
        <tbody>
          {items.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.fullName || emp.name}</td>
              <td>{emp.position}</td>
              <td><button className="btn danger" onClick={()=>remove(emp.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
