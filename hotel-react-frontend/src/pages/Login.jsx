import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/userService'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login: setSession } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password })
      // Expecting {data, message} or {token, user}
      const payload = res?.data && res?.data?.token ? res.data : res
      if (!payload?.token) {
        alert('Unexpected response from server. Please adjust mapping in Login.jsx')
        return
      }
      setSession(payload)
      navigate('/')
    } catch (e) {
      console.error(e)
      alert('Login failed')
    }
  }

  return (
    <div style={{maxWidth: 420, margin: '2rem auto'}} className="card">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn" type="submit" style={{marginTop:'.75rem'}}>Login</button>
      </form>
    </div>
  )
}
