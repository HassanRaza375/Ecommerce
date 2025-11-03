import api from './api'

export const getWishList = (id) => api.get(`/wishList/${id}`)
export const createWishList = (id, data) => api.post(`/wishList/add/${id}`, data)
export const deleteWishListById = (id, data) => api.delete(`/wishList/remove/${id}`, { data })
export const clearWishList = () => api.delete(`/wishList/clear`)
