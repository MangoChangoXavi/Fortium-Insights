"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { GTQ } from "~/utils/functions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type projects = {
  projectName: string;
  totalSells: number;
  totalRegistered: number;
  totalSelled: number;
  totalReserved: number;
  totalAvailable: number;
  progress: number;
};

export const projectsColumns: ColumnDef<projects>[] = [
  {
    accessorKey: "projectName",
    header: "Proyecto",
  },
  {
    accessorKey: "totalSells",
    header: "Total Vendido",
    cell: ({ row }) => {
      return <>{GTQ.format(row.original.totalSells)}</>;
    },
  },
  {
    accessorKey: "totalRegistered",
    header: "Total de Lotes Registrados",
  },
  {
    accessorKey: "totalSelled",
    header: "Total de Lotes Vendidos",
  },
  {
    accessorKey: "totalReserved",
    header: "Total de Lotes Reservados",
  },
  {
    accessorKey: "totalAvailable",
    header: "Total de Lotes Disponibles",
  },
  {
    accessorKey: "progress",
    header: "Progreso",
    cell: ({ row }) => {
      return <>{row.original.progress}%</>;
    },
  },
];
