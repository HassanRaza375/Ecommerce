import api from './api'

export const getProducts = () => api.get('/products')
export const searchProducts = (data) => api.get('/products/search/ec', data)
export const getProductsCategories = () => api.get('/products/all/categories')
export const getProductById = (id) => api.get(`/products/${id}`)
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)
export const getFeaturedProducts = () => api.get('/products/featured/all')
export const createProductCategory = (data) => api.post('/products/categories/', data)

export const uploadProductImage = (data) => api.post('/upload/image', data)
export const deleteProductImage = (data) => api.post('/upload/delete/image', data)
