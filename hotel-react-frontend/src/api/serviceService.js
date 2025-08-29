import api from './axiosClient'

export const getServices = () => api.get('/api/Service').then(r => r.data)
export const createServiceItem = (payload) => api.post('/api/Service', payload).then(r => r.data)
export const deleteServiceItem = (id) => api.delete(`/api/Service/${id}`).then(r => r.data)
