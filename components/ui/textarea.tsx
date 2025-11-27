import * as React from "react"
import { cn } from "@/lib/utils"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[140px] w-full rounded-[1.1rem] border border-border/70 bg-input px-5 py-4 text-base shadow-[0_18px_40px_rgba(20,18,53,0.08)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

