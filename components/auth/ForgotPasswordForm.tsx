'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/store/hooks'
import { forgotPasswordAsync } from '@/store/slices/authSlice'
import { forgotPasswordSchema } from '@/lib/utils/validation'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useState } from 'react'

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

  const onSubmit = async (data: { email: string }) => {
    try {
      const result = await dispatch(forgotPasswordAsync(data.email))
      if (forgotPasswordAsync.fulfilled.match(result)) {
        toast.success('Password reset link sent to your email!')
        setIsSubmitted(true)
      } else {
        toast.error(result.payload as string)
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-600">Check your email for the password reset link!</p>
        <Link href="/login" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message as string}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Send Reset Link
      </Button>

      <p className="text-center text-sm">
        <Link href="/login" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </p>
    </form>
  )
}