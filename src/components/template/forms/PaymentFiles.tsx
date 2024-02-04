"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormField } from "@/components/ui/form";

import React from "react";
import { FilesListItem } from "@/components/layouts/files-list-item";
import { getFilesSchema } from "@/schema/files-schema";
import { StepsButtonGroup } from "./StepsButtonGroup";

// Form Schema Validation
const filesSchema = getFilesSchema({ filesLength: 1 });
const FormSchema = z.object({
  frontDpi: filesSchema,
  backDpi: filesSchema,
  clientImage: filesSchema,
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  handlePrevious: () => void;
}

export function PaymentFiles({ handleSubmit, handlePrevious }: PropsI) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="animate-fade-right animate-delay-[50ms] animate-duration-[1200ms] animate-ease-in-out space-y-6"
      >
        {/* title and subtitle */}
        <div className="flex flex-col gap-[16px] ">
          {/* title */}
          <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
            Archivos de Pago
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Este es el ultimo paso para la creacion de una solicitud de compra
            antes de aceptar terminos y condiciones, consiste en subir los
            archivos necesarios para la comprobacion de pago.
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          {/* Images */}
          <FormField
            control={form.control}
            name="frontDpi"
            render={({ field: { onChange }, ...field }) => {
              // Get current images value (always watched updated)
              const images = form.watch("frontDpi");

              return (
                <FilesListItem
                  field={field}
                  onChange={onChange}
                  images={images}
                  title="DPI Frontal"
                  disabled={form.formState.isSubmitting}
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="backDpi"
            render={({ field: { onChange }, ...field }) => {
              // Get current images value (always watched updated)
              const images = form.watch("backDpi");

              return (
                <FilesListItem
                  field={field}
                  onChange={onChange}
                  images={images}
                  title="DPI Trasero"
                  disabled={form.formState.isSubmitting}
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="clientImage"
            render={({ field: { onChange }, ...field }) => {
              // Get current images value (always watched updated)
              const images = form.watch("clientImage");

              return (
                <FilesListItem
                  field={field}
                  onChange={onChange}
                  images={images}
                  title="Fotografia del cliente"
                  disabled={form.formState.isSubmitting}
                />
              );
            }}
          />
        </div>
        {/* buttons group */}
        <StepsButtonGroup handlePrevious={handlePrevious} />
      </form>
    </Form>
  );
}
