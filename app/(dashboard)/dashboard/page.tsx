'use client'

import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { tokenStorage } from '@/lib/utils/token'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check both Redux state and localStorage as fallback
    const token = tokenStorage.getAccessToken()
    const storedUser = tokenStorage.getUser()
    
    // If Redux state isn't ready yet but localStorage has tokens, wait a bit
    if (!isAuthenticated && token && storedUser) {
      // Give Redux time to rehydrate
      const timer = setTimeout(() => {
        setChecking(false)
        if (!isAuthenticated) {
          router.push('/login')
        }
      }, 500)
      return () => clearTimeout(timer)
    }
    
    // If no authentication at all, redirect immediately
    if (!isAuthenticated && !token) {
      setChecking(false)
      router.push('/login')
      return
    }
    
    // If authenticated, stop checking
    if (isAuthenticated) {
      setChecking(false)
    }
  }, [isAuthenticated, router])

  // Show loading while checking authentication
  if (checking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user?.full_name}!</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  )
}