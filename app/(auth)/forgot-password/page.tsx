import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import {Card} from '@/components/ui/card'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <ForgotPasswordForm />
      </Card>
    </div>
  )
}