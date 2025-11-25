import LoginForm from '@/components/auth/LoginForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWZhZmIiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-600 to-blue-700" />
        <div className="absolute inset-0 bg-linear-to-tr from-blue-800/20 via-transparent to-purple-800/20" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="text-center text-white space-y-6 max-w-md relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
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

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-linear-to-br from-indigo-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Login to Evangelism Tracker
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}