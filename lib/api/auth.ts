import { apiClient } from './client'
import type { 
    LoginRequest, 
    LoginResponse, 
    RegisterRequest,
    User,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ResetPasswordResponse 
} from '@/types/auth';

export const authAPI = {
  // Login
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', data)
    return response.data
  },

  // Register
  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/api/auth/register', data)
    return response.data
  },

  // Refresh Token
  refreshToken: async (refreshToken: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>('/api/auth/refresh-token', refreshToken)
    return response.data
  },

  // Forgot Password
  forgotPassword: async (email: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post('/api/auth/forgot-password', { email })
    return response.data
  },

  // Reset Password
  resetPassword: async (payload: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post('/api/auth/reset-password', payload)
    return response.data
  },

  // Get Current User (if you have this endpoint)
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/auth/me')
    return response.data
  },
}