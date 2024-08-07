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
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { getFilesSchema } from "@/schema/files-schema";
import { FilesListItem } from "@/components/layouts/files-list-item";
import { Loader } from "~/components/system/layouts/Loader";
import { api } from "~/utils/api";
import { PlusIcon } from "lucide-react";

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
  isNewCategory: z.boolean().optional(),
  vendorFiles: filesSchema,
});

export interface VendorFormI {
  category: string;
  name: string;
  description: string;
  isNewCategory?: boolean;
  vendorFiles?: FileList;
  vendorImgUrl?: string;
  id?: string;
}
interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => Promise<void>;
  setOpen: (open: boolean) => void;
  isLoading?: boolean;
  defaultData?: VendorFormI;
}

export function Vendor({
  handleSubmit,
  defaultData,
  isLoading,
  setOpen,
}: PropsI) {
  const [newCategoryState, setNewCategoryState] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultData,
  });

  // Get categories
  const { data: categories } = api.category.getAll.useQuery({
    includeEmpty: true,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* inputs group */}
        <ScrollArea className="h-96 md:h-fit">
          <div className="mb-8 mt-2 flex w-full flex-col gap-6">
            <hr className="bg-[#e1e1e1]" />
            <div className="grid w-full grid-cols-2 gap-8 ">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Category</FormLabel>
                      <FormIndicator required />
                    </div>
                    {newCategoryState ? (
                      <FormControl>
                        <Input placeholder="Write category name" {...field} />
                      </FormControl>
                    ) : (
                      <Select
                        onValueChange={(v) => {
                          if (v === "_") {
                            setNewCategoryState(true);
                            // change is new category to true
                            form.setValue("isNewCategory", true);
                            field.onChange("");
                          } else {
                            field.onChange(v);
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="_">
                            <span className="flex gap-2">
                              <PlusIcon size={16} />
                              <span>Create new category</span>
                            </span>
                          </SelectItem>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            {defaultData?.vendorImgUrl && (
              <div className="flex h-fit w-full items-center justify-center">
                <div className="relative h-52 w-1/2 border border-neutral-200">
                  <Image
                    src={defaultData.vendorImgUrl}
                    alt="Company Image"
                    objectFit="cover"
                    fill
                    className="absolute bottom-0 left-0 right-0 mx-auto rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <DialogFooter className="gap-2 pt-6 sm:justify-end">
            <Button
              type="button"
              variant="default"
              className="!rounded-full  !px-8"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
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
