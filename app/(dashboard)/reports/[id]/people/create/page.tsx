'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Loader2 } from 'lucide-react'

import { useAuth } from '@/lib/hooks/useAuth'
import { reportsAPI } from '@/lib/api/reports'
import { Button } from '@/components/ui/button'
import { PersonForm } from '@/components/people/PersonForm'

export default function CreatePersonForReportPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const reportId = params?.id
  const { isAuthenticated, isLoading } = useAuth()

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

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        asChild
        className="gap-2 text-slate-600 w-fit dark:text-slate-300"
      >
        <Link href={`/reports/${reportId}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to report
        </Link>
      </Button>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Add Person
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Link to this outreach
          </h1>
          <p className="text-sm text-slate-500">
            {reportQuery.data
              ? `People connected to ${reportQuery.data.outreach_name}`
              : 'Document individuals you met during this outreach.'}
          </p>
        </div>
        <PersonForm reportId={reportId} />
      </div>
    </div>
  )
}

