'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'
import { Loader2, ArrowRight, Activity, Sunrise } from 'lucide-react'

import { useAuth } from '@/lib/hooks/useAuth'
import { reportsAPI } from '@/lib/api/reports'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Force TS to recognize repented exists ALWAYS
type TimelineRow = {
  month: string
  heard: number
  interested: number
  accepted: number
  repented: number
}

export default function InsightsPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  const reportsQuery = useQuery({
    queryKey: ['reports', 'insights'],
    queryFn: reportsAPI.listReports,
    enabled: isAuthenticated,
  })

  const timelineData: TimelineRow[] = useMemo(() => {
    // No DB data → fallback demo timeline
    if (!reportsQuery.data || reportsQuery.data.length === 0) {
      return [
        { month: 'Jan', heard: 40, interested: 16, accepted: 8, repented: 4 },
        { month: 'Feb', heard: 55, interested: 20, accepted: 12, repented: 6 },
        { month: 'Mar', heard: 48, interested: 18, accepted: 10, repented: 5 },
        { month: 'Apr', heard: 72, interested: 26, accepted: 18, repented: 9 },
      ]
    }

    // Group reports by month
    const grouped = new Map<string, TimelineRow>()

    reportsQuery.data.forEach((report) => {
      const month = new Date(report.date).toLocaleString('en', {
        month: 'short',
      })

      if (!grouped.has(month)) {
        grouped.set(month, {
          month,
          heard: 0,
          interested: 0,
          accepted: 0,
          repented: 0,
        })
      }

      const row = grouped.get(month)!
      row.heard += report.heard_count
      row.interested += report.interested_count
      row.accepted += report.accepted_count
      row.repented += report.repented_count
    })

    return Array.from(grouped.values())
  }, [reportsQuery.data])

  const conversionTrend = useMemo(() => {
    return timelineData.map((row) => ({
      month: row.month,
      interestRate: row.heard ? +(row.interested / row.heard).toFixed(2) : 0,
      commitmentRate: row.heard ? +(row.accepted / row.heard).toFixed(2) : 0,
    }))
  }, [timelineData])

  if (!isAuthenticated && !isLoading) {
    router.replace('/login')
    return null
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-10 pb-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header Section */}
      <section className="rounded-[36px] bg-linear-to-br from-violet-500 via-fuchsia-500 to-amber-400 p-1 shadow-[0_30px_80px_rgba(99,102,241,0.35)]">
        <div className="flex flex-col gap-6 rounded-[34px] bg-white/85 p-8 text-slate-800 lg:flex-row lg:items-center lg:justify-between dark:bg-slate-900/80 dark:text-white">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/80">
              Revival dashboard
            </p>
            <h1 className="font-(--font-playfair) text-4xl leading-tight">
              Insights that help you shepherd the harvest with beauty and care.
            </h1>
            <p className="text-sm text-slate-700/80 dark:text-slate-200/80">
              Visualize momentum, celebrate conversions, and identify where to
              send care teams next.
            </p>
          </div>
          <Button
            asChild
            className="mt-auto bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
          >
            <Link href="/reports" className="gap-2">
              Go to reports
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
        {/* Monthly Impact Chart */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-violet-500" />
              Monthly impact
            </CardTitle>
            <CardDescription>
              Outreach reach vs. heart response across the year
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorHeard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInterested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.8)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="heard"
                  stroke="#7C3AED"
                  fillOpacity={1}
                  fill="url(#colorHeard)"
                />
                <Area
                  type="monotone"
                  dataKey="interested"
                  stroke="#F59E0B"
                  fillOpacity={1}
                  fill="url(#colorInterested)"
                />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Trend Chart */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-amber-500" />
              Conversion quality
            </CardTitle>
            <CardDescription>
              Interest vs. commitment trend throughout the year.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis
                  tickFormatter={(value) => `${value * 100}%`}
                  stroke="#94A3B8"
                />
                <Tooltip
                  formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                  contentStyle={{
                    borderRadius: 16,
                    background: 'rgba(15,23,42,0.85)',
                    color: '#F8FAFC',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="interestRate"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="commitmentRate"
                  stroke="#F43F5E"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Stats Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: 'Average interest rate',
            value: `${Math.round(
              conversionTrend.reduce(
                (acc, curr) => acc + curr.interestRate,
                0
              ) /
                conversionTrend.length -
                0.0001
            ) * 100 || 42}%`,
            meta: 'vs total reached',
          },
          {
            title: 'Commitments per month',
            value: `${Math.round(
              timelineData.reduce((acc, row) => acc + row.accepted, 0) /
                timelineData.length || 12
            )}`,
            meta: 'avg salvations',
          },
          {
            title: 'Ready for discipleship',
            value: `${Math.round(
              timelineData.reduce((acc, row) => acc + row.repented, 0)
            ) || 8}`,
            meta: 'need follow-up',
          },
          {
            title: 'Field volunteers active',
            value: reportsQuery.data ? reportsQuery.data.length : 16,
            meta: 'submitted reports',
          },
        ].map((card) => (
          <Card key={card.title} className="glass-panel">
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-4xl">{card.value}</CardTitle>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {card.meta}
              </p>
            </CardHeader>
          </Card>
        ))}
      </section>

      {/* No Reports */}
      {reportsQuery.data?.length === 0 && (
        <Card className="glass-panel border-dashed">
          <CardHeader>
            <CardTitle>No reports discovered</CardTitle>
            <CardDescription>
              Once reports are logged you’ll see the Spirit-led trends here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/reports/create">
                Start logging now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
