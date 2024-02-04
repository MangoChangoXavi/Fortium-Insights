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
    .custom<FileList>((val) => val instanceof FileList, "Requerido")
    .refine((files) => files.length > 0, `Requerido`)
    .refine(
      (files) => files.length <= filesLength,
      `Solo se permite un maximo de ${filesLength} imagenes.`,
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      `Las fotos deben pesar menos de 5mb`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      "Solo estos tipos son permitidos: .jpg, .jpeg, .png and .webp",
    );
};
