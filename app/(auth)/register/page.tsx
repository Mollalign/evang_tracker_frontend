import RegisterForm from '@/components/auth/RegisterForm'
import {Card} from '@/components/ui/card'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <RegisterForm />
      </Card>
    </div>
  )
}