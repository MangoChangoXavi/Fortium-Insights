import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormIndicator } from "@/components/layouts/form-indicator";

export const FilesListItem = ({
  field,
  images,
  title,
  disabled,
  onChange,
  required,
}: {
  field: any;
  images: FileList;
  title: string;
  disabled: boolean;
  onChange: (newFiles: FileList) => void;
  required?: boolean;
}) => {
  return (
    <FormItem>
      <div className="flex flex-row justify-between">
        <FormLabel>{title}</FormLabel>
        <FormIndicator required={required} />
      </div>
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
