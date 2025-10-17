import { apiService } from './api'

export const authService = {
  async login(email, password) {
    const response = await apiService.post('/users/login', { email, password })
    return response
  },

  async register(username, email, password) {
    const response = await apiService.post('/users/register', { username, email, password })
    return response
  },

  async getProfile() {
    const response = await apiService.get('/users/profile')
    return response.user
  },

  async logout() {
    // Client-side logout - just remove token
    localStorage.removeItem('token')
  }
}