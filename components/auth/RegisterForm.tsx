'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { registerAsync } from '@/store/slices/authSlice'
import { registerSchema } from '@/lib/utils/validation'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import Link from 'next/link'
import { toast } from 'sonner'
import { RegisterRequest } from '@/types/auth'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function RegisterForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const { confirmPassword, ...registerData } = data
      // Only evangelists can register, admins cannot register
      const result = await dispatch(registerAsync({ ...registerData, role: 'evangelist' }))
      
      if (registerAsync.fulfilled.match(result)) {
        toast.success('Registration successful! Please login.')
        router.push('/login')
      } else {
        toast.error(result.payload as string)
      }
    } catch (error: any) {
      toast.error(error, 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        label="Full Name"
        placeholder="John Doe"
        {...register('full_name')}
        error={errors.full_name?.message as string}
      />

      <FormField
        label="Email"
        type="email"
        placeholder="john.doe@example.com"
        {...register('email')}
        error={errors.email?.message as string}
      />

      <FormField
        label="Phone Number (Optional)"
        type="tel"
        placeholder="+1 (555) 123-4567"
        {...register('phone_number')}
        error={errors.phone_number?.message as string}
      />

      <FormField
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a password"
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
        placeholder="Confirm your password"
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
        {isSubmitting ? 'Creating account...' : 'Register'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}