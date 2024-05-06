import { BathIcon, BedIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
interface Props {
  url: string;
  formattedPrice: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  totalArea: number;
  address: string;
  imageUrl: string;
  operationType: string;
  buildingType: string;
}
export const Card = ({
  url,
  formattedPrice,
  numberOfBathrooms,
  numberOfRooms,
  totalArea,
  address,
  imageUrl,
  operationType,
  buildingType,
}: Props) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="h-fit w-full max-w-md cursor-pointer rounded-2xl bg-white transition-all duration-100 ease-in-out hover:drop-shadow-md"
    >
      <div className="inline-flex w-full flex-col items-start justify-start">
        <div
          className="relative h-[130px] w-full"
          src="https://via.placeholder.com/416x124"
        >
          <Image
            src={imageUrl}
            fill
            alt="property image"
            className="rounded-tl-lg rounded-tr-lg object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-1 p-4">
          <div className="text-center text-sm font-semibold text-zinc-800">
            {formattedPrice}
          </div>
          <div className="flex flex-row gap-2 text-center text-xs font-normal text-neutral-500">
            {numberOfRooms} <BedIcon size={16} /> | {numberOfBathrooms}{" "}
            <BathIcon size={16} /> | {totalArea} mt2 |{" "}
            {
              {
                apartment: "Apartamento",
                house: "Casa",
                office: "Oficina",
                land: "Terreno",
                warehouse: "Bodega",
              }[buildingType.trim()]
            }{" "}
            en{" "}
            {
              {
                sell: "Venta",
                rent: "Renta",
              }[operationType]
            }
          </div>
          <div className="flex flex-row gap-2 text-start text-xs font-normal text-neutral-400">
            {address}
          </div>
        </div>
      </div>
    </Link>
  );
};
