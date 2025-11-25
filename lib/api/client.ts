import axios from 'axios'
import { tokenStorage } from '@/lib/utils/token'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = tokenStorage.getRefreshToken()
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        // Refresh token
        const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {
          refresh_token: refreshToken,
        })

        const { access_token, refresh_token } = response.data

        // Update tokens
        tokenStorage.setAccessToken(access_token)
        tokenStorage.setRefreshToken(refresh_token)

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        tokenStorage.clearAll()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)