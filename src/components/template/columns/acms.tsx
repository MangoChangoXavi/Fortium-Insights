"use acm";

import { type ColumnDef } from "@tanstack/react-table";
import SellIllustration from "~//assets/svg/sell.svg";
import RentIllustration from "~//assets/svg/rent.svg";
import { Button } from "@/components/ui/button";
import {
  BathIcon,
  BedIcon,
  CarIcon,
  ClockIcon,
  EyeIcon,
  LocateIcon,
  PrinterIcon,
  RulerIcon,
  SendIcon,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type acm = {
  id: string;
  address: string;
  operationType: string;
  buildingType: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  numberOfParkingLots: number;
  totalArea: number;
  createdAt: Date;
};

export const columns: ColumnDef<acm>[] = [
  {
    accessorKey: "address",
    header: "Direccion",
  },
  {
    accessorKey: "operationType",
    header: "Tipo de operacion",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src={
              acm.operationType === "rent" ? RentIllustration : SellIllustration
            }
            alt="Rent"
            width={40}
            height={40}
          />
          {acm.operationType === "rent" ? "Arriendo" : "Venta"}
        </div>
      );
    },
  },
  {
    accessorKey: "buildingType",
    header: "Tipo de inmueble",
  },
  {
    accessorKey: "numberOfRooms",
    header: "Numero de habitaciones",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <BedIcon className="h-4 w-4" />
          <span>{acm.numberOfRooms}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "numberOfBathrooms",
    header: "Numero de baños",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <BathIcon className="h-4 w-4" />
          <span>{acm.numberOfBathrooms}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "numberOfParkingLots",
    header: "Numero de parqueaderos",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <CarIcon className="h-4 w-4" />
          <span>{acm.numberOfRooms}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalArea",
    header: "Area total",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <RulerIcon className="h-4 w-4" />
          <span>{acm.numberOfRooms} mts2</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creacion",
    cell: ({ row }) => {
      const acm = row.original;
      return new Date(acm.createdAt).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <>
          <div className="flex flex-row gap-2">
            <DrawerTrigger>
              <Button variant="default" className="h-8 w-8 p-0">
                <EyeIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerTrigger>
              <Button variant="default" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <PrinterIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerTrigger>
              <Button variant="default" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <SendIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerPortal>
            <DrawerOverlay className="fixed inset-0 bg-black/40" />
            <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-[40%] rounded-none">
              <DrawerHeader>
                <DrawerTitle>Resultado de la tasacion</DrawerTitle>
                <DrawerDescription>
                  Te traemos la busqueda de la tasacion de la propiedad, esta es
                  una herramienta que te ayuda a valorar sin embargo eres tu
                  quien tiene la ultima palabra.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex w-full flex-row gap-8 px-4">
                <span className="flex flex-row gap-2  text-xs font-medium text-zinc-500">
                  <ClockIcon className="h-4 w-4" />
                  {acm.createdAt.toLocaleString()}
                </span>
                <span className="flex  flex-row gap-2 text-xs font-medium text-zinc-500">
                  <LocateIcon className="h-4 w-4" /> {acm.address}
                </span>
                {/* number of rooms */}
                <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                  <BedIcon className="h-4 w-4" />
                  <span>{acm.numberOfRooms}</span>
                </div>
                {/* number of bathrooms */}
                <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                  <BathIcon className="h-4 w-4" />
                  <span>{acm.numberOfBathrooms}</span>
                </div>
                {/* number of parking lots */}
                <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                  <CarIcon className="h-4 w-4" />
                  <span>{acm.numberOfRooms}</span>
                </div>
                {/* total area */}
                <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                  <RulerIcon className="h-4 w-4" />
                  <span>{acm.numberOfRooms} mts2</span>
                </div>
              </div>
              <hr className="my-6 h-[0px] w-full border border-neutral-400 border-opacity-50" />
              <div className="flex w-full flex-row justify-between px-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <Image
                    src={
                      acm.operationType === "rent"
                        ? RentIllustration
                        : SellIllustration
                    }
                    alt="Rent"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col gap-1">
                    {acm.operationType === "rent" ? "Arriendo" : "Venta"}
                    <span className="text-xs font-medium text-zinc-500 ">
                      {acm.id}
                    </span>
                  </div>
                </div>
                <Button variant="secondary">GTQ. 54,000.00</Button>
              </div>
              <hr className="my-6 h-[0px] w-full border border-neutral-400 border-opacity-50" />
            </DrawerContent>
          </DrawerPortal>
        </>
      );
    },
  },
];
