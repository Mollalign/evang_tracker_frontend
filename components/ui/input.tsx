import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-12 w-full min-w-0 rounded-[1.1rem] border border-border/70 bg-input px-5 py-3 text-base shadow-[0_18px_40px_rgba(20,18,53,0.08)] transition-all duration-200 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-xs file:font-semibold file:uppercase tracking-[0.18em] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:shadow-[0_0_0_2px_rgba(109,74,255,0.4)]",
        "aria-invalid:ring-destructive/25 aria-invalid:border-destructive/70",
        "hover:border-primary/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }
