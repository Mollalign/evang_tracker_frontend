'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Users, ArrowUpRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

import { peopleAPI } from '@/lib/api/people'
import { useAuth } from '@/lib/hooks/useAuth'
import { Person } from '@/types/person'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PeoplePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  const peopleQuery = useQuery({
    queryKey: ['people'],
    queryFn: () => peopleAPI.listPeople(),
    enabled: isAuthenticated,
  })

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
      </div>
    )
  }

  const people = peopleQuery.data ?? []

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-300">
            People
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Individuals encountered
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Every name is a story worth shepherding. Keep tabs on next steps.
          </p>
        </div>
        <Button asChild>
          <Link href="/reports">
            <Users className="h-4 w-4" />
            Add from report
          </Link>
        </Button>
      </div>

      {peopleQuery.isLoading ? (
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading contacts...
        </div>
      ) : people.length === 0 ? (
        <Card className="border-dashed glass-panel">
          <CardHeader>
            <CardTitle>No people yet</CardTitle>
            <CardDescription>
              Add people directly from a report after an outreach encounter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/reports">Browse reports</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {people.map((person: Person) => (
            <Card
              key={person.id}
              className="hover:shadow-lg transition-shadow glass-panel"
            >
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>{person.full_name}</CardTitle>
                  <CardDescription>
                    {person.phone_number || 'No phone'}
                  </CardDescription>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {person.status}
                </span>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Linked report
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link href={`/reports/${person.report_id}`}>
                      View report
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="flex-1"
                  >
                    <Link href={`/people/${person.id}/edit`}>
                      Edit
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}

