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
  title: z
    .string({ required_error: "El nombre del servicio es requerido" })
    .max(500, {
      message: "El nombre del servicio no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El nombre del servicio no puede ser menor a 3 caracteres",
    }),
  description: z
    .string({ required_error: "La descripcion del servicio es requerida" })
    .max(5000, {
      message:
        "La descripcion del servicio no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "La descripcion del servicio no puede ser menor a 3 caracteres",
    }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function ProposalServices({ handleSubmit }: PropsI) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const submitFnc = async (data: z.infer<typeof FormSchema>) => {
    handleSubmit(data);
    await router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFnc)} className="my-10 space-y-6">
        {/* title and subtitle */}
        <div className="flex flex-col gap-[16px] ">
          {/* title */}
          <h1 className="font-sans text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
            Informacion del Servicio
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            En este paso tendra que llenar la informacion de los servicios que
            se van a ofrecer
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo del Servicio</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
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
