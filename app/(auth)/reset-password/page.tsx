import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWZhZmIiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 via-transparent to-teal-500/30" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-teal-400/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/35 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-400/25 rounded-full blur-3xl" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="text-center text-white space-y-6 max-w-md relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-teal-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-lg">
              HU Evangi Team
            </h1>
            <div className="h-1 w-24 bg-white/40 mx-auto rounded-full shadow-lg" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold italic leading-relaxed drop-shadow-md">
            &ldquo;እንዲህም አላቸው። ወደ ዓለም ሁሉ ሂዱ ወንጌልንም ለፍጥረት ሁሉ ስበኩ።.&rdquo;
          </blockquote>
          <p className="text-lg md:text-xl opacity-95 font-light drop-shadow-sm">— የማርቆስ ወንጌል 16:15</p>
        </div>
      </div>

      {/* Right Panel - Reset Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Reset Password
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}