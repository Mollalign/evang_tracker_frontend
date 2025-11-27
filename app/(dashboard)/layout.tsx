'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings2,
  Sparkles,
  SunMedium,
  Moon,
  Users2,
  X,
} from 'lucide-react'

import { useAuth } from '@/lib/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    label: 'People',
    href: '/people',
    icon: Users2,
  },
  {
    label: 'Insights',
    href: '/insights',
    icon: Sparkles,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings2,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches =
        'matches' in event ? event.matches : (event as MediaQueryList).matches
      setIsDesktop(matches)
      if (matches) {
        setIsMobileNavOpen(false)
      }
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener('change', handleChange as any)
    return () =>
      mediaQuery.removeEventListener('change', handleChange as any)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('et-theme')
    const prefersDark =
      stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('et-theme', theme)
  }, [theme])

  useEffect(() => {
    setIsMobileNavOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const NavLinks = () => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href ||
          (item.href !== '/dashboard' && pathname?.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all',
              item.disabled
                ? 'opacity-50 pointer-events-none'
                : 'hover:bg-slate-100 hover:text-slate-900',
              isActive
                ? 'bg-slate-900 text-white hover:bg-slate-900 hover:text-white'
                : 'text-slate-500'
            )}
            onClick={() => setIsMobileNavOpen(false)}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-slate-950/5">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white/80 lg:backdrop-blur">
          <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-semibold">
              ET
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Evangelism Tracker
              </p>
              <p className="text-xs text-slate-500">Reach • Disciple • Grow</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">
              Navigation
            </p>
            <NavLinks />
          </div>
          <div className="border-t border-slate-200 px-6 py-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Signed in as
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-slate-500">{user?.email || '—'}</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3 w-full gap-2"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <div
          className={cn(
            'fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity lg:hidden',
            isMobileNavOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          onClick={() => setIsMobileNavOpen(false)}
        >
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-72 bg-white p-6 shadow-2xl transition-transform',
              isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">Menu</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-6">
              <NavLinks />
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsMobileNavOpen(true)}
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Control center
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {navItems.find((item) => pathname?.startsWith(item.href))
                      ?.label || 'Dashboard'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-white/40 bg-white/70 text-slate-700 shadow-sm hover:scale-105 dark:bg-slate-900/70 dark:text-white"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <SunMedium className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="hidden sm:inline-flex bg-slate-900 text-white hover:bg-slate-800"
                >
                  <Link href="/reports/create" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New report
                  </Link>
                </Button>
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-900">
                    {user?.full_name || 'User'}
                  </span>
                  <span className="text-xs text-slate-500 capitalize">
                    {user?.role ?? '—'}
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-slate-50 px-4 py-8 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto space-y-8">{children}</div>
          </main>
        </div>
      </div>
      {!isDesktop && (
        <Button
          asChild
          size="lg"
          className="lg:hidden fixed bottom-6 right-6 z-30 shadow-lg bg-slate-900 text-white hover:bg-slate-800"
        >
          <Link href="/reports/create" className="gap-2">
            <Plus className="h-5 w-5" />
            Report
          </Link>
        </Button>
      )}
    </div>
  )
}

