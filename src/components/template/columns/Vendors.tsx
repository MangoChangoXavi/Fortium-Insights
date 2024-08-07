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
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type vendor = {
  id: string;
  name: string;
  vendorImgUrl: string;
  createdAt: Date;
  category: string;
  rating: number;
  numberOfReviews: number;
  vendor: string;
  status: string;
  handleClickAction: (vendorId: string, action: string) => void;
};

export const columns: ColumnDef<vendor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const vendor = row.original;
      return (
        <Link
          href={`/details/${vendor.id}`}
          className="flex flex-row items-center gap-3"
        >
          <div className="relative h-10 w-10">
            <Image
              className="rounded-full"
              src={vendor.vendorImgUrl}
              alt="Vendor Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium  not-italic text-[#2c2c2c]">
              {vendor.name}
            </span>
            <span className="text-xs font-medium  not-italic text-[#999999] ">
              {vendor.numberOfReviews} Reviews
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const vendor = row.original;
      return (
        <>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`h-[4px] w-[4px] rounded-full ${
                {
                  disabled: "bg-red-500",
                  active: "bg-emerald-500",
                }[vendor.status ? vendor.status : "active"]
              }`}
            ></div>
            <span className="text-xs font-medium  not-italic text-[#2c2c2c]">
              {
                {
                  disabled: "Disabled",
                  active: "Active",
                }[vendor.status ? vendor.status : "active"]
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
      const vendor = row.original;
      return vendor.createdAt.toLocaleString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const vendor = row.original;
      let status = "active";
      const handleClickAction = () => {
        vendor.handleClickAction(vendor.id, status);
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
                You are going to modify <b>{vendor.name}</b>{" "}
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
