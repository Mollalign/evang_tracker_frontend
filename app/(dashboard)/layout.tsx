'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings2,
  Sparkles,
  SunMedium,
  Users2,
  X,
} from 'lucide-react'

import { useAuth } from '@/lib/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'People', href: '/people', icon: Users2 },
  { label: 'Insights', href: '/insights', icon: Sparkles },
  { label: 'Settings', href: '/settings', icon: Settings2 },
] as const

type ThemeMode = 'light' | 'dark'

const resolveInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('et-theme')
  if (stored === 'dark' || stored === 'light') {
    return stored
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function NavigationLinks({
  pathname,
  onNavigate,
}: {
  pathname?: string | null
  onNavigate?: () => void
}) {
  return (
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
            onClick={onNavigate}
            className={cn(
              'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold tracking-[0.08em] uppercase transition-all',
              isActive
                ? 'bg-white text-primary shadow-[0_15px_35px_rgba(109,74,255,0.15)] dark:bg-white/10 dark:text-primary-foreground'
                : 'text-foreground/60 hover:bg-white/60 dark:hover:bg-white/10'
            )}
          >
            <span
              className={cn(
                'flex size-10 items-center justify-center rounded-2xl border border-white/30 bg-white/60 shadow-inner text-primary transition',
                isActive && 'border-transparent bg-primary/10 text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(min-width: 1024px)').matches
  })
  const [theme, setTheme] = useState<ThemeMode>(() => resolveInitialTheme())

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches)
      if (event.matches) {
        setIsMobileNavOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('et-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  const currentSection =
    navItems.find((item) => pathname?.startsWith(item.href))?.label ||
    'Dashboard'

  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex min-h-screen">
        <aside className="relative hidden w-[290px] flex-col border-r border-border/40 bg-sidebar/80 px-6 py-8 backdrop-blur-3xl lg:flex">
          <div className="space-y-10">
            <div className="rounded-[1.75rem] border border-white/30 bg-white/70 p-5 shadow-[0_25px_60px_rgba(20,18,53,0.15)] dark:bg-white/5 dark:text-foreground">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-semibold">
                  ET
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                    Evangelism
                  </p>
                  <p className="text-xl font-[var(--font-playfair)] leading-tight">
                    Tracker
                  </p>
                  <p className="text-xs tracking-[0.2em] text-muted-foreground">
                    Reach • Disciple • Grow
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Navigation
              </p>
              <NavigationLinks
                pathname={pathname}
                onNavigate={() => setIsMobileNavOpen(false)}
              />
            </div>
          </div>

          <div className="mt-auto rounded-[1.5rem] border border-white/20 bg-white/80 p-5 shadow-[0_20px_55px_rgba(20,18,53,0.12)] dark:bg-card/60">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Signed in as
            </p>
            <p className="mt-2 font-[var(--font-playfair)] text-lg text-foreground">
              {user?.full_name || 'Faithful Servant'}
            </p>
            <p className="text-sm text-muted-foreground">{user?.email || '—'}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full gap-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <div
          className={cn(
            'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden',
            isMobileNavOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          onClick={() => setIsMobileNavOpen(false)}
        >
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-80 bg-sidebar/95 px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] transition-transform',
              isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Menu
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-8 space-y-4">
              <NavigationLinks
                pathname={pathname}
                onNavigate={() => setIsMobileNavOpen(false)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/50 bg-card/70 backdrop-blur-2xl">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
              <div className="flex items-center gap-3">
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
                  <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                    Control center
                  </p>
                  <p className="text-2xl font-[var(--font-playfair)] leading-tight text-foreground">
                    {currentSection}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-border/60 bg-card/80 text-foreground shadow-[0_8px_25px_rgba(20,18,53,0.08)] hover:scale-105"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <SunMedium className="h-4 w-4" />
                  )}
                </Button>
                <Button asChild size="sm" className="hidden sm:inline-flex">
                  <Link href="/reports/create" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New report
                  </Link>
                </Button>
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-semibold text-foreground">
                    {user?.full_name || 'User'}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {user?.role ?? '—'}
                  </span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                  {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-12">
            <div className="mx-auto w-full max-w-6xl space-y-8">{children}</div>
          </main>
        </div>
      </div>

      {!isDesktop && (
        <Button
          asChild
          size="lg"
          className="fixed bottom-6 right-6 z-30 shadow-[0_25px_55px_rgba(20,18,53,0.35)]"
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

