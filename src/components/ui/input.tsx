import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, "aria-label": ariaLabel, ...props }, ref) => {
    // Extract all aria-* props
    const ariaProps = Object.keys(props)
      .filter((key) => key.startsWith('aria-'))
      .reduce((acc, key) => {
        acc[key] = (props as any)[key];
        return acc;
      }, {} as Record<string, any>);
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        aria-label={ariaLabel}
        {...ariaProps}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
