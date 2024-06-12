import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "left-[3px] top-[3px] inline-flex  h-10 w-full items-center justify-start gap-2.5 rounded-lg border border-indigo-400 px-4 py-[11px] text-base font-semibold  not-italic leading-[normal] text-zinc-800  outline-indigo-400  file:border-0  file:bg-transparent file:text-sm  file:font-medium placeholder:font-medium placeholder:italic placeholder:leading-normal placeholder:text-[#808080] placeholder:text-muted-foreground  focus-visible:ring-2  focus-visible:ring-blue-100 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
