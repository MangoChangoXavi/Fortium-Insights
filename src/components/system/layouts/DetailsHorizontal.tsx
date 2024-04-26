import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import Map from "~/components/system/ui/Map";

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

interface ButtonI {
  label: string;
  variant?: "primary" | "secondary" | "default" | "dark" | "disabled" | "error";
  className?: string;
  href?: string;
  handleClick?: () => void;
}

interface ItemI {
  title: string;
  subtitle: string;
}

interface PropsI {
  images?: string[] | StaticImageData[];
  title?: string;
  subtitle?: string;
  items?: ItemI[];
  buttons?: ButtonI[];
  lat?: number;
  lng?: number;
  url: string;
}

export const DetailsHorizontal = ({
  images,
  title,
  subtitle,
  items,
  buttons,
  lat,
  lng,
  url,
}: PropsI) => {
  return (
    <div className="flex w-full flex-col gap-[32px] bg-white pb-[16px]">
      {/* header image */}
      {images && (
        <div className="relative flex h-[306px] w-full flex-row overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex h-[306px] w-full transition-transform duration-300 ease-in-out hover:z-50 hover:scale-150"
            >
              <Image src={image} alt="image" fill objectFit="cover" />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-[32px] px-6 md:px-32 xl:flex-row">
        <div className="flex flex-col gap-[32px] md:w-2/3">
          {/* title and subtitle */}
          <div className="flex  flex-col gap-[8px]">
            {/* title */}
            {title && (
              <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
                {title}
              </h1>
            )}
            {/* subtitle */}
            {subtitle && (
              <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
                {subtitle}
              </article>
            )}
          </div>

          {/* properties */}
          <div className="grid w-full grid-cols-2 md:flex  md:flex-row md:gap-[64px] ">
            {items?.map((item) => {
              if (!item.title || !item.subtitle) return null;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-start justify-center gap-0.5 self-stretch"
                >
                  <PropTitle text={item.title} />
                  <PropSubtitle text={item.subtitle} />
                </div>
              );
            })}
          </div>

          {/* buttons */}
          <div className="flex flex-row items-start justify-start gap-[12px] ">
            {buttons?.map((button) => {
              if (button.href) {
                return (
                  <Link key={button.label} href={button.href} target="_blank">
                    <Button
                      className={button.className}
                      variant={button.variant}
                    >
                      {button.label}
                    </Button>
                  </Link>
                );
              } else {
                return (
                  <Button
                    key={button.label}
                    className={button.className}
                    onClick={button.handleClick}
                    variant={button.variant}
                  >
                    {button.label}
                  </Button>
                );
              }
            })}
          </div>
        </div>
        {lat && lng && (
          <div className="flex h-full items-center justify-center md:w-1/3">
            <Map
              center={{
                lat,
                lng,
              }}
              markers={[
                {
                  lat,
                  lng,
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};
