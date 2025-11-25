'use client'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
  }
}