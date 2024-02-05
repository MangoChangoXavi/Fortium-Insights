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
export type user = {
  userId: string;
  userName: string;
  userEmail: string;
  userImage: string;
  userRole: string;
  createdAt: Date;
  handleClickAction: (userId: string, action: string) => void;
};

export const columns: ColumnDef<user>[] = [
  {
    accessorKey: "userName",
    header: "Usuario",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-row items-center">
          <Image
            className="mr-2 shrink-0 rounded-full border-2 border-white object-cover dark:border-primary-700"
            src={user.userImage}
            alt=""
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <span className="text-darkGray text-xs  font-medium not-italic">
              {user.userName}
            </span>
            <a
              className="text-gray text-xs  font-medium not-italic hover:underline"
              href={`mailto:${user.userEmail}`}
            >
              {user.userEmail}
            </a>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creacion",
    cell: ({ row }) => {
      const user = row.original;
      return user.createdAt.toLocaleString();
    },
  },
  {
    accessorKey: "userRole",
    header: "Rol",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`h-[4px] w-[4px] rounded-full ${
                {
                  user: "bg-red-500",
                  admin: "bg-emerald-500",
                  salesperson: "bg-primary-500",
                  supervisor: "bg-yellow-500",
                }[user.userRole ? user.userRole : "user"]
              }`}
            ></div>
            <span className="text-xs font-medium  not-italic text-[#2c2c2c]">
              {
                {
                  user: "Desactivado",
                  admin: "Administrador",
                  salesperson: "Vendedor",
                  supervisor: "Supervisor",
                }[user.userRole ? user.userRole : "user"]
              }
            </span>
          </div>
        </>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;
      let role = "salesperson";
      const handleClickAction = () => {
        user.handleClickAction(user.userId, role);
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
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    role = "salesperson";
                  }}
                >
                  Vendedor
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    role = "admin";
                  }}
                >
                  Admin
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    role = "supervisor";
                  }}
                >
                  Supervisor
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Estas a punto de modificar el rol del usuario{" "}
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
