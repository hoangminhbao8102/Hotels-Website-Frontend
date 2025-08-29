import React, { useEffect, useState } from 'react'
import { getServices, createServiceItem, deleteServiceItem } from '../api/serviceService'

export default function Services() {
  const [items, setItems] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const refresh = () => getServices().then(setItems).catch(()=>setItems([]))

  useEffect(() => { refresh() }, [])

  const add = async () => {
    if (!name) return
    try {
      await createServiceItem({ name, price: Number(price) })
      setName(''); setPrice(''); refresh()
    } catch (e) { alert('Failed to add') }
  }

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return
    await deleteServiceItem(id); refresh()
  }

  if (!items) return <div>Loading...</div>

  return (
    <div>
      <h1>Services</h1>
      <div className="card" style={{margin:'1rem 0'}}>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
        <label>Price</label>
        <input type="number" value={price} onChange={e=>setPrice(e.target.value)} />
        <button className="btn" onClick={add} style={{marginTop:'.5rem'}}>Add</button>
      </div>
      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th></th></tr></thead>
        <tbody>
          {items.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.price}</td>
              <td><button className="btn danger" onClick={() => remove(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
