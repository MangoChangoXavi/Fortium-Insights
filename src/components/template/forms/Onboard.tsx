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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RightArrowIcon } from "~/components/system/ui/Icons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const FormSchema = z.object({
  links: z.string({ required_error: "la direccion es requerida" }).max(5000, {
    message: "la direccion no puede ser mayor a 5000 caracteres",
  }),
  intro: z
    .string({ required_error: "la direccion de trabajo es requerida" })
    .max(5000, {
      message: "la direccion de trabajo no puede ser mayor a 5000 caracteres",
    }),
  services: z
    .string({ required_error: "la direccion de trabajo es requerida" })
    .max(5000, {
      message: "la direccion de trabajo no puede ser mayor a 5000 caracteres",
    }),
  budget: z
    .string({ required_error: "la direccion de trabajo es requerida" })
    .max(5000, {
      message: "la direccion de trabajo no puede ser mayor a 5000 caracteres",
    }),
  problems: z
    .string({ required_error: "la direccion de trabajo es requerida" })
    .max(5000, {
      message: "la direccion de trabajo no puede ser mayor a 5000 caracteres",
    }),
  success: z
    .string({ required_error: "la direccion de trabajo es requerida" })
    .max(5000, {
      message: "la direccion de trabajo no puede ser mayor a 5000 caracteres",
    }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
}

const verifyCaptcha = async (token: string | null): Promise<string> => {
  const response = await fetch("/api/recaptcha/route", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
  if (response.status === 200) {
    const res = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.text;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
};

export function Onboard({ handleSubmit }: PropsI) {
  const router = useRouter();

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

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
        {/* inputs group */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="links"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Links del sitio web y redes sociales existentes.
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ¿Que hace tu negocio y como llegaste a el?
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿En que servicio estas interesado?</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ¿Que problemas esperas solucionar trabajando con nosotros?
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="success"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ¿Como luce el exito para ti en este proyecto?
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ¿Cual es tu presupuesto para este proyecto?
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          ref={recaptchaRef}
          onChange={handleCaptchaSubmission}
        />
        <Button type="submit" variant={"primary"} disabled={!isVerified}>
          Enviar &nbsp; <RightArrowIcon />
        </Button>
      </form>
    </Form>
  );
}
