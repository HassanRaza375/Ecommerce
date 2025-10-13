import api from './api'

export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (data) => api.post('/auth/register', data)
export const ChangePassword = (id, data) => api.post(`/auth/changePassword/${id}`, data)
export const logout = () => api.post('/auth/logout')
export const allusers = () => api.get('/auth/allusers')
export const userById = (id) => api.get(`/auth/user/${id}`)
export const deleteById = (id) => api.delete(`/auth/deleteAccount/${id}`)
