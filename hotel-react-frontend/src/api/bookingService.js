import api from './axiosClient'

export const createBooking = (payload) => api.post('/api/Booking', payload).then(r => r.data)
export const getBookingsByUser = (userId) => api.get(`/api/Booking/user/${userId}`).then(r => r.data)
export const cancelBooking = (bookingId) => api.patch(`/api/Booking/${bookingId}/cancel`).then(r => r.data)
