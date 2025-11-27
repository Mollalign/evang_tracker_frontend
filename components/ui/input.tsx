import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-12 w-full min-w-0 rounded-2xl border border-border/60 bg-input px-4 py-3 text-base shadow-[0_6px_18px_rgba(15,18,33,0.05)] transition-colors duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:shadow-[0_0_0_1px_rgba(111,93,198,0.5)]",
        "aria-invalid:ring-destructive/25 aria-invalid:border-destructive/70",
        "hover:border-border",
        className
      )}
      {...props}
    />
  )
}

export { Input }
