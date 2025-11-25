import RegisterForm from '@/components/auth/RegisterForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWZhZmIiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        {/* Background Image with Modern Effects */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[30s] ease-in-out hover:scale-110"
          style={{ 
            backgroundImage: "url('/photo_2025-10-03_20-31-51.jpg')",
            filter: 'brightness(0.6) saturate(1.2) contrast(1.1)',
            transform: 'scale(1.05)',
            willChange: 'transform'
          }}
        />
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-black/10" />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-blue-900/70 to-indigo-900/80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/30 via-transparent to-cyan-500/30" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-400/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="text-center text-white space-y-8 max-w-md relative z-10">
          {/* Title Section with Glassmorphism */}
          <div className="mb-10 relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                HU Evangi Team
              </h1>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent rounded-full" />
                <div className="h-1.5 w-1.5 bg-yellow-300 rounded-full animate-pulse" />
                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent rounded-full" />
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl text-white/10 font-serif leading-none">"</div>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold italic leading-relaxed drop-shadow-xl text-white/95 relative z-10 px-4">
                እንዲህም አላቸው። ወደ ዓለም ሁሉ ሂዱ ወንጌልንም ለፍጥረት ሁሉ ስበኩ።.
              </blockquote>
              <div className="absolute -bottom-4 -right-4 text-6xl text-white/10 font-serif leading-none rotate-180">"</div>
            </div>
            
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-white/50" />
              <p className="text-base md:text-lg font-medium text-white/90 drop-shadow-md tracking-wide">
                የማርቆስ ወንጌል 16:15
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent via-white/50 to-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Join Evangelism Tracker as an Evangelist
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}