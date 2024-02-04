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
import { SingleDateItem } from "@/components/layouts/single-date-item";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { StepsButtonGroup } from "./StepsButtonGroup";

const FormSchema = z.object({
  interest: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El interes es requerido",
        invalid_type_error: "El interes no tiene que ir vacio",
      })
      .positive("El interes tiene que ser positivo")
      .max(100, "El interes no puede ser mayor a 100% digitos"),
  ),
  payday: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El dia de pago es requerido",
        invalid_type_error: "El dia de pago no tiene que ir vacio",
      })
      .positive("El dia de pago tiene que ser positivo")
      .max(31, "El dia de pago no puede ser mayor a 31"),
  ),
  startDate: z.date({ required_error: "La fecha inicial es requerida" }),
  endDate: z.date({ required_error: "La fecha final es requerida" }),
  comments: z
    .string()
    .max(5000, {
      message: "Los comentarios no pueden ser mayor a 5000 caracteres",
    })
    .optional(),
  downpaymentNumber: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({
          required_error: "El numero de cuotas de enganche es requerido",
          invalid_type_error:
            "El numero de cuotas de enganche no tiene que ir vacio",
        })
        .positive("El numero de cuotas de enganche tiene que ser positivo")
        .max(10, "El numero de cuotas de enganche no puede ser mayor a 10"),
    )
    .optional(),
  downpaymentQuota: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({
          required_error: "El precio de la cuota de enganche es requerido",
          invalid_type_error:
            "El precio de la cuota de enganche no tiene que ir vacio",
        })
        .positive("El precio de la cuota de enganche tiene que ser positivo")
        .max(
          999999,
          "El precio de la cuota de enganche no puede ser mayor a 999999",
        ),
    )
    .optional(),
  downpaymentComments: z
    .string()
    .max(5000, {
      message:
        "Los comentarios del enganche no pueden ser mayor a 5000 caracteres",
    })
    .optional(),
  reservationPrice: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "la reserva es requerida",
        invalid_type_error: "la reserva no tiene que ir vacia",
      })
      .positive("la reserva tiene que ser positiva")
      .max(99999, "la reserva no puede ser mayor a 5 digitos"),
  ),
  downpaymentDate: z.date({
    required_error: "La fecha de enganche es requerida",
  }),
  reservationNumber: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({
          required_error: "El numero de cuotas de reserva es requerido",
          invalid_type_error:
            "El numero de cuotas de reserva no tiene que ir vacio",
        })
        .positive("El numero de cuotas de reserva tiene que ser positivo")
        .max(10, "El numero de cuotas de reserva no puede ser mayor a 10"),
    )
    .optional(),
  reservationQuota: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({
          required_error: "El precio de la cuota de reserva es requerido",
          invalid_type_error:
            "El precio de la cuota de reserva no tiene que ir vacio",
        })
        .positive("El precio de la cuota de reserva tiene que ser positivo")
        .max(
          999999,
          "El precio de la cuota de reserva no puede ser mayor a 999999",
        ),
    )
    .optional(),
  reservationComments: z
    .string()
    .max(5000, {
      message:
        "Los comentarios de la reserva no pueden ser mayor a 5000 caracteres",
    })
    .optional(),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  handlePrevious: () => void;
}

export function PaymentInfo({ handleSubmit, handlePrevious }: PropsI) {
  const [fractionalDownPayment, setFractionalDownPayment] =
    useState<boolean>(false);
  const [fractionalReservation, setFractionalReservation] =
    useState<boolean>(false);

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
            Información de Pago
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Este es el cuarto paso para llenar una solicitud de compra, aca
            tiene que especificar como se va a realizar el pago del lote a
            reservar con todos los detalles necesarios
          </article>
        </div>

        {/* inputs group */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interés</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Día de Pago</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <SingleDateItem
                  label="Fecha de Inicio"
                  field={field}
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 1}
                />
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <SingleDateItem
                  label="Fecha Final"
                  field={field}
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 40}
                />
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios Generales</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="downpaymentDate"
              render={({ field }) => (
                <SingleDateItem
                  label="Fecha de Enganche"
                  field={field}
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 1}
                />
              )}
            />
            <div className="flex flex-col justify-center gap-4">
              <Label htmlFor="airplane-mode" className="cursor-pointer">
                {" "}
                Enganche Fraccionado?
              </Label>
              <Switch
                id="airplane-mode"
                checked={fractionalDownPayment}
                onClick={() => setFractionalDownPayment((prev) => !prev)}
              />
            </div>
          </div>
          <div
            className={`${
              fractionalDownPayment ? "grid grid-cols-2 gap-4" : "hidden"
            }`}
          >
            <FormField
              control={form.control}
              name="downpaymentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Cuotas</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="downpaymentQuota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio de Cuota</FormLabel>
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
            name="downpaymentComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios del Enganche</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="reservationPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio de Reserva</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-center gap-4">
              <Label htmlFor="airplane-mode" className="cursor-pointer">
                {" "}
                Reserva Fraccionada?
              </Label>
              <Switch
                id="airplane-mode"
                checked={fractionalReservation}
                onClick={() => setFractionalReservation((prev) => !prev)}
              />
            </div>
          </div>
          <div
            className={`${
              fractionalReservation ? "grid grid-cols-2 gap-4" : "hidden"
            }`}
          >
            <FormField
              control={form.control}
              name="reservationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Cuotas</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reservationQuota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio de Cuota</FormLabel>
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
            name="reservationComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios de la Reserva</FormLabel>
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
