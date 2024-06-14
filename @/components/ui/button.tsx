import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[#1F1F1F] hover:bg-[#093061] text-[#808080] hover:text-white bg-white shadow-[0px_4px_10px_0px_rgba(44,44,44,0.20)]",
        primary: "bg-[#093061] hover:bg-primary-600 text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary-500 hover:bg-secondary-600 text-white",
        dark: "bg-[#000000] hover:bg-[#1F1F1F] text-white",
        disabled: "bg-[#C2C2C2] cursor-not-allowed text-white",
        error: "bg-[#EB392E] hover:bg-[#D91F13] text-white",
        link: "text-primary underline-offset-4 hover:underline",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-active:outline-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      shape: {
        default: "!rounded-xl",
        pill: "!rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "transition duration-300 ease-in-out hover:translate-y-[-4px]",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
