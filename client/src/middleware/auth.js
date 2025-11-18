// src/auth.js
export const AuthService = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },
  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
}
