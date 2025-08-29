import React, { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const profile = localStorage.getItem('profile')
    return token && profile ? JSON.parse(profile) : null
  })

  const login = (payload) => {
    // payload is { token, user: { id, fullName, email, role } } or similar
    localStorage.setItem('token', payload.token)
    localStorage.setItem('profile', JSON.stringify(payload.user))
    setUser(payload.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    setUser(null)
  }

  const value = useMemo(() => ({ user, setUser, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
