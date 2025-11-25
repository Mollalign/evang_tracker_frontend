'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginAsync } from '@/store/slices/authSlice'
import { loginSchema } from '@/lib/utils/validation'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import Link from 'next/link'
import { toast } from 'sonner'
import { LoginRequest } from '@/types/auth'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
      resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginRequest) => {
      try {
      const result = await dispatch(loginAsync(data))
      if (loginAsync.fulfilled.match(result)) {
          toast.success('Login successful!')
          router.push('/dashboard')
      } else {
          toast.error(result.payload as string)
      }
      } catch (error) {
        console.error(error)
        toast.error('An error occurred')
      }
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
    
    <FormField
      label="Password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
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

    <div className="flex items-center justify-end">
      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
        Forgot password?
      </Link>
    </div>

    <Button type="submit" disabled={isLoading} className="w-full" size="lg">
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {isLoading ? 'Logging in...' : 'Login'}
    </Button>

    <Button
      type="button"
      variant="outline"
      className="w-full"
      size="lg"
      onClick={() => {
        // Handle admin login - you can add admin login logic here
        toast.info('Admin login feature coming soon')
      }}
    >
      Login as Admin
    </Button>

    <p className="text-center text-sm text-muted-foreground">
      Don&apos;t have an account?{' '}
      <Link href="/register" className="text-primary font-medium hover:underline">
        Register
      </Link>
    </p>
  </form>
  )
}
