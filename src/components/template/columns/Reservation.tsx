"use client";

import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reservation = {
  reservationId: number;
  identifier: string;
  client: string;
  status: number;
  sellerImage: string;
  seller: string;
  price: string;
  downpayment: string;
  handleClickAction: (reservationId: number, action: string) => void;
  handleClickPDF: (reservationId: number) => Promise<void>;
};

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "identifier",
    header: "Numero de Lote",
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <div
            className={`h-[4px] w-[4px] rounded-full ${
              {
                1: "bg-yellow-500",
                2: "bg-emerald-500",
                3: "bg-red-500",
              }[row.original.status]
            }`}
          ></div>
          <span className="text-xs font-medium  not-italic text-[#2c2c2c]">
            {
              {
                1: "Reservado",
                2: "Vendido",
                3: "Cancelado",
              }[row.original.status]
            }
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "seller",
    header: "Vendedor",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <Image
            alt={row.original.seller}
            src={row.original.sellerImage}
            width={40}
            height={40}
            className="rounded-full"
          />
          {row.original.seller}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "downpayment",
    header: "Enganche",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const reservation = row.original;
      let action = "sell";
      const handleClickAction = () => {
        reservation.handleClickAction(reservation.reservationId, action);
      };
      const handleClickPDF = async () => {
        await reservation.handleClickPDF(reservation.reservationId);
      };

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {reservation.status === 1 && (
                <>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onClick={() => {
                        action = "sell";
                      }}
                    >
                      Vendida
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onClick={() => {
                        action = "cancel";
                      }}
                    >
                      Cancelar
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </>
              )}
              <DropdownMenuItem onClick={handleClickPDF}>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Estas a punto de modificar el estado de la reserva del cliente{" "}
                <b>{reservation.client}</b> del lote{" "}
                <b>{reservation.identifier}</b>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction onClick={handleClickAction}>
                Si, Adelante
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
