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
export type category = {
  id: string;
  name: string;
  createdAt: Date;
  numberOfVendors: number;
  status: string;
  handleClickAction: (categoryId: string, action: string) => void;
};

export const columns: ColumnDef<category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "numberOfVendors",
    header: "Vendors",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`h-[4px] w-[4px] rounded-full ${
                {
                  disabled: "bg-red-500",
                  active: "bg-emerald-500",
                }[category.status ? category.status : "active"]
              }`}
            ></div>
            <span className="text-xs font-medium  not-italic text-[#2c2c2c]">
              {
                {
                  disabled: "Disabled",
                  active: "Active",
                }[category.status ? category.status : "active"]
              }
            </span>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      const category = row.original;
      return category.createdAt.toLocaleString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      let status = "active";
      const handleClickAction = () => {
        category.handleClickAction(category.id, status);
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
                    status = "active";
                  }}
                >
                  Active
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    status = "disabled";
                  }}
                >
                  Disable
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are going to modify <b>{category.name}</b>{" "}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction onClick={handleClickAction}>
                Yes, go ahead
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
