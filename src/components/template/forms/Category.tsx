"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormIndicator } from "@/components/layouts/form-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Loader } from "~/components/system/layouts/Loader";

const FormSchema = z.object({
  name: z.string({ required_error: "name is required" }).max(100, {
    message: "The name should not be greater than 100 characters",
  }),
});

export interface CategoryFormI {
  name: string;
}
interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  isLoading?: boolean;
  defaultData?: CategoryFormI;
}

export function Category({ handleSubmit, defaultData, isLoading }: PropsI) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultData,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* inputs group */}
        <ScrollArea className="h-96 md:h-fit">
          <div className="mb-8 mt-2 flex w-full flex-col gap-6">
            <hr className="bg-[#e1e1e1]" />
            <div className="grid w-full grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Title</FormLabel>
                      <FormIndicator required />
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </ScrollArea>
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <DialogFooter className="gap-2 pt-6 sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                className="!rounded-full  !px-8"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="primary"
              className="!rounded-full !px-8"
            >
              Save
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  );
}
