"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RightArrowIcon } from "~/components/system/ui/Icons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";

const FormSchema = z.object({
  servicesNumber: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .positive("El numero de servicios tiene que ser positivo")
      .max(15, "El dpi no puede ser mayor a 15"),
  ),
  title: z
    .string({ required_error: "El nombre del proyecto es requerido" })
    .max(500, {
      message: "El nombre del proyecto no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El nombre del proyecto no puede ser menor a 3 caracteres",
    }),
  client: z
    .string({ required_error: "El nombre del cliente es requerido" })
    .max(500, {
      message: "El nombre del cliente no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El nombre del cliente no puede ser menor a 3 caracteres",
    }),
  paymentLink: z
    .string({ required_error: "El link de pago es requerido" })
    .max(500, {
      message: "El link de pago no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El link de pago no puede ser menor a 3 caracteres",
    }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function ProposalBasic({ handleSubmit }: PropsI) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-10 space-y-6"
      >
        {/* title and subtitle */}
        <div className="flex flex-col gap-[16px] ">
          {/* title */}
          <h1 className="font-sans text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
            Informacion Basica
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Este es el primer paso para crear una propuesta de proyecto, se
            necesita especificar el numero de servicios para el siguiente paso
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="servicesNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de servicios</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={15} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo del proyecto</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de pago</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant={"primary"}>
          Siguiente &nbsp; <RightArrowIcon />
        </Button>
      </form>
    </Form>
  );
}
