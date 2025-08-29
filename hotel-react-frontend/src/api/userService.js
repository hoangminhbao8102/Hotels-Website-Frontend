import api from './axiosClient'

export const register = (payload) => api.post('/api/User/register', payload).then(r => r.data)
export const login = (payload) => api.post('/api/User/login', payload).then(r => r.data)
// NOTE: If your API returns a ResponseDto, components should handle .data and .message accordingly.
export const getUser = (id) => api.get(`/api/User/${id}`).then(r => r.data)
export const getAllUsers = () => api.get('/api/User').then(r => r.data)
