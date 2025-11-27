'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  ArrowLeftRight,
  Loader2,
  Phone,
  UserPlus,
  Users,
} from 'lucide-react'

import { personFormSchema } from '@/lib/utils/validation'
import { peopleAPI } from '@/lib/api/people'
import { Person } from '@/types/person'
import { Button } from '@/components/ui/button'

type PersonFormValues = z.infer<typeof personFormSchema>

interface PersonFormProps {
  reportId?: string
  initialData?: Person | null
}

const statusOptions = [
  { label: 'Interested', value: 'interested', description: 'Open to hear more' },
  { label: 'Accepted', value: 'accepted', description: 'Said yes to Jesus' },
  { label: 'Repented', value: 'repented', description: 'Returning home' },
]

export function PersonForm({ reportId, initialData }: PersonFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const isEdit = Boolean(initialData)
  const targetReportId = initialData?.report_id ?? reportId ?? ''

  const defaultValues = useMemo<PersonFormValues>(
    () => ({
      full_name: initialData?.full_name ?? '',
      phone_number: initialData?.phone_number ?? '',
      status: (initialData?.status as PersonFormValues['status']) ?? 'interested',
      report_id: targetReportId,
    }),
    [initialData, targetReportId]
  )

  const [stepIndex, setStepIndex] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const watchedStatus = watch('status')

  const mutation = useMutation({
    mutationFn: async (values: PersonFormValues) => {
      const payload = {
        ...values,
        phone_number: values.phone_number?.trim() || undefined,
      }

      if (isEdit && initialData) {
        return peopleAPI.updatePerson(initialData.id, payload)
      }

      return peopleAPI.createPerson(payload)
    },
    onSuccess: (person) => {
      const successMessage = isEdit
        ? 'Contact details refreshed'
        : 'New person added to follow-up list'
      toast.success(successMessage, {
        description: "Heaven rejoices over each name you steward.",
      })
      queryClient.invalidateQueries({ queryKey: ['people'] })
      queryClient.invalidateQueries({
        queryKey: ['people', targetReportId],
      })
      queryClient.invalidateQueries({
        queryKey: ['report', targetReportId],
      })
      if (!isEdit) {
        import('canvas-confetti').then(({ default: confetti }) => {
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#FBBF24', '#F472B6', '#A855F7'],
          })
        })
        reset({
          full_name: '',
          phone_number: '',
          status: 'interested',
          report_id: targetReportId,
        })
      } else {
        router.push(`/reports/${person.report_id}`)
      }
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Failed to save person'
      toast.error(message)
    },
  })

  const onSubmit = (values: PersonFormValues) => {
    mutation.mutate(values)
  }

  const sections = [
    {
      key: 'identity',
      content: (
        <div className="space-y-5">
          <div className="floating-label">
            <input
              placeholder=" "
              {...register('full_name')}
              aria-invalid={Boolean(errors.full_name)}
            />
            <label>Full name</label>
            {errors.full_name && (
              <p className="mt-2 text-sm text-destructive">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div className="floating-label">
            <input
              placeholder=" "
              {...register('phone_number')}
              aria-invalid={Boolean(errors.phone_number)}
            />
            <label className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              Phone number
            </label>
            {errors.phone_number && (
              <p className="mt-2 text-sm text-destructive">
                {errors.phone_number.message}
              </p>
            )}
          </div>
        </div>
      ),
      fields: ['full_name', 'phone_number'],
    },
    {
      key: 'status',
      content: (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-600">
            Where is this person on their journey?
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg
                  ${
                    option.value === watchedStatus
                      ? 'ring-2 ring-violet-200'
                      : ''
                  }
                `}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register('status')}
                  className="hidden"
                />
                <p className="text-sm font-semibold text-slate-900">
                  {option.label}
                </p>
                <p className="text-xs text-slate-500">{option.description}</p>
              </label>
            ))}
          </div>
          {errors.status && (
            <p className="text-sm text-destructive">{errors.status.message}</p>
          )}
        </div>
      ),
      fields: ['status'],
    },
  ]

  const nextStep = async () => {
    const valid = await trigger(
      sections[stepIndex].fields as (keyof PersonFormValues)[]
    )
    if (valid && stepIndex < sections.length - 1) {
      setStepIndex((prev) => prev + 1)
    }
  }

  const backStep = () => {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1)
  }

  if (!targetReportId) {
    return (
      <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm text-amber-800">
        Report context missing. Please open this form from a report detail page.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-[28px] border border-white/40 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.1)] glass-panel dark:border-white/10 dark:bg-slate-900/70"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-rose-400 p-3 text-white shadow-lg">
          <Users className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-[var(--font-playfair)] text-2xl text-slate-900">
            Shepherd this encounter
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Step {stepIndex + 1} of {sections.length}
          </p>
        </div>
      </div>

      <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-1 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 transition-all duration-500"
          style={{ width: `${((stepIndex + 1) / sections.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sections[stepIndex].key}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.3 }}
        >
          {sections[stepIndex].content}
        </motion.div>
      </AnimatePresence>

      <input type="hidden" value={targetReportId} {...register('report_id')} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {stepIndex > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={backStep}
            className="text-slate-600 hover:text-slate-900"
          >
            Back
          </Button>
        )}
        {stepIndex < sections.length - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 text-white shadow-lg shadow-rose-200 hover:scale-[1.01]"
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-rose-400 to-purple-600 text-white shadow-xl shadow-amber-200 hover:scale-[1.01]"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                {isEdit ? 'Update person' : 'Add person'}
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}

