import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "left-[3px] top-[3px] flex min-h-[80px] w-full items-center gap-2.5 rounded-lg border border-blue-950  bg-background  px-4 py-[11px]  text-base font-semibold not-italic leading-[normal] text-zinc-800 outline-indigo-400 ring-offset-background  placeholder:font-medium  placeholder:italic  placeholder:leading-normal placeholder:text-[#808080] placeholder:text-muted-foreground  focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
