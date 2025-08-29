import axios from 'axios'
import { API_BASE_URL, API_FALLBACK_URL } from '../utils/constants'

// Base axios instance with simple fallback on network error
const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
})

// Attach token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Fallback to http://localhost:5142 if https://localhost:7186 fails to connect
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (!original || original.__retried) throw error
    if (error.code === 'ERR_NETWORK' && instance.defaults.baseURL !== API_FALLBACK_URL) {
      original.__retried = true
      const fallback = axios.create({
        baseURL: API_FALLBACK_URL,
        headers: instance.defaults.headers
      })
      try {
        return await fallback.request(original)
      } catch (e) {
        throw e
      }
    }
    throw error
  }
)

export default instance
