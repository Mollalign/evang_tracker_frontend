/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/store/hooks'
import { forgotPasswordAsync } from '@/store/slices/authSlice'
import { forgotPasswordSchema } from '@/lib/utils/validation'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import Link from 'next/link'
import { toast } from 'sonner'
import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { ForgotPasswordRequest } from '@/types/auth'

export default function ForgotPasswordForm() {
  const dispatch = useAppDispatch()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordRequest) => {
    try {
      const result = await dispatch(forgotPasswordAsync(data.email))

      if (forgotPasswordAsync.fulfilled.match(result)) {
        toast.success('Password reset link sent to your email!')
        setIsSubmitted(true)
      } else {
        // result.payload is an object or string -> normalize it
        const err = result.payload as any

        if (typeof err === "string") {
          toast.error(err)
        } else if (Array.isArray(err?.detail)) {
          toast.error(err.detail[0].msg)
        } else {
          toast.error("Something went wrong")
        }
      }
    } catch {
      toast.error("Something went wrong")
    }
  }


  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 py-4 animate-in fade-in-0 slide-in-from-bottom-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-linear-to-br from-green-100 to-emerald-100 p-4 shadow-lg">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">Check your email</h3>
          <p className="text-sm text-gray-600">
            We&apos;ve sent a password reset link to your email address.
          </p>
        </div>
        <Link href="/login" className="block">
          <Button variant="outline" className="w-full" size="lg">
            Back to Login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        label="Email"
        type="email"
        placeholder="john.doe@example.com"
        {...register('email')}
        error={errors.email?.message as string}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-primary font-medium hover:underline">
          Back to Login
        </Link>
      </p>
    </form>
  )
}