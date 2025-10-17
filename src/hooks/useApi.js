import { useState } from 'react'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const callApi = async (apiCall, options = {}) => {
    const { showLoading = true, errorMessage = 'An error occurred' } = options
    
    try {
      if (showLoading) setLoading(true)
      setError(null)
      const result = await apiCall()
      return result
    } catch (err) {
      const message = err.response?.data?.message || errorMessage
      setError(message)
      throw err
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  return {
    loading,
    error,
    callApi,
    clearError: () => setError(null)
  }
}