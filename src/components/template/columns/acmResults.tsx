import { type ColumnDef } from "@tanstack/react-table";
import { BathIcon, BedIcon, CarIcon, EyeIcon, RulerIcon } from "lucide-react";
import Link from "next/link";
import { GTQ } from "~/utils/functions";
export type acm = {
  id: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  numberOfParkingLots: number;
  totalArea: number;
  price: number;
  url: string;
};

export const columns: ColumnDef<acm>[] = [
  {
    accessorKey: "rooms",
    header: "Numero de habitaciones",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <BedIcon className="h-4 w-4" />
          <span>{acm.numberOfRooms}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "bathrooms",
    header: "Numero de baños",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <BathIcon className="h-4 w-4" />
          <span>{acm.numberOfBathrooms}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "parkingLots",
    header: "Numero de parqueaderos",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <CarIcon className="h-4 w-4" />
          <span>{acm.numberOfParkingLots}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: "Area total",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <RulerIcon className="h-4 w-4" />
          <span>{acm.totalArea} mts2</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      const acm = row.original;
      return <span>{GTQ.format(acm.price)}</span>;
    },
  },
  {
    accessorKey: "url",
    header: "Link",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <Link
          href={acm.url}
          target="_blank"
          className="flex flex-row gap-2 hover:text-blue-500 hover:underline"
        >
          Ver <EyeIcon className="h-4 w-4" />
        </Link>
      );
    },
  },
];
