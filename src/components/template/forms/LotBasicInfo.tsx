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
  price: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El precio es requerido",
        invalid_type_error: "El precio no tiene que ir vacio",
      })
      .positive("El precio tiene que ser positivo")
      .max(999999999, "El precio no puede ser mayor a 999,999,999"),
  ),
  downPayment: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El enganche es requerido",
        invalid_type_error: "El enganche no tiene que ir vacio",
      })
      .positive("El enganche tiene que ser positivo")
      .max(999999999, "El precio no puede ser mayor a 999,999,999"),
  ),
  totalArea: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El area total es requerida",
        invalid_type_error: "El area total no tiene que ir vacia",
      })
      .positive("El area total tiene que ser positiva")
      .max(9999, "El precio no puede ser mayor a 9,999"),
  ),
  measures: z
    .string({ required_error: "Las medidas son requeridas" })
    .max(5000, {
      message: "La descripcion no puede ser mayor a 5000 caracteres",
    }),
  location: z
    .string({ required_error: "La ubicacion es requerida" })
    .max(5000, {
      message: "La descripcion no puede ser mayor a 5000 caracteres",
    }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  handlePrevious: () => void;
}

export function LotBasicInfo({ handleSubmit, handlePrevious }: PropsI) {
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
            Información básica
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Este es el primer paso para ingresar la información del lote
            seleccionado, tendra que llenar la informacion basica de este como
            la imagen y los precios del mismo.
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="downPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enganche</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Total (m2)</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="measures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medidas</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicacion</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* buttons group */}
        <StepsButtonGroup handlePrevious={handlePrevious} />
      </form>
    </Form>
  );
}
