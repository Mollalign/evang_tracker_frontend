import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
    full_name: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.email({ message: 'Invalid email address' }),
    phone_number: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const forgotPasswordSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
})

export const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

export const reportFormSchema = z.object({
  outreach_name: z.string().min(2, 'Outreach name is required'),
  location: z.string().min(2, 'Location is required'),
  date: z.string().min(1, 'Date is required'),
  heard_count: z.coerce
    .number()
    .min(0, 'Value must be 0 or more')
    .default(0),
  interested_count: z.coerce
    .number()
    .min(0, 'Value must be 0 or more')
    .default(0),
  accepted_count: z.coerce
    .number()
    .min(0, 'Value must be 0 or more')
    .default(0),
  repented_count: z.coerce
    .number()
    .min(0, 'Value must be 0 or more')
    .default(0),
  notes: z
    .string()
    .max(1000, 'Keep notes concise')
    .optional()
    .or(z.literal('')),
})

export const personFormSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  phone_number: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),
  status: z.enum(['interested', 'accepted', 'repented'], {
    required_error: 'Status is required',
  }),
  report_id: z.string().uuid('Valid report ID is required'),
})