import * as React from "react"
import { cn } from "@/lib/utils"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-[1.1rem] border border-border/70 bg-input px-5 py-3 text-base shadow-[0_18px_40px_rgba(20,18,53,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

