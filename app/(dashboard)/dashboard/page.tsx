'use client'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { tokenStorage } from '@/lib/utils/token'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

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

  // Dummy data for demonstration
  const stats = [
    { label: 'Total Evangelism Records', value: '24', change: '+12%', icon: '📊' },
    { label: 'This Month', value: '8', change: '+3', icon: '📅' },
    { label: 'Active Evangelists', value: '15', change: '+2', icon: '👥' },
    { label: 'Success Rate', value: '92%', change: '+5%', icon: '✅' },
  ]

  const recentActivities = [
    { id: 1, name: 'John Doe', action: 'Added new evangelism record', time: '2 hours ago', type: 'record' },
    { id: 2, name: 'Jane Smith', action: 'Updated profile information', time: '5 hours ago', type: 'profile' },
    { id: 3, name: 'Mike Johnson', action: 'Completed evangelism session', time: '1 day ago', type: 'record' },
    { id: 4, name: 'Sarah Williams', action: 'Joined the team', time: '2 days ago', type: 'team' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.full_name || 'User'}! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening with your evangelism tracking today.</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {activity.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user?.full_name || 'User'}</p>
                  <p className="text-sm text-gray-600">{user?.email || 'No email'}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">{user?.role || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-left">
              <span className="text-2xl">➕</span>
              <div>
                <p className="font-semibold text-gray-900">Add New Record</p>
                <p className="text-sm text-gray-600">Create evangelism record</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-left">
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-semibold text-gray-900">View Records</p>
                <p className="text-sm text-gray-600">Browse all records</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-left">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-semibold text-gray-900">View Reports</p>
                <p className="text-sm text-gray-600">Analytics & insights</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}