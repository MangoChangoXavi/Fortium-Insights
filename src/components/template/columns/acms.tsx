"use acm";

import { type ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "buildingType",
    header: "Tipo de inmueble",
  },
  {
    accessorKey: "numberOfRoms",
    header: "Numero de habitaciones",
  },
  {
    accessorKey: "numberOfBathroms",
    header: "Numero de baños",
  },
  {
    accessorKey: "numberOfParkingLots",
    header: "Numero de parqueaderos",
  },
  {
    accessorKey: "totalArea",
    header: "Area total",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creacion",
  },
];
