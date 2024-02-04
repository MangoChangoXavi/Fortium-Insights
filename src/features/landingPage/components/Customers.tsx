import React from "react";
import MI from "../assets/customers/mi.png";
import Farasi from "../assets/customers/farasi.png";
import SmartMedia from "../assets/customers/smartmedia.png";
import Image from "next/image";

const customersArray = [
  {
    name: "MI",
    image: MI,
  },
  {
    name: "Farasi",
    image: Farasi,
  },
  {
    name: "Smart Media",
    image: SmartMedia,
  },
];

export const Customers = () => {
  return (
    <>
      <div className="relative ">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-medium sm:text-5xl">
            Nuestros clientes
          </h2>
        </div>
      </div>
      <div className="relative mb-4 py-20 text-center">
        <div className="flex !h-[275px] flex-row  items-center justify-center gap-16 bg-[#d2de32] px-6 lg:px-20">
          {customersArray.map((customer) => (
            <div key={customer.name} className="relative h-[175px] w-[175px]">
              <Image
                src={customer.image}
                alt={customer.name}
                fill
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
