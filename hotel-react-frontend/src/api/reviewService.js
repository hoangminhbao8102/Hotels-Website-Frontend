import api from './axiosClient'

export const getReviewsByHotel = (hotelId) => api.get(`/api/Review/hotel/${hotelId}`).then(r => r.data)
export const createReview = (payload) => api.post('/api/Review', payload).then(r => r.data)
