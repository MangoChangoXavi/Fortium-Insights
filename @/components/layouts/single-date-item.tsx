import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { FormIndicator } from "./form-indicator";

export const SingleDateItem = ({
  field,
  label,
  fromYear,
  toYear,
  required,
}: {
  field: { value: Date; onChange: () => void };
  label: string;
  fromYear: number;
  toYear: number;
  required?: boolean;
}) => {
  return (
    <FormItem className="flex flex-col">
      <div className="flex flex-row justify-between">
        <FormLabel>{label}</FormLabel>
        <FormIndicator required={required} />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "border-glow px-4 py-[11px] pl-3 text-left text-base font-semibold not-italic leading-[normal] text-black",
                !field.value && "text-muted-foreground",
              )}
            >
              {field.value ? (
                field.value.toLocaleDateString()
              ) : (
                <span>Selecciona una fecha</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="my-2 w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons" //Also: dropdown | buttons
            fromYear={fromYear}
            toYear={toYear}
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};
