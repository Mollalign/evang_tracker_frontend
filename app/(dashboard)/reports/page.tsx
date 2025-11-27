'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'
import {
  FileText,
  Loader2,
  Plus,
  Trash2,
  Pencil,
  MapPin,
} from 'lucide-react'
import { motion } from 'framer-motion'

import { reportsAPI } from '@/lib/api/reports'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'
import { Report } from '@/types/report'

export default function ReportsPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, user } = useAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    queryFn: reportsAPI.listReports,
    enabled: isAuthenticated,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => reportsAPI.deleteReport(id),
    onSuccess: () => {
      toast.success('Report deleted')
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Failed to delete report'
      toast.error(message)
    },
  })

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Preparing your dashboard...
        </div>
      </div>
    )
  }

  const reports = reportsQuery.data ?? []

  const aggregate = reports.reduce(
    (acc, report) => {
      acc.heard += report.heard_count
      acc.interested += report.interested_count
      acc.accepted += report.accepted_count
      acc.repented += report.repented_count
      return acc
    },
    { heard: 0, interested: 0, accepted: 0, repented: 0 }
  )

  const StatCard = ({
    title,
    value,
    textClass,
  }: {
    title: string
    value: number
    textClass: string
  }) => (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-4 dark:border-white/10 dark:bg-slate-900/70">
      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold dark:text-slate-300">
        {title}
      </p>
      <p className={`text-3xl font-bold mt-2 ${textClass}`}>{value}</p>
    </div>
  )

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wide dark:text-slate-300">
              Evangelism Tracker
            </p>
            <h1 className="text-4xl font-bold text-slate-900 mt-2 dark:text-white">
              Outreach Reports
            </h1>
            <p className="text-slate-600 mt-1 dark:text-slate-300">
              {user?.role === 'admin'
                ? 'Review every report submitted across the mission.'
                : 'Keep tabs on your outreach impact and follow-ups.'}
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/reports/create">
              <Plus className="h-4 w-4" />
              Create Report
            </Link>
          </Button>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Heard"
            value={aggregate.heard}
            textClass="text-blue-600"
          />
          <StatCard
            title="Interested"
            value={aggregate.interested}
            textClass="text-amber-600"
          />
          <StatCard
            title="Accepted"
            value={aggregate.accepted}
            textClass="text-emerald-600"
          />
          <StatCard
            title="Repented"
            value={aggregate.repented}
            textClass="text-violet-600"
          />
      </section>

      <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">
              Recent Reports
            </h2>
            <p className="text-sm text-slate-500">
              {reports.length} report{reports.length === 1 ? '' : 's'} found
            </p>
          </div>

          {reportsQuery.isLoading ? (
            <div className="flex items-center gap-3 text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading reports...
            </div>
          ) : reportsQuery.isError ? (
            <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
              Unable to load reports. Please try again.
            </div>
          ) : reports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <FileText className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800">
                No reports yet
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Start documenting your outreach journeys to track impact and
                follow-up opportunities.
              </p>
              <Button asChild className="mt-6 gap-2">
                <Link href="/reports/create">
                  <Plus className="h-4 w-4" />
                  Create first report
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
          {reports.map((report: Report) => (
                <article
                  key={report.id}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 dark:bg-slate-900/70 dark:border-white/10"
                >
                  <div className="p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        {format(new Date(report.created_at), 'PPpp')}
                      </p>
                      <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                        {report.outreach_name}
                      </h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {report.location}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/reports/${report.id}`}>
                          View details
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/reports/${report.id}/edit`}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(report.id)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 px-6 py-4 grid grid-cols-2 md:grid-cols-4 text-sm dark:border-white/10">
                    <Metric label="Heard" value={report.heard_count} />
                    <Metric
                      label="Interested"
                      value={report.interested_count}
                    />
                    <Metric label="Accepted" value={report.accepted_count} />
                    <Metric label="Repented" value={report.repented_count} />
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>
    </motion.div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  )
}

