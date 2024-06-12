import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import CardGradientSvg from "~/assets/svg/card-gradient.svg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type Vendor, vendors } from "~/lib/vendors";
import Link from "next/link";

const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  return (
    <Link
      href={`details/${vendor.name}`}
      className="group relative h-[221px] w-[368px] cursor-pointer"
    >
      <Image
        alt="service image"
        src={vendor.image}
        height={221}
        width={368}
        className="pointer-events-none absolute bottom-0 "
      />
      <div className="w-full justify-between">
        {/* gradient */}
        <Image
          src={CardGradientSvg}
          alt="gradient"
          width={368}
          height={88}
          className="absolute bottom-0"
        />
        {/* card text */}
        <div className=" absolute bottom-0 flex cursor-pointer flex-col gap-1 p-3">
          <div className="text-base font-medium text-white transition duration-150 ease-in-out group-hover:scale-110">
            {vendor.name}
          </div>
          <div className="w-[119px] text-sm font-normal text-white transition duration-150 ease-in-out group-hover:scale-110">
            {vendor.description}
          </div>
        </div>
        {/* card ranks */}
        <div className="absolute bottom-0 right-0 flex gap-1 p-3 ">
          {Array.from({ length: vendor.rating }, (_, i) => (
            <Star key={i} size={16} fill="white" stroke="white" />
          ))}
        </div>
      </div>
    </Link>
  );
};

const VendorScroll = ({
  title,
  vendors,
}: {
  title: string;
  vendors: Vendor[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mx-12 text-xl font-bold text-blue-950">{title}</h2>
      <ScrollArea className="w-screen whitespace-nowrap rounded-md px-12">
        <div className="flex w-max space-x-4 pb-6">
          {vendors.map((vendor) => (
            <VendorCard vendor={vendor} key={vendor.name} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export const Vendors = () => {
  return (
    <div className="my-8 flex flex-col gap-6">
      <VendorScroll title="New Vendors" vendors={vendors} />
      <VendorScroll title="Best Rated" vendors={vendors} />
    </div>
  );
};
