import React from "react";

import Image from "next/image";
import { Eye, MessageSquareIcon, Star } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DrawerTrigger } from "@/components/ui/drawer";

export const VendorCard = ({
  id,
  title,
  category,
  description,
  image,
  rating,
  setVendorId,
}: {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  setVendorId: (vendorId: string) => void;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="relative flex h-fit w-full flex-col items-center gap-6 rounded-2xl border border-slate-300 pb-6 ">
          <div className="relative h-44 w-full">
            <Image
              className="rounded-tl-lg rounded-tr-lg"
              src={image}
              alt="Vendor Image"
              objectFit="cover"
              fill
            />
          </div>
          <div className="w-full">
            <div className="w-full text-center text-sm font-medium text-zinc-800">
              {title}
            </div>
            <div className="text-center text-xs font-normal text-neutral-400">
              {category}
            </div>
          </div>
          <HoverCardContent className="text-center text-xs font-normal text-zinc-800">
            {description}
          </HoverCardContent>
          <div className="flex w-full items-center justify-end gap-2 px-6">
            <DrawerTrigger
              onClick={() => setVendorId(id)}
              className="h-8 w-8 cursor-pointer rounded-full bg-[#093061] p-2 text-center text-xs font-medium text-white shadow transition duration-150 ease-in-out hover:-translate-y-1 hover:bg-blue-950"
            >
              <MessageSquareIcon size={16} className="stroke-white" />
            </DrawerTrigger>
          </div>
          <div className="absolute right-[16px] top-[16px]  rounded-2xl bg-white px-[9px] py-[8px]">
            <div className="flex items-center justify-center gap-[5px]">
              <span className="inline-flex text-xs font-normal text-[#093061]">
                {rating} stars
              </span>
              <Star size={12} className="fill-white stroke-[#093061]" />
            </div>
          </div>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};
