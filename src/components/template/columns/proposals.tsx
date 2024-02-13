"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type proposals = {
  identifier: string;
  title: string;
  client: string;
  status: string;
  createdAt: string;
  paymentLink: string;
};

export const columns: ColumnDef<proposals>[] = [
  {
    accessorKey: "identifier",
    header: "Identificador",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
  },
  {
    accessorKey: "paymentLink",
    header: "Link de pago",
  },
];
