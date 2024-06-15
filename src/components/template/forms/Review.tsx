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
import { Textarea } from "@/components/ui/textarea";
import { FormIndicator } from "@/components/layouts/form-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Loader } from "~/components/system/layouts/Loader";
import { Star } from "lucide-react";

const FormSchema = z.object({
  comment: z.string({ required_error: "comment is required" }).max(5000, {
    message: "The comment should not be greater than 5000 characters",
  }),
  title: z.string({ required_error: "title is required" }).max(100, {
    message: "The title should not be greater than 100 characters",
  }),
  rating: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .positive("The rating must be positive")
      .max(999999, "The rating cannot be greater than 6 digits"),
  ),
});

export interface ReviewFormI {
  comment: string;
  title: string;
  rating: number;
}
interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  isLoading?: boolean;
  defaultData?: ReviewFormI;
}

export function Review({ handleSubmit, defaultData, isLoading }: PropsI) {
  const [selectedRating, setSelectedRating] = React.useState(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultData,
  });

  useEffect(() => {
    form.setValue("rating", selectedRating);
  }, [form, selectedRating]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* inputs group */}
        <ScrollArea className="h-96 md:h-fit">
          <div className="mb-8 mt-2 flex w-full flex-col gap-6">
            <hr className="bg-[#e1e1e1]" />
            <div className="grid w-full grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="title"
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
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Rating</FormLabel>
                      <FormIndicator required />
                    </div>
                    <FormControl>
                      <Input {...field} type="number" className="hidden" />
                    </FormControl>
                    <div className="flex gap-1">
                      {new Array(5).fill(0).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedRating(i + 1)}
                        >
                          <Star
                            size={24}
                            className={`stroke-[#093061] hover:stroke-blue-700 ${
                              i < selectedRating
                                ? "fill-[#093061]"
                                : "fill-transparent"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Comment</FormLabel>
                      <FormIndicator required />
                    </div>
                    <FormControl>
                      <Textarea {...field} />
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
