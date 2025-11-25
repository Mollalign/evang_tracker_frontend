'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { registerAsync } from '@/store/slices/authSlice'
import { registerSchema } from '@/lib/utils/validation'
import{ Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { RegisterRequest } from '@/types/auth'

export default function RegisterForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()

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
      const result = await dispatch(registerAsync(registerData))
      
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register('full_name')}
        error={errors.full_name?.message as string}
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message as string}
      />

      <Input
        label="Phone Number (Optional)"
        type="tel"
        {...register('phone_number')}
        error={errors.phone_number?.message as string}
      />

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          {...register('role')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="evangelist">Evangelist</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <Input
        label="Password"
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
        Register
      </Button>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}