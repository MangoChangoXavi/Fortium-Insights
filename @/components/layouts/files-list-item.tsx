import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const FilesListItem = ({
  field,
  images,
  title,
  disabled,
  onChange,
}: {
  field: any;
  images: FileList;
  title: string;
  disabled: boolean;
  onChange: (newFiles: FileList) => void;
}) => {
  return (
    <FormItem>
      <FormLabel>{title}</FormLabel>
      {/* File Upload */}
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          multiple={true}
          disabled={disabled}
          {...field}
          onChange={(event) => {
            // Triggered when user uploaded a new file
            // FileList is immutable, so we need to create a new one
            const dataTransfer = new DataTransfer();

            // Add old images
            if (images) {
              Array.from(images).forEach((image) =>
                dataTransfer.items.add(image),
              );
            }

            // Add newly uploaded images
            Array.from(event.target.files!).forEach((image) =>
              dataTransfer.items.add(image),
            );

            // Validate and update uploaded file
            const newFiles = dataTransfer.files;
            onChange(newFiles);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
