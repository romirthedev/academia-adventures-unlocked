
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Only a simplified variant system used for luxury branding.
const buttonVariants = cva(
  "million-btn",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
        ghost: "bg-transparent text-primary hover:bg-primary/10",
        link: "bg-transparent underline text-primary hover:text-primary/80 shadow-none",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-sm",
        lg: "px-12 py-4 text-lg",
        icon: "p-0 w-10 h-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className })
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
