import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import CardGradientSvg from "~/assets/svg/card-gradient.svg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Vendor {
  name: string;
  description: string;
  image: string;
  rating: number;
}

const vendors: Vendor[] = [
  {
    name: "Mango Chango",
    description: "Technology",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    rating: 5,
  },
  {
    name: "Pineapple Chango",
    description: "Technology",
    image: "https://plus.unsplash.com/premium_photo-1683121874142-1de003f138a8",
    rating: 5,
  },
  {
    name: "Banana Chango",
    description: "Technology",
    image: "https://plus.unsplash.com/premium_photo-1663013550257-706caefd470a",
    rating: 5,
  },
  {
    name: "Apple Chango",
    description: "Technology",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    rating: 5,
  },
  {
    name: "Orange Chango",
    description: "Technology",
    image: "https://plus.unsplash.com/premium_photo-1663089294297-fe2b6f33ed3a",
    rating: 5,
  },
  {
    name: "Grape Chango",
    description: "Technology",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd",
    rating: 5,
  },
  {
    name: "Strawberry Chango",
    description: "Technology",
    image: "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c",
    rating: 5,
  },
];

const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  return (
    <div className="group relative h-[221px] w-[368px] cursor-pointer">
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
          <div className="font-['Noto Sans JP'] text-base font-medium text-white transition duration-150 ease-in-out group-hover:scale-110">
            {vendor.name}
          </div>
          <div className="font-['Noto Sans JP'] w-[119px] text-sm font-normal text-white transition duration-150 ease-in-out group-hover:scale-110">
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
    </div>
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
      <h2 className="font-['Noto Sans JP'] mx-12 text-xl font-bold text-blue-950">
        {title}
      </h2>
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
