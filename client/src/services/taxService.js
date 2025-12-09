import api from './api'

export const getTax = () => api.get('/tax/all')
export const createTax = (data) => api.post('/tax/create/', data)
export const editTax = (id, data) => api.put(`/tax/edit/${id}`, data)
export const deleteTaxById = (id) => api.delete(`/tax/delete/${id}`)
