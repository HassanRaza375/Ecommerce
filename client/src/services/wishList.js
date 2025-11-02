import api from './api'

export const getWishList = () => api.get('/wishList')
export const createWishList = (data) => api.post('/wishList', data)
export const deleteWishList = (id) => api.delete(`/wishList/${id}`)
