'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(130deg,#6D4AFF,#A077FF)] text-primary-foreground shadow-[0_18px_35px_rgba(20,18,53,0.25)] hover:shadow-[0_22px_50px_rgba(20,18,53,0.3)] hover:scale-[1.01]",
        destructive:
          "bg-destructive text-white shadow-[0_15px_35px_rgba(227,92,114,0.45)] hover:bg-destructive/90 focus-visible:ring-destructive/30",
        outline:
          "border border-primary/30 bg-transparent text-primary shadow-none hover:bg-primary/5 dark:hover:bg-primary/15",
        secondary:
          "border border-secondary/50 bg-secondary/20 text-secondary-foreground shadow-[inset_0_0_0_1px_rgba(255,216,115,0.35)] hover:bg-secondary/30",
        ghost: "text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-5 text-[0.78rem]",
        sm: "h-9 px-4 text-[0.7rem]",
        lg: "h-12 px-8 text-sm",
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
