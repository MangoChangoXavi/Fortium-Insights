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
    headers: {
      "Content-Type": "application/json",
    },
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
        <Button
          type="button"
          onClick={() =>
            handleCaptchaSubmission(
              "03AFcWeA68-z8vwZwm1csEkebTuGqWFLFzEYcRH7XwtR6oObwsTwroifMv6lyp-sHJ1Wb6IwH2NQ5BxTQmUmsGn-z3BbmESQaY8-o1MJ7BHr0gmeueyn8cNr03l3Mdy9SNzkODLiPFa3dVlmdhKmkKog_uXWJAyPE00yBnPmAocINenmP3TPdfsBeogFE6AqAW9sUVTqzFTKouQSNJ1gBZ9myuQf1Torl3MzfYKIOM3jWweHLC3UYqJ49R_2CFaFV3ea5TJzcAqF0RU4RujkJqMQmKzQVn_ZICV6bLIyc5Wsb6zHOMCsZOzJItYt5OHdZTzLo1i50vQaTNEqyMfgsPAEA8uOnCyv_5Y9mP4FRvVS6a3eAIs8M5HQMWDRSiM-rdqqd0un4tkc1OQXlf0dQe3dVlRu0hM9h6LmGT87O4OG9UelIHuUbiXWZuKTzQhfNY0buw0otJjvLkmZlUNyhjX2TNoHTD0kOoZc86fSM13twdM_xpvUqKIkOrfPzQ9lB2YtdvRd0fLejBQdWYqi0XKoPUyNUfoM432LHeRLAPPa6E9Srilib1OBsoiyJFa5yHSUGs_QEGPkf7Vl3-NWjF8B6rndRxFhJW1Pn4G1LDzr_lc6nqofaDCM3xFYdSYLDcHMRY38Gp2plXfbUFKoTxmAQcDIi_lqGgKvpv6t7sYxzlAdP93p0sk3Sk7O0-lC10TXuMe9Qis5R2gpPwaxlCQqnuA6Tsh4UJQVJLdvTJCyqkzvowyxtetwsD9a919dTCeTxzXSfy4jHjZy0UHYWQ4X8g9gXgJa6g_6zBF2jPOgwhCV1keVIKjFJml2Zi0sH0QtyFSyHR5fBfZjcXVpGHW3rpDkBz7pF0u8FpEI7QvrbqesjtSS90C_otNMfpNpdN2dhEvQtMuESPoNsrO_UX7dO92c6mBb8ivIEufr73wTXPrXXIC0aBI18qJ2WtTwMC0hPsUSAUxBle-UZsiVOYS4drvo8emFLIdpeFT1PBZgFX8tjBWmliyOjepKao6TgTP5iM-r2p8L835lHfn96A7QfSyt2j_e5flRYFR8MZDdhc2lxTrM2VfHsYLxivie3SAKd8bOgLj3VB85P6wTuqZ6UIiXvZuifnZB6odIOCI2whurhOfj8Dn22bHV1nom0sPECpH9mCViY7ihY18Y_IzbCBHd_S_VJHV8qKV4iykkg73LHU6Ng4eK4vRdqDcJDrDF2LovPDmmuGEp4IrVHNp5sp8dsiOul9qnfJZeHF62vcthtqgyNyhYWOC7t1jAaqqyo6375VVmXRzK1oDgPUk484IKmmnRieUpxkXA8xq7YdvfgHBqlhor5dTlnVB26R8pAGyJ-fBvMfPz16wfSsSJkJe8B1L0fgOTesPWJxhb3L9DHHLDKyguTEtM38hGtpkFGNDvqF-wnbvChwj6DQABLd2_9RGFjoOySR1PyWRdVvg8GwYg8ob6xf1P3kc0gvUa1vblBjE7iLOZVxFi2MFdskGfVcR33dSrLaJSOmzJk48s_lv1sORn0ZVvPgVaCMJRxxf9inrPedrDRrDFkWCDMf0fzVW7AYpdULH-pQZ1m4BzzaaTHWuuQY1SUO8ZDmxiUvI1137qEnOWzqhRm_c9SeI62UnwrvNTU7tfx_dcqd-Uz9mIV1cFs",
            )
          }
        >
          Try captcha
        </Button>
      </form>
    </Form>
  );
}
