"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type onboard = {
  id: string;
  links: string;
  intro: string;
  services: string;
  problems: string;
  success: string;
  budget: string;
};

export const columns: ColumnDef<onboard>[] = [
  {
    accessorKey: "links",
    header: "Links",
  },
  {
    accessorKey: "intro",
    header: "Negocio",
  },
  {
    accessorKey: "services",
    header: "Setrvicio Interesado",
  },
  {
    accessorKey: "problems",
    header: "Problemas",
  },
  {
    accessorKey: "success",
    header: "Exito esperado",
  },
  {
    accessorKey: "budget",
    header: "Presupuesto",
  },
];
