import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '@/lib/api/auth'
import { tokenStorage } from '@/lib/utils/token'
import type { AuthState, User, LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/types/auth'
import { AxiosError, isAxiosError } from 'axios'

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const storedToken = tokenStorage.getAccessToken()
  const storedRefreshToken = tokenStorage.getRefreshToken()
  const storedUser = tokenStorage.getUser()
  
  if (storedToken && storedUser) {
    initialState.accessToken = storedToken
    initialState.refreshToken = storedRefreshToken
    initialState.user = storedUser
    initialState.isAuthenticated = true
  }
}

// Async Thunks
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials)

      return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        user: response.user,
      }
    } catch (err: unknown) {
        if (isAxiosError(err)) {
          const error = err as AxiosError
          return rejectWithValue((error.response?.data as { detail?: string } | undefined)?.detail || 'Login failed')
        }
  
        return rejectWithValue('Login failed')
      }
  }
)

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const user = await authAPI.register(userData)
      return user
    } catch (err: unknown) {
        if (isAxiosError(err)) {
          const error = err as AxiosError
          return rejectWithValue((error.response?.data as { detail?: string } | undefined)?.detail || 'Login failed')
        }
  
        return rejectWithValue('Login failed')
      }
  }
)

export const forgotPasswordAsync = createAsyncThunk(
  'auth/forgotPassword',
  async (email: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      await authAPI.forgotPassword(email)
      return { message: 'Password reset link sent to your email' }
    } catch (err: unknown) {
        if (isAxiosError(err)) {
          const error = err as AxiosError
          return rejectWithValue((error.response?.data as { detail?: string } | undefined)?.detail || 'Login failed')
        }
  
        return rejectWithValue('Login failed')
      }
  }
)

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (
    payload: ResetPasswordRequest,
    { rejectWithValue }
  ) => {
    try {
      await authAPI.resetPassword(payload)
      return { message: 'Password reset successful' }
    } catch (err: unknown) {
        if (isAxiosError(err)) {
          const error = err as AxiosError
          return rejectWithValue((error.response?.data as { detail?: string } | undefined)?.detail || 'Login failed')
        }
  
        return rejectWithValue('Login failed')
      }
  }
)


// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: User }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
      state.isAuthenticated = true
      state.error = null
      
      // Persist to localStorage
      tokenStorage.setAccessToken(action.payload.accessToken)
      tokenStorage.setRefreshToken(action.payload.refreshToken)
      tokenStorage.setUser(action.payload.user)
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.error = null
      
      // Clear localStorage
      tokenStorage.clearAll()
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.isAuthenticated = true
        // Note: You'll need to fetch user data separately or include it in login response
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Register
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        // Registration doesn't automatically log in - user needs to login
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Forgot Password
    builder
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
    
    // Reset Password
    builder
      .addCase(resetPasswordAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
});

export const { setCredentials, logout, clearError } = authSlice.actions
export default authSlice.reducer