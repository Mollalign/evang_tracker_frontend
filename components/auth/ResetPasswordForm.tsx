'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { resetPasswordAsync } from '@/store/slices/authSlice'
import { resetPasswordSchema } from '@/lib/utils/validation'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const [token, setToken] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
          confirm_password: data.confirmPassword,
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
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        label="New Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your new password"
        {...register('password')}
        error={errors.password?.message as string}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <FormField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your new password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message as string}
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Resetting password...' : 'Reset Password'}
      </Button>
    </form>
  )
}