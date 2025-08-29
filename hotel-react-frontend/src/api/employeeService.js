import api from './axiosClient'

export const getEmployeesByHotel = (hotelId) => api.get(`/api/Employee/hotel/${hotelId}`).then(r => r.data)
export const createEmployee = (payload) => api.post('/api/Employee', payload).then(r => r.data)
export const deleteEmployee = (id) => api.delete(`/api/Employee/${id}`).then(r => r.data)
