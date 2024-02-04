"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StepsButtonGroup } from "./StepsButtonGroup";

const FormSchema = z.object({
  birthdate: z.date({ required_error: "La fecha de nacimiento es requerida" }),
  civilStatus: z
    .string({
      required_error: "El estado civil es requerido",
      invalid_type_error: "El estado civil no tiene que ir vacio",
    })
    .max(500, {
      message: "Las estado civil no puede ser mayor a 500 caracteres",
    }),
  dpi: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El dpi es requerido",
        invalid_type_error: "El dpi no tiene que ir vacio",
      })
      .positive("El dpi tiene que ser positivo")
      .max(9999999999999, "El dpi no puede ser mayor a 9999999999999"),
  ),
  nit: z.preprocess(
    // Use this for numbers
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({
        required_error: "El nit es requerido",
        invalid_type_error: "El nit no tiene que ir vacio",
      })
      .positive("El nit tiene que ser positiva")
      .max(9999999999, "El nit no puede ser mayor a 9999999999"),
  ),
  citizenship: z
    .string({ required_error: "La nacionalidad es requerida" })
    .max(50, {
      message: "La nacionalidad no puede ser mayor a 50 caracteres",
    }),
  profession: z
    .string({ required_error: "La profesion es requerida" })
    .max(100, {
      message: "La profesion no puede ser mayor a 100 caracteres",
    }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  handlePrevious: () => void;
}

export function CustomerInfo({ handleSubmit, handlePrevious }: PropsI) {
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
            Informacion del Cliente
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Este es el segundo paso para la creacion de una solicitud de compra,
            por favor ingrese la informacion básica del cliente
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "border-glow px-4 py-[11px] pl-3 text-left text-base font-semibold not-italic leading-[normal] text-black",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            field.value.toLocaleDateString()
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="my-2 w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons" //Also: dropdown | buttons
                        fromYear={1940}
                        toYear={2023}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="civilStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                      <SelectItem value="Casado/a">Casado/a</SelectItem>
                      <SelectItem value="Unido/a">Unido/a</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dpi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DPI</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nit</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nacionalidad</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profesión</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
