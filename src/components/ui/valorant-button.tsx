import * as React from "react";
import { cn } from "@/lib/utils";

interface ValorantButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ValorantButton = React.forwardRef<HTMLButtonElement, ValorantButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="button-borders">
        <button
          ref={ref}
          className={cn("primary-button", className)}
          {...props}
        >
          {children}
        </button>
      </div>
    );
  }
);

ValorantButton.displayName = "ValorantButton"; 