'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Loader2,
  Plus,
  Sparkles,
  TrendingUp,
  Users2,
} from 'lucide-react'
import { motion } from 'framer-motion'

import { useAuth } from '@/lib/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const statHighlights = [
  {
    label: 'Total Reports',
    value: '24',
    change: '+12% vs last month',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    label: 'Individuals Reached',
    value: '812',
    change: '+94 people',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Follow-ups Scheduled',
    value: '36',
    change: '8 pending today',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    label: 'Volunteers Active',
    value: '15',
    change: '3 new this week',
    accent: 'from-violet-500 to-purple-500',
  },
]

const timeline = [
  {
    title: 'Downtown Outreach',
    meta: '18 people heard • 3 responded',
    time: '2h ago',
  },
  {
    title: 'University Chapel',
    meta: '40 students • 12 interested',
    time: 'Yesterday',
  },
  {
    title: 'Community Health Drive',
    meta: '56 people • 8 commitments',
    time: 'This week',
  },
]

const quickActions = [
  {
    title: 'Create report',
    description: 'Log a new outreach story',
    href: '/reports/create',
    icon: ClipboardList,
    accent: 'from-indigo-500/90 via-indigo-500 to-indigo-600',
  },
  {
    title: 'Add a person',
    description: 'Capture key follow-up info',
    href: '/reports',
    icon: Users2,
    accent: 'from-emerald-500/80 via-emerald-500 to-teal-500',
  },
  {
    title: 'Plan next outing',
    description: 'Schedule the next field day',
    href: '/dashboard?tab=insights',
    icon: CalendarClock,
    accent: 'from-amber-500/80 via-orange-500 to-orange-600',
    disabled: true,
  },
]

const insightTiles = [
  { label: 'Pending follow-ups', value: '08', meta: 'due this week' },
  { label: 'Notes awaiting review', value: '14', meta: 'assign to admin' },
  { label: 'People ready for class', value: '05', meta: 'discipleship' },
]

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login'
    }
  }, [isAuthenticated, isLoading])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-8 pb-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card className="bg-gradient-to-br from-[#FCE7F3] via-[#DDD6FE] to-[#FEF3C7] text-slate-900 shadow-[0_40px_90px_rgba(249,168,212,0.35)]">
          <CardHeader className="space-y-3">
            <CardDescription className="text-slate-500 uppercase tracking-[0.2em]">
              Welcome back
            </CardDescription>
            <CardTitle className="text-3xl">
              {user?.full_name || 'Team member'}, your mission field is ready.
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-700">
            <p className="text-sm leading-relaxed text-slate-600">
              Track every conversation, celebrate every testimony, and keep your
              team aligned around the Great Commission.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                variant="secondary"
                className="bg-white/90 text-slate-900 hover:bg-white"
              >
                <Link href="/reports/create">
                  <Plus className="h-4 w-4" />
                  Log new outreach
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="text-slate-700 hover:bg-white/50"
                onClick={logout}
              >
                Quick sign out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Weekly momentum
            </CardTitle>
            <CardDescription>
              Snapshot of engagements over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{item.meta}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.title}
              href={action.disabled ? '#' : action.href}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 dark:border-white/10 dark:bg-slate-900/70',
                action.disabled && 'pointer-events-none opacity-60'
              )}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className={`absolute -inset-8 blur-3xl bg-gradient-to-br ${action.accent}`}
                />
              </div>
              <div className="relative flex items-start gap-4">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${action.accent} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-base font-semibold text-slate-900">
                    {action.title}
                  </p>
                  <p className="text-sm text-slate-500">{action.description}</p>
                </div>
                {!action.disabled && (
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900" />
                )}
              </div>
            </Link>
          )
        })}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statHighlights.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-300">
              {stat.label}
            </p>
            <p className="text-3xl font-semibold text-slate-900 mt-2 dark:text-white">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
              {stat.change}
            </p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${stat.accent}`}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card className="shadow-lg glass-panel">
          <CardHeader>
            <CardTitle>Team pulse</CardTitle>
            <CardDescription>
              Who&rsquo;s on the field this week and what they&rsquo;re focused
              on.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                    {user?.full_name?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Evangelist {item}
                    </p>
                    <p className="text-xs text-slate-500">
                      Planning follow-up visits
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                  On mission
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-indigo-500" />
              Action center
            </CardTitle>
            <CardDescription>
              High priority follow-ups based on recent reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-100 p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">
                  Follow-up #{item}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Confirm discipleship path with new contact
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="mt-4"
                >
                  <Link href="/reports">View report</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {insightTiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {tile.label}
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">
                {tile.value}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-300">
                {tile.meta}
              </span>
            </div>
          </div>
        ))}
        <div className="rounded-3xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 text-sm text-slate-500">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Tip
          </div>
          <p className="mt-2">
            Create a rhythm: log reports immediately after outreach so the team
            can follow up while stories are fresh.
          </p>
        </div>
      </section>
    </motion.div>
  )
}