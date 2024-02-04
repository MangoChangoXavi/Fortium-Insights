import { Button } from "@/components/ui/button";
import Image, { type StaticImageData } from "next/image";
import React from "react";

interface PropsI {
  title: string;
  subtitle: string;
  image: string | StaticImageData;
  handleClick?: () => void;
}

export const Announce = ({ title, subtitle, image, handleClick }: PropsI) => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <Image src={image} alt="imagen del anuncio" width={227} height={177} />
      {/* title and subtitle */}
      <div className="flex w-[344px] flex-col gap-[16px]">
        {/* title */}
        <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
          {title}
        </h1>
        {/* subtitle */}
        <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
          {subtitle}
        </article>
        {/* cta */}
        {handleClick && (
          <Button variant="primary" onClick={handleClick}>
            Adelante
          </Button>
        )}
      </div>
    </div>
  );
};
