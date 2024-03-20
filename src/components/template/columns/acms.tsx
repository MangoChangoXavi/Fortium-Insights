import { type ColumnDef } from "@tanstack/react-table";
import SellIllustration from "~//assets/svg/sell.svg";
import RentIllustration from "~//assets/svg/rent.svg";
import { Button } from "@/components/ui/button";
import {
  BathIcon,
  BedIcon,
  CarIcon,
  EyeIcon,
  PrinterIcon,
  RulerIcon,
  SendIcon,
} from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export enum AcmActions {
  VIEW = "view",
  PRINT = "print",
  SEND = "send",
}

export type acm = {
  id: string;
  address: string;
  operationType: string;
  buildingType: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  numberOfParkingLots: number;
  totalArea: number;
  createdAt: Date;
  handleSelect: (action: AcmActions) => Promise<void>;
};

export const columns: ColumnDef<acm>[] = [
  {
    accessorKey: "address",
    header: "Direccion",
  },
  {
    accessorKey: "operationType",
    header: "Tipo de operacion",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src={
              acm.operationType === "rent" ? RentIllustration : SellIllustration
            }
            alt="Rent"
            width={40}
            height={40}
          />
          {acm.operationType === "rent" ? "Arriendo" : "Venta"}
        </div>
      );
    },
  },
  {
    accessorKey: "buildingType",
    header: "Tipo de inmueble",
    cell: ({ row }) => {
      const acm = row.original;

      return (
        <>
          {
            {
              house: "Casa",
              apartment: "Apartamento",
              office: "Oficina",
              land: "Terreno",
            }[acm.buildingType]
          }
        </>
      );
    },
  },
  {
    accessorKey: "numberOfRooms",
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
    accessorKey: "numberOfBathrooms",
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
    accessorKey: "numberOfParkingLots",
    header: "Numero de parqueaderos",
    cell: ({ row }) => {
      const acm = row.original;
      return (
        <div className="flex flex-row gap-2">
          <CarIcon className="h-4 w-4" />
          <span>{acm.numberOfRooms}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalArea",
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
    accessorKey: "createdAt",
    header: "Fecha de creacion",
    cell: ({ row }) => {
      const acm = row.original;
      return new Date(acm.createdAt).toLocaleString();
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const acm = row.original;
      const handleClickView = () => acm.handleSelect(AcmActions.VIEW);
      const handleClickPrint = () => acm.handleSelect(AcmActions.PRINT);
      const handleClickSend = () => acm.handleSelect(AcmActions.SEND);
      return (
        <>
          <div className="flex flex-row gap-2">
            <DrawerTrigger>
              <Button
                variant="default"
                className="h-8 w-8 p-0"
                onClick={handleClickView}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
              <Button
                variant="default"
                className="h-8 w-8 p-0"
                onClick={handleClickPrint}
              >
                <span className="sr-only">Open menu</span>
                <PrinterIcon className="h-4 w-4" />
              </Button>
            <DrawerTrigger>
              <Button
                variant="default"
                className="h-8 w-8 p-0"
                onClick={handleClickSend}
              >
                <span className="sr-only">Open menu</span>
                <SendIcon className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
          </div>
        </>
      );
    },
  },
];
