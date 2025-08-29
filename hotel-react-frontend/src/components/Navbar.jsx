import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="inner container">
        <div className="brand"><Link to="/">🏨 Hotel</Link></div>
        <div className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/hotels">Hotels</NavLink>
          {user && <NavLink to="/bookings">My Bookings</NavLink>}
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          {user && <NavLink to="/admin">Admin</NavLink>}
        </div>
        <div className="links">
          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="btn">Register</NavLink>
            </>
          ) : (
            <>
              <span className="badge">Hi, {user.fullName || user.email || 'User'}</span>
              <button onClick={handleLogout} className="btn secondary">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
