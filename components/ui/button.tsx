'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-0 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,var(--primary),#9C6ADE)] text-primary-foreground shadow-[0_18px_35px_rgba(15,18,33,0.15)] hover:shadow-[0_22px_40px_rgba(15,18,33,0.2)] hover:scale-[1.01]",
        destructive:
          "bg-destructive text-white shadow-[0_12px_30px_rgba(228,92,92,0.35)] hover:bg-destructive/90 focus-visible:ring-destructive/30",
        outline:
          "border border-border/70 bg-transparent text-foreground shadow-none hover:bg-muted/60 dark:hover:bg-muted/30",
        secondary:
          "border border-secondary/40 bg-transparent text-secondary hover:bg-secondary/10 hover:text-secondary-foreground dark:hover:bg-secondary/20 shadow-[inset_0_0_0_1px_rgba(242,212,143,0.4)]",
        ghost: "text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-11 px-5 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
