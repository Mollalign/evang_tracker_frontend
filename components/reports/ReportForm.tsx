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
  Compass,
  Loader2,
  MapPin,
  NotebookPen,
  Save,
  Sparkles,
} from 'lucide-react'

import { reportFormSchema } from '@/lib/utils/validation'
import { reportsAPI } from '@/lib/api/reports'
import { Report } from '@/types/report'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type ReportFormValues = z.infer<typeof reportFormSchema>

interface ReportFormProps {
  initialData?: Report | null
}

const steps = [
  {
    key: 'details',
    title: 'Outreach details',
    description: 'Where and when did this encounter take place?',
    fields: ['outreach_name', 'location', 'date'],
  },
  {
    key: 'impact',
    title: 'Impact & testimonies',
    description: 'Capture what God did through this outreach moment.',
    fields: [
      'heard_count',
      'interested_count',
      'accepted_count',
      'repented_count',
      'notes',
    ],
  },
]

export function ReportForm({ initialData }: ReportFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const isEdit = Boolean(initialData)
  const [stepIndex, setStepIndex] = useState(0)

  const defaultValues = useMemo<ReportFormValues>(
    () => ({
      outreach_name: initialData?.outreach_name ?? '',
      location: initialData?.location ?? '',
      date:
        initialData?.date?.split('T')[0] ??
        new Date().toISOString().split('T')[0],
      heard_count: initialData?.heard_count ?? 0,
      interested_count: initialData?.interested_count ?? 0,
      accepted_count: initialData?.accepted_count ?? 0,
      repented_count: initialData?.repented_count ?? 0,
      notes: initialData?.notes ?? '',
    }),
    [initialData]
  )

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: async (values: ReportFormValues) => {
      const payload = {
        ...values,
        notes: values.notes?.trim() ? values.notes.trim() : undefined,
      }

      if (isEdit && initialData) {
        return reportsAPI.updateReport(initialData.id, payload)
      }

      return reportsAPI.createReport(payload)
    },
    onSuccess: (report) => {
      toast.success(
        isEdit
          ? 'Report updated — thank you for faithfully stewarding stories.'
          : 'Report logged — heaven rejoices with you today!',
        {
          icon: <Sparkles className="h-4 w-4 text-amber-300" />,
        }
      )
      if (!isEdit) {
        import('canvas-confetti').then(({ default: confetti }) => {
          confetti({
            particleCount: 90,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#8B5CF6', '#FBBF24', '#F472B6'],
          })
        })
      }
      queryClient.invalidateQueries({ queryKey: ['reports'] })
      queryClient.invalidateQueries({ queryKey: ['report', report.id] })
      router.push(`/reports/${report.id}`)
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Failed to save report'
      toast.error(message)
    },
  })

  const currentStep = steps[stepIndex]

  const nextStep = async () => {
    const valid = await trigger(currentStep.fields as (keyof ReportFormValues)[])
    if (valid && stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1)
  }

  const onSubmit = (values: ReportFormValues) => {
    mutation.mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 rounded-[30px] border border-white/40 bg-white/70 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.12)] glass-panel dark:border-white/10 dark:bg-slate-900/70"
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          {isEdit ? 'Refine testimony' : 'Capture testimony'}
        </p>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-3 text-white shadow-lg">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-[var(--font-playfair)] text-3xl text-slate-900">
              {isEdit
                ? 'Update outreach story'
                : 'Log a fresh move of the Spirit'}
            </h2>
            <p className="text-sm text-slate-500">
              Share the journey so leaders can celebrate and follow up well.
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          {steps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  index <= stepIndex
                    ? 'bg-gradient-to-r from-violet-500 to-indigo-500 shadow-lg shadow-violet-200'
                    : 'bg-slate-200'
                }`}
              />
              <span className="hidden text-[10px] text-slate-500 sm:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-1 rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 transition-all duration-500"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {stepIndex === 0 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="floating-label">
              <input
                placeholder=" "
                {...register('outreach_name')}
                aria-invalid={Boolean(errors.outreach_name)}
              />
              <label>Outreach name</label>
              {errors.outreach_name && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.outreach_name.message}
                </p>
              )}
            </div>
            <div className="floating-label flex flex-col gap-2">
              <div className="floating-label">
                <input
                  placeholder=" "
                  {...register('location')}
                  aria-invalid={Boolean(errors.location)}
                />
                <label className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-violet-500" />
                  Location
                </label>
              </div>
              {errors.location && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="floating-label">
              <input
                type="date"
                placeholder=" "
                {...register('date')}
                aria-invalid={Boolean(errors.date)}
              />
              <label>Date of outreach</label>
              {errors.date && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {stepIndex === 1 && (
          <motion.div
            key="impact"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { field: 'heard_count', label: 'Heard the Gospel' },
                { field: 'interested_count', label: 'Expressed interest' },
                { field: 'accepted_count', label: 'Accepted Christ' },
                { field: 'repented_count', label: 'Rededicated lives' },
              ].map((metric) => (
                <div key={metric.field} className="floating-label">
                  <input
                    type="number"
                    min={0}
                    placeholder=" "
                    {...register(metric.field as keyof ReportFormValues, {
                      valueAsNumber: true,
                    })}
                  />
                  <label>{metric.label}</label>
                  {errors[metric.field as keyof typeof errors] && (
                    <p className="mt-2 text-sm text-destructive">
                      {
                        errors[metric.field as keyof typeof errors]?.message as
                          | string
                          | undefined
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Field notes & testimonies
              </label>
              <Textarea
                placeholder="Share testimonies, follow-up needs, prophetic impressions..."
                className="min-h-[140px] rounded-2xl border border-white/40 bg-white/80 p-4 shadow-inner focus:ring-2 focus:ring-violet-300 dark:border-white/10 dark:bg-slate-900/70"
                {...register('notes')}
              />
              {errors.notes && (
                <p className="text-sm text-destructive">{errors.notes.message}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {stepIndex > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="text-slate-600 hover:text-slate-900"
          >
            Back
          </Button>
        )}
        {stepIndex < steps.length - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 text-white shadow-lg shadow-violet-200 hover:scale-[1.01]"
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 text-white shadow-xl shadow-violet-200 hover:scale-[1.01]"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEdit ? 'Update report' : 'Publish report'}
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}

