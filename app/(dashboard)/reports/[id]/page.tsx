'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Loader2,
  Trash2,
  User2,
  Users,
  Edit3,
} from 'lucide-react'
import { motion } from 'framer-motion'

import { reportsAPI } from '@/lib/api/reports'
import { peopleAPI } from '@/lib/api/people'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { PersonForm } from '@/components/people/PersonForm'
import { Person } from '@/types/person'

export default function ReportDetailsPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const reportId = params?.id
  const { isAuthenticated, isLoading } = useAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  const reportQuery = useQuery({
    queryKey: ['report', reportId],
    queryFn: () => reportsAPI.getReport(reportId!),
    enabled: isAuthenticated && Boolean(reportId),
  })

  const peopleQuery = useQuery({
    queryKey: ['people', reportId],
    queryFn: () => peopleAPI.listPeople({ reportId }),
    enabled: isAuthenticated && Boolean(reportId),
  })

  const deletePersonMutation = useMutation({
    mutationFn: (id: string) => peopleAPI.deletePerson(id),
    onSuccess: () => {
      toast.success('Person removed from report')
      queryClient.invalidateQueries({ queryKey: ['people', reportId] })
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Failed to delete person'
      toast.error(message)
    },
  })

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
      </div>
    )
  }

  if (reportQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading report details...
        </div>
      </div>
    )
  }

  if (!reportId || !reportQuery.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-lg font-semibold text-slate-800 mb-2">
          Report not found
        </p>
        <p className="text-sm text-slate-500 mb-4">
          The report you are looking for may have been removed.
        </p>
        <Button asChild>
          <Link href="/reports">Back to reports</Link>
        </Button>
      </div>
    )
  }

  const report = reportQuery.data
  const people = peopleQuery.data ?? []

  const statBlocks = [
    { label: 'Heard', value: report.heard_count, color: 'bg-blue-100 text-blue-700' },
    {
      label: 'Interested',
      value: report.interested_count,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      label: 'Accepted',
      value: report.accepted_count,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      label: 'Repented',
      value: report.repented_count,
      color: 'bg-violet-100 text-violet-700',
    },
  ]

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Button
        variant="ghost"
        className="gap-2 text-slate-600 hover:text-slate-900 w-fit dark:text-slate-300"
        asChild
      >
          <Link href="/reports">
            <ArrowLeft className="h-4 w-4" />
            Back to reports
          </Link>
      </Button>

      <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-6 dark:bg-slate-900/70 dark:border-white/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Outreach Report
              </p>
              <h1 className="text-4xl font-bold text-slate-900 mt-1">
                {report.outreach_name}
              </h1>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(report.date), 'PP')}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {report.location}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/reports/${reportId}/edit`}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit report
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statBlocks.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800/60"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {report.notes && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                Field Notes
              </p>
              <p className="text-slate-700 leading-relaxed">{report.notes}</p>
            </div>
          )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 dark:bg-slate-900/70 dark:border-white/10">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  People Met
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {people.length} person{people.length === 1 ? '' : 's'}
                </h2>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/reports/${reportId}/people/create`}>
                  <User2 className="h-4 w-4 mr-2" />
                  Quick add form
                </Link>
              </Button>
            </div>

            {peopleQuery.isLoading ? (
              <div className="flex items-center gap-2 text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading people...
              </div>
            ) : people.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-sm text-slate-500">
                No people have been associated with this report yet. Use the
                form on the right to add follow-up contacts.
              </div>
            ) : (
              <div className="space-y-3">
                {people.map((person: Person) => {
                  const statusColor =
                    person.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-700'
                      : person.status === 'repented'
                      ? 'bg-violet-100 text-violet-700'
                      : 'bg-amber-100 text-amber-700'
                  return (
                  <div
                    key={person.id}
                    className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-slate-100 p-4 bg-slate-50 dark:border-white/10 dark:bg-slate-800/50"
                  >
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {person.full_name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        {person.phone_number || 'No phone number'}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-wide">
                        <span className={`px-3 py-1 rounded-full font-semibold ${statusColor}`}>
                          {person.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/people/${person.id}/edit`}>
                          <Users className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deletePersonMutation.mutate(person.id)}
                        disabled={deletePersonMutation.isPending}
                      >
                        {deletePersonMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )})}
              </div>
            )}
          </div>

          <aside className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 dark:bg-slate-900/70 dark:border-white/10">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Add Person
              </p>
              <h3 className="text-xl font-semibold text-slate-900">
                Follow-up contact
              </h3>
              <p className="text-sm text-slate-500">
                Document people you met so you or your team can follow up.
              </p>
            </div>
            <PersonForm reportId={reportId} />
          </aside>
      </section>
    </motion.div>
  )
}

