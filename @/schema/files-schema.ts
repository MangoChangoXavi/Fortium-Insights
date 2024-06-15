import { z } from "zod";

// Images
const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const getFilesSchema = ({ filesLength }: { filesLength: number }) => {
  return z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required")
    .refine(
      (files) => files.length <= filesLength,
      `Only a maximum of ${filesLength} images are allowed.`,
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      "Photos must weigh less than 5mb",
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      "Only these types are allowed: .jpg, .jpeg, .png and .webp",
    );
};
