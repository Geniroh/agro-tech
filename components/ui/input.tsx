import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    suffixicon?: React.ReactNode | string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffixicon, type, ...props }, ref) => {
    return (
      <div className={`flex items-center gap-x-2 ${suffixicon ? "border border-input pl-2 rounded-md shadow-sm w-full" : ""}`}>
        {suffixicon}
        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${suffixicon ? "focus-visible:ring-0 shadow-none border-0 outline-0 rounded-none": "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-sm "}`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
