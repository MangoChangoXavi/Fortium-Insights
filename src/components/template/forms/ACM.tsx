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
import {
  BathIcon,
  BedIcon,
  Building,
  CarIcon,
  FormInput,
  MapIcon,
  RulerIcon,
  TagIcon,
} from "lucide-react";

const FormSchema = z.object({
  location: z
    .string({ required_error: "La ubicacion es requerida" })
    .max(5000, {
      message: "La ubicacion no pueden ser mayor a 5000 caracteres",
    }),
  operationType: z
    .string({ required_error: "El tipo de operacion es requerida" })
    .max(5000, {
      message: "El tipo de operacion no puede ser mayor a 5000 caracteres",
    }),
  buildingType: z
    .string({ required_error: "El tipo de inmueble es requerida" })
    .max(5000, {
      message: "El tipo de inmueble no puede ser mayor a 5000 caracteres",
    }),
  numberOfRooms: z
    .string({ required_error: "El numero de cuartos es requerido" })
    .max(5000, {
      message: "El numero de cuartos no puede ser mayor a 5000 caracteres",
    }),
  numberOfBathrooms: z
    .string({ required_error: "El numero de baños es requerido" })
    .max(5000, {
      message: "El numero de baños no puede ser mayor a 5000 caracteres",
    }),
  numberOfParkingLots: z
    .string({ required_error: "El numero de parqueos es requerido" })
    .max(5000, {
      message: "El numero de parqueos no puede ser mayor a 5000 caracteres",
    }),
  totalArea: z
    .string({ required_error: "El area total es requerido" })
    .max(5000, {
      message: "El area total no puede ser mayor a 5000 caracteres",
    }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function ACMForm({ handleSubmit }: PropsI) {
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
          <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
            Analisis Comparativo Automatizado
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            A continuacion usted debera de llenar los campos con la informacion
            para que el sistema empiece a buscar por todo internet propiedades
            similiares a la que usted esta buscando y presentar un resultado con
            las opciones mas similares.
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <MapIcon className="h-4 w-4" /> Ubicacion
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <TagIcon className="h-4 w-4" /> Tipo de operacion
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="buildingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <Building className="h-4 w-4" /> Tipo de inmueble
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <BedIcon className="h-4 w-4" /> Numero de cuartos
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="numberOfBathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <BathIcon className="h-4 w-4" /> Numero de baños
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfParkingLots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <CarIcon className="h-4 w-4" /> Numero de parqueos
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="totalArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <RulerIcon className="h-4 w-4" /> Area total
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          ref={recaptchaRef}
          onChange={handleCaptchaSubmission}
        /> */}
        <Button type="submit" variant={"primary"}>
          Enviar &nbsp; <RightArrowIcon />
        </Button>
        {/* <Button
          type="button"
          onClick={() =>
            handleCaptchaSubmission(
              "03AFcWeA68-z8vwZwm1csEkebTuGqWFLFzEYcRH7XwtR6oObwsTwroifMv6lyp-sHJ1Wb6IwH2NQ5BxTQmUmsGn-z3BbmESQaY8-o1MJ7BHr0gmeueyn8cNr03l3Mdy9SNzkODLiPFa3dVlmdhKmkKog_uXWJAyPE00yBnPmAocINenmP3TPdfsBeogFE6AqAW9sUVTqzFTKouQSNJ1gBZ9myuQf1Torl3MzfYKIOM3jWweHLC3UYqJ49R_2CFaFV3ea5TJzcAqF0RU4RujkJqMQmKzQVn_ZICV6bLIyc5Wsb6zHOMCsZOzJItYt5OHdZTzLo1i50vQaTNEqyMfgsPAEA8uOnCyv_5Y9mP4FRvVS6a3eAIs8M5HQMWDRSiM-rdqqd0un4tkc1OQXlf0dQe3dVlRu0hM9h6LmGT87O4OG9UelIHuUbiXWZuKTzQhfNY0buw0otJjvLkmZlUNyhjX2TNoHTD0kOoZc86fSM13twdM_xpvUqKIkOrfPzQ9lB2YtdvRd0fLejBQdWYqi0XKoPUyNUfoM432LHeRLAPPa6E9Srilib1OBsoiyJFa5yHSUGs_QEGPkf7Vl3-NWjF8B6rndRxFhJW1Pn4G1LDzr_lc6nqofaDCM3xFYdSYLDcHMRY38Gp2plXfbUFKoTxmAQcDIi_lqGgKvpv6t7sYxzlAdP93p0sk3Sk7O0-lC10TXuMe9Qis5R2gpPwaxlCQqnuA6Tsh4UJQVJLdvTJCyqkzvowyxtetwsD9a919dTCeTxzXSfy4jHjZy0UHYWQ4X8g9gXgJa6g_6zBF2jPOgwhCV1keVIKjFJml2Zi0sH0QtyFSyHR5fBfZjcXVpGHW3rpDkBz7pF0u8FpEI7QvrbqesjtSS90C_otNMfpNpdN2dhEvQtMuESPoNsrO_UX7dO92c6mBb8ivIEufr73wTXPrXXIC0aBI18qJ2WtTwMC0hPsUSAUxBle-UZsiVOYS4drvo8emFLIdpeFT1PBZgFX8tjBWmliyOjepKao6TgTP5iM-r2p8L835lHfn96A7QfSyt2j_e5flRYFR8MZDdhc2lxTrM2VfHsYLxivie3SAKd8bOgLj3VB85P6wTuqZ6UIiXvZuifnZB6odIOCI2whurhOfj8Dn22bHV1nom0sPECpH9mCViY7ihY18Y_IzbCBHd_S_VJHV8qKV4iykkg73LHU6Ng4eK4vRdqDcJDrDF2LovPDmmuGEp4IrVHNp5sp8dsiOul9qnfJZeHF62vcthtqgyNyhYWOC7t1jAaqqyo6375VVmXRzK1oDgPUk484IKmmnRieUpxkXA8xq7YdvfgHBqlhor5dTlnVB26R8pAGyJ-fBvMfPz16wfSsSJkJe8B1L0fgOTesPWJxhb3L9DHHLDKyguTEtM38hGtpkFGNDvqF-wnbvChwj6DQABLd2_9RGFjoOySR1PyWRdVvg8GwYg8ob6xf1P3kc0gvUa1vblBjE7iLOZVxFi2MFdskGfVcR33dSrLaJSOmzJk48s_lv1sORn0ZVvPgVaCMJRxxf9inrPedrDRrDFkWCDMf0fzVW7AYpdULH-pQZ1m4BzzaaTHWuuQY1SUO8ZDmxiUvI1137qEnOWzqhRm_c9SeI62UnwrvNTU7tfx_dcqd-Uz9mIV1cFs",
            )
          }
        >
          Try captcha
        </Button> */}
      </form>
    </Form>
  );
}
