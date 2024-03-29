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
import {
  BathIcon,
  BedIcon,
  Building,
  CarIcon,
  MapIcon,
  RulerIcon,
  Search,
  TagIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MapSelect from "~/components/system/ui/MapSelect";
import { useState } from "react";

const FormSchema = z.object({
  address: z.string({ required_error: "La ubicacion es requerida" }).max(5000, {
    message: "La ubicacion no pueden ser mayor a 5000 caracteres",
  }),
  operationType: z
    .string({ required_error: "El tipo de operacion es requerida" })
    .max(5000, {
      message: "El tipo de operacion no puede ser mayor a 5000 caracteres",
    })
    .optional(),
  buildingType: z
    .string({ required_error: "El tipo de inmueble es requerida" })
    .max(5000, {
      message: "El tipo de inmueble no puede ser mayor a 5000 caracteres",
    })
    .optional(),
  minNumberOfRooms: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El numero de cuartos tiene que ser positiva")
        .max(99, "El numero de cuartos no puede ser mayor a 99"),
    )
    .optional(),
  maxNumberOfRooms: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El numero de cuartos tiene que ser positiva")
        .max(99, "El numero de cuartos no puede ser mayor a 99"),
    )
    .optional(),
  minNumberOfBathrooms: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El numero de baños tiene que ser positiva")
        .max(99, "El numero de baños no puede ser mayor a 99"),
    )
    .optional(),
  maxNumberOfBathrooms: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El numero de baños tiene que ser positiva")
        .max(99, "El numero de baños no puede ser mayor a 99"),
    )
    .optional(),
  minNumberOfParkingLots: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El numero de parqueos tiene que ser positiva")
        .max(999, "El numero de parqueos no puede ser mayor a 999"),
    )
    .optional(),
  maxNumberOfParkingLots: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El numero de parqueos tiene que ser positiva")
        .max(999, "El numero de parqueos no puede ser mayor a 999"),
    )
    .optional(),
  minTotalArea: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El area total tiene que ser positiva")
        .max(9999, "El area total no puede ser mayor a 9999"),
    )
    .optional(),
  maxTotalArea: z
    .preprocess(
      // Use this for numbers
      (args) => (args === "" ? undefined : args),
      z.coerce
        .number({})
        .positive("El area total tiene que ser positiva")
        .max(9999, "El area total no puede ser mayor a 9999"),
    )
    .optional(),
});

interface PropsI {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function RequirementsForm({ handleSubmit }: PropsI) {
  const [value, setValue] = useState<{ label: string } | null>(null);
  const addressValue = value?.label ?? "";
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      address: addressValue,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-6">
        {/* title and subtitle */}
        <div className="flex flex-col gap-[16px] ">
          {/* title */}
          <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
            Busqueda de Requerimientos
          </h1>
          {/* subtitle */}
          <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
            Deja que la inteligencia artificial busque en todo internet por ti,
            no es necesario llenar todos los campos
          </article>
        </div>
        {/* inputs group */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row gap-2">
                  <MapIcon className="h-4 w-4" /> Ubicacion
                </FormLabel>
                <MapSelect value={value} setValue={setValue} />
                <FormControl className="hidden">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="operationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <TagIcon className="h-4 w-4" /> Tipo de operacion
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de operacion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sell">Venta</SelectItem>
                        <SelectItem value="rent">Renta</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <Building className="h-4 w-4" /> Tipo de inmueble
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de inmueble" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Apartamento</SelectItem>
                        <SelectItem value="house">Casa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minNumberOfRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <BedIcon className="h-4 w-4" /> Numero de cuartos minimo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxNumberOfRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <BedIcon className="h-4 w-4" /> Numero de cuartos maximo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minNumberOfBathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <BathIcon className="h-4 w-4" /> Numero de baños minimo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxNumberOfBathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <BathIcon className="h-4 w-4" /> Numero de baños maximo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minNumberOfParkingLots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <CarIcon className="h-4 w-4" /> Numero de parqueos minimo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxNumberOfParkingLots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <CarIcon className="h-4 w-4" /> Numero de parqueos maximo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minTotalArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <RulerIcon className="h-4 w-4" /> Area total minima (mts2)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxTotalArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    <RulerIcon className="h-4 w-4" /> Area total maxima (mts2)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" variant={"primary"}>
          Buscar &nbsp; <Search className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
