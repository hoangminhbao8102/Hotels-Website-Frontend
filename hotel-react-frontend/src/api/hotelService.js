import api from './axiosClient'

export const getHotels = () => api.get('/api/Hotel').then(r => r.data)
export const getHotelById = (id) => api.get(`/api/Hotel/${id}`).then(r => r.data)
export const createHotel = (payload) => api.post('/api/Hotel', payload).then(r => r.data)
export const deleteHotel = (id) => api.delete(`/api/Hotel/${id}`).then(r => r.data)
