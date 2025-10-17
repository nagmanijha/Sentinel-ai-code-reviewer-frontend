const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiService {
  constructor() {
    this.baseURL = API_BASE
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    // Get token from localStorage
    const token = localStorage.getItem('token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      let data
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const text = await response.text()
        throw new Error(text || `HTTP error! status: ${response.status}`)
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API Request failed for:', endpoint, error)
      
      // If it's an authentication error, clear token and redirect to login
      if (error.message.includes('unauthorized') || error.message.includes('token') || error.message.includes('authentication')) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      
      throw error
    }
  }

  get(endpoint) {
    return this.request(endpoint)
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService()

// dashboard service methods
export const dashboardService = {
  async getStats() {
    const response = await apiService.get('/dashboard/stats')
    return response.data || response // Handle both response structures
  },

  async getProfile() {
    const response = await apiService.get('/dashboard/profile')
    return response.data || response
  },

  async getHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const response = await apiService.get(`/dashboard/history?${queryString}`)
    return response.data || response // Handle both response structures
  }
}