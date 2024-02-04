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
import { StepsButtonGroup } from "./StepsButtonGroup";

const FormSchema = z.object({
  boundaries: z
    .string({ required_error: "Las colindancias son requeridas" })
    .max(5000, {
      message: "Las colindancias no pueden ser mayor a 5000 caracteres",
    }),
  estateNumber: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El numero de finca es requerido",
        invalid_type_error: "El numero de finca no tiene que ir vacio",
      })
      .positive("El numero de finca tiene que ser positivo")
      .max(999999, "El numero de finca no puede ser mayor a 999,999"),
  ),
  folioNumber: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El numero de folio es requerido",
        invalid_type_error: "El numero de folio no tiene que ir vacio",
      })
      .positive("El numero de folio tiene que ser positivo")
      .max(999999, "El numero de folio no puede ser mayor a 999,999"),
  ),
  bookNumber: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El numero de libro es requerido",
        invalid_type_error: "El numero de libro no tiene que ir vacio",
      })
      .positive("El numero de libro tiene que ser positivo")
      .max(999999, "El numero de libro no puede ser mayor a 999,999"),
  ),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  handlePrevious: () => void;
}

export function LotAdditionalInfo({ handleSubmit, handlePrevious }: PropsI) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* title and subtitle */}
        <div className="flex flex-col gap-[16px] ">
          {/* title */}
          <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
            Información Adicional
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            En este ultimo paso debera de ingresar la informacion restante del
            lote necesaria en el sistema.
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="boundaries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colindancias</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="estateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Finca</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="folioNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Folio</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bookNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Libro</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* buttons group */}
        <StepsButtonGroup handlePrevious={handlePrevious} />
      </form>
    </Form>
  );
}
