import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/userService'

export default function Register() {
  const [form, setForm] = useState({ fullName:'', email:'', password: '' })
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(form)
      alert('Registered! Please login.')
      navigate('/login')
    } catch (e) {
      console.error(e)
      alert('Register failed')
    }
  }

  return (
    <div style={{maxWidth: 520, margin: '2rem auto'}} className="card">
      <h1>Create account</h1>
      <form onSubmit={onSubmit}>
        <label>Full name</label>
        <input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} required />
        <label>Email</label>
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <label>Password</label>
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <button className="btn" type="submit" style={{marginTop:'.75rem'}}>Register</button>
      </form>
    </div>
  )
}
