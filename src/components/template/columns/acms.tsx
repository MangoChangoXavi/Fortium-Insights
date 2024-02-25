"use acm";

import { type ColumnDef } from "@tanstack/react-table";
import SellIllustration from "~//assets/svg/sell.svg";
import RentIllustration from "~//assets/svg/rent.svg";
import { Button } from "@/components/ui/button";
import {
  BathIcon,
  BedIcon,
  CarIcon,
  EyeIcon,
  MoreHorizontal,
  PaperclipIcon,
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
import { Client } from "../forms/Client";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type acm = {
  id: string;
  address: string;
  operationType: string;
  buildingType: string;
  numberOfRoms: number;
  numberOfBathroms: number;
  numberOfParkingLots: number;
  totalArea: number;
  createdAt: string;
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
    accessorKey: "numberOfRoms",
    header: "Numero de habitaciones",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <BedIcon className="h-4 w-4" />
          <span>{acm.numberOfRoms}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "numberOfBathroms",
    header: "Numero de baños",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <BathIcon className="h-4 w-4" />
          <span>{acm.numberOfBathroms}</span>
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
          <span>{acm.numberOfRoms}</span>
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
          <span>{acm.numberOfRoms} mts2</span>
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
        <Drawer direction="right">
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
                <DrawerTitle>Nuevo Cliente</DrawerTitle>
                <DrawerDescription>
                  En este apartado tienes que ingresar la ficha del nuevo
                  cliente para comenzar a gestionarlo.
                </DrawerDescription>
              </DrawerHeader>
              <div className="overflow-auto px-4">
                {acm.address} {acm.numberOfBathroms}
              </div>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      );
    },
  },
];
