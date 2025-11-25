import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const containerClasses = fullScreen
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center p-8'

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} animate-ping opacity-20 text-primary`}>
            <Loader2 className="h-full w-full" />
          </div>
        </div>
        {text && (
          <p className="text-sm text-muted-foreground font-medium animate-pulse">{text}</p>
        )}
      </div>
    </div>
  )
}


