'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Loader2 } from 'lucide-react'

import { useAuth } from '@/lib/hooks/useAuth'
import { peopleAPI } from '@/lib/api/people'
import { Button } from '@/components/ui/button'
import { PersonForm } from '@/components/people/PersonForm'

export default function EditPersonPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const personId = params?.id
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  const personQuery = useQuery({
    queryKey: ['person', personId],
    queryFn: () => peopleAPI.getPerson(personId!),
    enabled: isAuthenticated && Boolean(personId),
  })

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
      </div>
    )
  }

  if (personQuery.isLoading || !personQuery.data) {
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
        <Link href={`/reports/${personQuery.data.report_id}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to report
        </Link>
      </Button>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Update Person
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Edit follow-up details
          </h1>
        </div>
        <PersonForm
          reportId={personQuery.data.report_id}
          initialData={personQuery.data}
        />
      </div>
    </div>
  )
}

