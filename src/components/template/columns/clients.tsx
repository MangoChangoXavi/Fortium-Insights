"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

/*
id          String    @id @default(cuid())
  name        String
  company     String
  role        String
  phone       String?
  location    String
  linkedIn    String?
  notes       String?
  status      String    @default("initial") // Initial, Contacted, Proposal, Contract, Completed
  nextMeeting DateTime? @default(now()) @map("next_meeting")
  createdAt   DateTime  @default(now()) @map("created_at")
*/

export type client = {
  id: string;
  name: string;
  company: string;
  role: string;
  phone: string;
  location: string;
  linkedIn: string;
  notes: string;
  status: string;
  nextMeeting: string;
  createdAt: string;
};

export const columns: ColumnDef<client>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "company",
    header: "Compañia",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
  },
  {
    accessorKey: "linkedIn",
    header: "LinkedIn",
  },
  {
    accessorKey: "notes",
    header: "Notas",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "nextMeeting",
    header: "Próxima Reunión",
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
  },
];
