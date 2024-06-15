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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardGradientDetailsSvg from "~/assets/svg/card-gradient-details.svg";
import React from "react";
import { categories } from "~/lib/categories";
import { CameraIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { getFilesSchema } from "@/schema/files-schema";
import { FilesListItem } from "@/components/layouts/files-list-item";

const filesSchema = getFilesSchema({ filesLength: 1 });
const FormSchema = z.object({
  description: z
    .string({ required_error: "Description is required" })
    .max(5000, {
      message: "The description should not be greater than 5000 characters",
    }),
  name: z.string({ required_error: "Name is required" }).max(100, {
    message: "The name should not be greater than 100 characters",
  }),
  category: z.string({ required_error: "Category is required" }).max(100, {
    message: "The category should not be greater than 100 characters",
  }),
  vendorFiles: filesSchema,
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  defaultData?: any;
}

export function Vendor({ handleSubmit, defaultData }: PropsI) {
  const [isNewCategory, setIsNewCategory] = React.useState(false);
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
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
              <div className="col-span-1 flex flex-col gap-3">
                <Label>Is new category?</Label>
                <Switch onClick={() => setIsNewCategory((prev) => !prev)} />
              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row justify-between">
                        <FormLabel>Category</FormLabel>
                        <FormIndicator required />
                      </div>
                      <FormControl>
                        {isNewCategory ? (
                          <Input placeholder="Write category name" {...field} />
                        ) : (
                          <>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.name}
                                    value={category.name}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Name</FormLabel>
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
            <div className="grid w-full grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Description</FormLabel>
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
          <div className="grid w-full grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="vendorFiles"
              render={({ field: { onChange }, ...field }) => {
                // Get current images value (always watched updated)
                const images = form.watch("vendorFiles");
                return (
                  <FilesListItem
                    field={field}
                    onChange={onChange}
                    images={images}
                    title="Cover Image"
                    disabled={form.formState.isSubmitting}
                  />
                );
              }}
            />
            <div className="relative hidden h-36 w-full">
              <Image
                src="https://via.placeholder.com/264x160"
                alt="Company Image"
                width={264}
                height={160}
                className="absolute bottom-0 left-0 right-0 mx-auto rounded"
              />
              <Image
                src={CardGradientDetailsSvg}
                alt="Gradient"
                className="absolute bottom-0 left-0 right-0 mx-auto rounded-b"
                width={264}
              />
              <button className="group absolute bottom-4 left-0 right-0 mx-auto">
                <div className=" flex items-center justify-center gap-2">
                  <CameraIcon
                    size={16}
                    className="text-white  transition duration-150 ease-in-out group-hover:text-blue-200"
                  />
                  <span className="font-['Noto Sans JP'] text-sm font-medium text-white transition duration-150 ease-in-out group-hover:text-blue-200 ">
                    Upload cover
                  </span>
                </div>
              </button>
            </div>
          </div>
        </ScrollArea>
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
      </form>
    </Form>
  );
}
