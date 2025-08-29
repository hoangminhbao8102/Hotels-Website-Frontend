import api from './axiosClient'

export const getRoomsByHotel = (hotelId) => api.get(`/api/Room/hotel/${hotelId}`).then(r => r.data)
export const createRoom = (payload) => api.post('/api/Room', payload).then(r => r.data)
export const patchRoomStatus = (id, status) => api.patch(`/api/Room/${id}/status`, { status }).then(r => r.data)
