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
import { StepsButtonGroup } from "./StepsButtonGroup";

const FormSchema = z.object({
  firstname: z
    .string({ required_error: "El primer nombre es requerido" })
    .max(500, {
      message: "El primer nombre no puede ser mayor a 500 caracteres",
    }),
  secondname: z
    .string({ required_error: "El segundo nombre es requerido" })
    .max(500, {
      message: "El segundo nombre no puede ser mayor a 500 caracteres",
    }),
  extraname: z
    .string()
    .max(500, {
      message: "El tercer nombre no puede ser mayor a 500 caracteres",
    })
    .optional(),
  lastname: z
    .string({ required_error: "El primer apellido es requerido" })
    .max(500, {
      message: "El primer apellido no puede ser mayor a 500 caracteres",
    }),
  secondlastname: z
    .string({ required_error: "El segundo apellido es requerido" })
    .max(500, {
      message: "El segundo apellido no puede ser mayor a 500 caracteres",
    }),
  surname: z
    .string()
    .max(500, {
      message: "El apellido de casada no puede ser mayor a 500 caracteres",
    })
    .optional(),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  handlePrevious: () => void;
}

export function CustomerNames({ handleSubmit, handlePrevious }: PropsI) {
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
            Nombres del Cliente
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Este es el primer paso para la creacion de una solicitud de compra,
            por favor ingrese los nombres del cliente.
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="extraname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tercer Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondlastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido de Casada</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
