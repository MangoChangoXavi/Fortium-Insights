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
  phone: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El telefono es requerido",
        invalid_type_error: "El telefono no tiene que ir vacio",
      })
      .positive("El telefono tiene que ser positivo")
      .max(99999999, "El telefono no puede ser mayor a 8 digitos"),
  ),
  workphone: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El telefono es requerido",
        invalid_type_error: "El telefono no tiene que ir vacio",
      })
      .positive("El telefono tiene que ser positivo")
      .max(99999999, "El telefono no puede ser mayor a 8 digitos"),
  ),
  email: z.string({ required_error: "El email es requerido" }).email(),
  address: z.string({ required_error: "la direccion es requerida" }).max(5000, {
    message: "la direccion no puede ser mayor a 5000 caracteres",
  }),
  workaddress: z
    .string({ required_error: "la direccion de trabajo es requerida" })
    .max(5000, {
      message: "la direccion de trabajo no puede ser mayor a 5000 caracteres",
    }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  handlePrevious: () => void;
}

export function CustomerContact({ handleSubmit, handlePrevious }: PropsI) {
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
            Contacto del Cliente
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Este es el tercer paso para la creacion de una solicitud de compra,
            por favor ingrese todos los datos de contacto del cliente
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de telefono</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de trabajo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electronico</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workaddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion de trabajo</FormLabel>
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
