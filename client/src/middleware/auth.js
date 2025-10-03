// src/auth.js
export const AuthService = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token') // or any auth check logic
  },
}
