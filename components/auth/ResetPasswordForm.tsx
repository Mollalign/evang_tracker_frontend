'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { resetPasswordAsync } from '@/store/slices/authSlice'
import { resetPasswordSchema } from '@/lib/utils/validation'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      toast.error('Invalid reset token')
      router.push('/forgot-password')
    } else {
      setToken(tokenParam)
    }
  }, [searchParams, router])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    if (!token) return

    try {
      const result = await dispatch(
        resetPasswordAsync({
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
      )

      if (resetPasswordAsync.fulfilled.match(result)) {
        toast.success('Password reset successful!')
        router.push('/login')
      } else {
        toast.error(result.payload as string)
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  if (!token) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="New Password"
        type="password"
        {...register('password')}
        error={errors.password?.message as string}
      />

      <Input
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message as string}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Reset Password
      </Button>
    </form>
  )
}