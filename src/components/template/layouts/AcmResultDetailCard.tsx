import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { BedIcon, BathIcon, CarIcon, RulerIcon, TrashIcon } from "lucide-react";
import React from "react";
import { GTQ, USD } from "~/utils/functions";

interface PropsI {
  handleDelete?: () => void;
  imagesUrl: string[];
  url: string;
  address: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  numberOfParkingLots: number;
  totalArea: number;
  currency: string;
  price: number;
}

export const AcmResultDetailCard = ({
  imagesUrl,
  url,
  address,
  numberOfRooms,
  numberOfBathrooms,
  numberOfParkingLots,
  totalArea,
  currency,
  price,
  handleDelete,
}: PropsI) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="relative h-40 w-full md:h-full md:w-40">
            <Image
              src={
                imagesUrl[0] ??
                "https://dummyimage.com/600x400/000/fff&text=sin+imagen"
              }
              alt="image"
              fill
              objectFit="cover"
            />
          </div>
          <div className="gap-2">
            <Link
              href={url}
              target="_blank"
              className="inline-block w-full break-words font-semibold text-slate-700 hover:underline md:text-[18px] xl:text-[16px] 2xl:text-[18px]"
            >
              {address}
            </Link>
            <div className="flex">
              {numberOfRooms > 0 && (
                <div className="pr-4 font-bold">
                  <span className="text-zinc-500 md:text-sm lg:text-[14px]">
                    Habitaciones
                  </span>
                  <div className="flex flex-row items-center gap-6 md:text-[13px] lg:text-[14px]">
                    <BedIcon className="h-4 w-4" />
                    <span>{numberOfRooms}</span>
                  </div>
                </div>
              )}

              {numberOfBathrooms > 0 && (
                <div className="pr-4 font-bold">
                  <span className="text-zinc-500 md:text-sm lg:text-[14px]">
                    Baños
                  </span>
                  <div className="flex flex-row items-center gap-4 md:text-[13px] lg:text-[14px]">
                    <BathIcon className="h-4 w-4" />
                    <span>{numberOfBathrooms}</span>
                  </div>
                </div>
              )}

              {numberOfParkingLots > 0 && (
                <div className="pr-4 font-bold">
                  <span className="text-zinc-500 md:text-sm lg:text-[14px]">
                    Parqueos
                  </span>
                  <div className="flex flex-row items-center gap-4 md:text-[13px] lg:text-[14px]">
                    <div className="pl-2">
                      <CarIcon className="h-4 w-4" />
                    </div>
                    <span>{numberOfParkingLots}</span>
                  </div>
                </div>
              )}

              {totalArea > 0 && (
                <div className="font-bold">
                  <span className="text-zinc-500 md:text-sm lg:text-[14px]">
                    Metros
                  </span>
                  <div className="flex flex-row md:text-[13px] lg:text-[14px]">
                    <RulerIcon className="h-4 w-4" />
                    <span className="ml-2">{totalArea}</span>
                    <span className="ml-[2px]">m²</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <span className="font-semibold text-green-600 md:text-xl xl:text-2xl">
            {currency === "Q" ? GTQ.format(price) : USD.format(price)}
          </span>
          {handleDelete && (
            <Button
              className="m-2"
              variant={"error"}
              type="button"
              onClick={handleDelete}
            >
              <TrashIcon className="h-4 w-4 stroke-white" />{" "}
            </Button>
          )}
        </div>
      </div>
      <hr className="my-6 w-full border border-neutral-400 border-opacity-50" />
    </>
  );
};
