'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginAsync } from '@/store/slices/authSlice'
import { loginSchema } from '@/lib/utils/validation'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LoginRequest } from '@/types/auth'

export default function LoginForm() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isLoading, error } = useAppSelector((state) => state.auth)

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
        toast.error('An error occurred')
        }
    }

     
    return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message as string}
      />
      
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message as string}
      />

      <div className="flex items-center justify-between">
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Login
      </Button>

      <p className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}
