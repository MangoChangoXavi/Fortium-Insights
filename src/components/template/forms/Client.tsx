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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RightArrowIcon } from "~/components/system/ui/Icons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const FormSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .max(500, {
      message: "El nombre del cliente no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El nombre del cliente no puede ser menor a 3 caracteres",
    }),
  company: z
    .string({ required_error: "El nombre de la empresa es requerido" })
    .max(500, {
      message: "El nombre del cliente no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El nombre del cliente no puede ser menor a 3 caracteres",
    }),
  role: z
    .string({ required_error: "El rol es requerido" })
    .max(500, {
      message: "El rol no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El rol no puede ser menor a 3 caracteres",
    }),
  phone: z.string().optional(),
  location: z
    .string({ required_error: "la ubicacion es requerida" })
    .max(5000, {
      message: "la ubicacion no puede ser mayor a 5000 caracteres",
    }),
  linkedIn: z
    .string({ required_error: "El linkedin es requerido" })
    .max(500, {
      message: "El linkedin no puede ser mayor a 500 caracteres",
    })
    .min(3, {
      message: "El linkedin no puede ser menor a 3 caracteres",
    }),
  notes: z
    .string()
    .max(5000, {
      message: "la ubicacion no puede ser mayor a 5000 caracteres",
    })
    .optional(),
  nextMeeting: z.date({ required_error: "La fecha de contacto es requerida" }),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function Client({ handleSubmit }: PropsI) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-10 space-y-6"
      >
        {/* inputs group */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Cliente</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Empresa</FormLabel>
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicacion</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
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
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nextMeeting"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Reunion</FormLabel>
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
                      fromYear={2024}
                      toYear={2025}
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <Button type="submit" variant={"primary"}>
            Enviar &nbsp; <RightArrowIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
}
