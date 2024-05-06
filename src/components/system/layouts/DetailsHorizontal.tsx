import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import Map from "~/components/system/ui/Map";
import Slider from "../ui/Slider";

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
  variant?:
    | "primary"
    | "secondary"
    | "default"
    | "dark"
    | "disabled"
    | "error"
    | "ghost";
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

const SingleImage = ({ image }: { image: string }) => {
  return (
    <div className="relative h-[300px] md:h-[35rem]">
      <Image
        src={image}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt=""
      />
    </div>
  );
};

const TwoImages = ({ images }: { images: string[] }) => {
  return (
    <div className="grid h-[300px] grid-rows-2 sm:h-[35rem] sm:grid-cols-2 sm:grid-rows-1">
      {images.map((image, index) => {
        return (
          <div key={index} className="relative h-full">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

const MultipleImages = ({ images }: { images: string[] }) => {
  const [start, setStart] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      {/* desktop */}
      <div className="hidden h-[300px] sm:h-[25rem] sm:grid-cols-3 sm:grid-rows-1 md:grid">
        {/* show only 3 to 4 images at a time */}
        {images.slice(start, start + 3).map((image, index) => {
          return (
            <div key={index} className="relative h-full">
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt=""
              />
            </div>
          );
        })}
      </div>
      {/* mobile */}
      <div className="h-[300px] sm:hidden">
        {/* show only 1 image at a time */}
        {images.slice(start, start + 1).map((image, index) => {
          return (
            <div key={index} className="relative h-full">
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

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
  const hasSingleImage = images && images.length < 2;
  const hasTwoImages = images && images.length === 2;
  const hasMultipleImages = images && images.length > 2;
  return (
    <div className="flex w-full flex-col gap-[32px] bg-white pb-[16px]">
      {/* header image */}
      {hasSingleImage && SingleImage({ image: images[0] as string })}
      {hasTwoImages && TwoImages({ images: images as string[] })}
      {hasMultipleImages && MultipleImages({ images: images as string[] })}
      {/* content */}
      <div className="flex flex-col gap-[32px] px-6 md:px-32 xl:flex-row">
        <div className="flex flex-col gap-[32px] md:w-2/3">
          {/* title and subtitle */}
          <div className="flex  flex-col gap-[8px]">
            {/* title */}
            {title && (
              <Link href={url}>
                <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C] hover:underline">
                  {title}
                </h1>
              </Link>
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
