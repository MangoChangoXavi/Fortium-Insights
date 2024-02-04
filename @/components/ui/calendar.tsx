"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps & { onChange?: React.ChangeEventHandler<HTMLSelectElement> }) {
  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("border-glow rounded-xl p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption_start: "is-start",
        caption_between: "is-between",
        caption_end: "is-end",
        caption: "flex justify-center pt-1 relative items-center gap-1",
        caption_label:
          "flex h-7 text-sm font-medium justify-center items-center grow [.is-multiple_&]:flex",
        caption_dropdowns: "flex justify-center gap-1 grow dropdowns px-2",
        multiple_months: "is-multiple",
        vhidden:
          "hidden [.is-between_&]:flex [.is-end_&]:flex [.is-start.is-end_&]:hidden",
        nav: "flex items-center [&:has([name='previous-month'])]:order-first [&:has([name='next-month'])]:order-last gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-6 w-6 bg-transparent p-0 text-muted-foreground",
        ),
        nav_button_previous: "absolute left-0 border-glow",
        nav_button_next: "absolute right-0 border-glow",
        table: "w-full border-collapse",
        head_row: "flex text-base",
        head_cell: "text-muted-foreground rounded-md w-9 font-sans-css",
        row: "flex w-full",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-bold text-base aria-selected:opacity-100 hover:text-primary-500 hover:bg-primary-200 font-sans-css text-[#2C2C2C]",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-secondary-200 text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent-200 aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-3 w-3" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-3 w-3" />,
        Dropdown: ({ ...props }) => (
          <Select
            {...props}
            onValueChange={(value) => {
              if (props.onChange) {
                handleCalendarChange(value, props.onChange);
              }
            }}
            value={props.value as string}
          >
            <SelectTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "font-sans-css mx-1 h-6 w-fit px-2 text-xs font-medium  [.is-between_&]:hidden [.is-end_&]:hidden [.is-start.is-end_&]:flex",
              )}
            >
              <SelectValue placeholder={props?.caption}>
                {props?.caption}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {props.children &&
                React.Children.map(props.children, (child) => (
                  <SelectItem
                    value={(child as React.ReactElement)?.props?.value}
                    className="min-w-[var(--radix-popper-anchor-width)] cursor-pointer"
                  >
                    {(child as React.ReactElement)?.props?.children}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
