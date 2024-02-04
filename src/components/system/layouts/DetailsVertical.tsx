import Image from "next/image";
import React from "react";
import { Button } from "../ui/Button";

const PropTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="h-[18px] self-stretch text-sm font-semibold not-italic leading-[normal] text-[#2C2C2C]">
      {text}
    </h2>
  );
};

const PropSubtitle = ({ text }: { text: string }) => {
  return (
    <h3 className="h-[18px] self-stretch text-xs font-normal not-italic leading-[normal] text-[#999]">
      {text}
    </h3>
  );
};

export const DetailsVertical = () => {
  return (
    <div className="flex w-[391px] flex-col items-center gap-[32px] bg-white pb-[32px]">
      {/* header image */}
      <div className="relative h-[15rem] w-full">
        <Image
          src={
            "https://images.unsplash.com/photo-1704629803946-04b543133943?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          fill
          objectFit="cover"
          alt="header iamge"
        />
      </div>

      {/* title and subtitle */}
      <div className="flex flex-col gap-[16px] px-[24px]">
        {/* title */}
        <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
          Abstract Artworks
        </h1>
        {/* subtitle */}
        <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
          Lorem ipsum dolor sit amet consectetur. Ut odio viverra cursus donec
          bibendum ligula integer lacus enim. Consequat pharetra nibh blandit
          est euismod porttitor id purus.
        </article>
      </div>

      {/* properties */}
      <div className="flex w-full flex-col gap-[16px]   px-[24px]">
        <div className="flex flex-row gap-[24px]">
          <div className=" flex w-1/2 flex-col items-start justify-center gap-0.5 self-stretch">
            <PropTitle text="Autor" />
            <PropSubtitle text="Pablo Picasso" />
          </div>
          <div className=" flex w-1/2 flex-col items-start justify-center gap-0.5 self-stretch">
            <PropTitle text="Técnica" />
            <PropSubtitle text="Óleo sobre lienzo" />
          </div>
        </div>
        <div className="flex flex-row gap-[24px]">
          <div className=" flex w-1/2 flex-col items-start justify-center gap-0.5 self-stretch">
            <PropTitle text="Dimensiones" />
            <PropSubtitle text="100 x 100 cm" />
          </div>
          <div className=" flex w-1/2 flex-col items-start justify-center gap-0.5 self-stretch">
            <PropTitle text="Año" />
            <PropSubtitle text="1960" />
          </div>
        </div>
        <div className="flex flex-row gap-[24px]">
          <div className=" flex w-1/2 flex-col items-start justify-center gap-0.5 self-stretch">
            <PropTitle text="Precio" />
            <PropSubtitle text="$ 1.000.000" />
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-row items-center justify-center gap-[24px]  px-[24px]">
        <Button label="Comprar" color="primary" className="w-[164px]" />
        <Button label="Contactar" color="secondary" className="w-[164px]" />
      </div>
    </div>
  );
};
