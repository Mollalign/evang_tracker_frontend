import * as React from "react"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface FormFieldProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  containerClassName?: string
  rightElement?: React.ReactNode
}

export function FormField({
  label,
  error,
  containerClassName,
  className,
  id,
  rightElement,
  ...props
}: FormFieldProps) {
  const fieldId = id || React.useId()
  
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={fieldId}
          className={cn(
            error && "border-destructive ring-destructive/20",
            rightElement && "pr-10",
            "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p id={`${fieldId}-error`} className="text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}

