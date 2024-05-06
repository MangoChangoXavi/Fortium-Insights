import { Button } from "@/components/ui/button";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import Map from "~/components/system/ui/Map";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex w-full flex-col gap-[32px] bg-white pb-[16px]">
      {/* header image */}
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {images?.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <div className="relative h-[300px] md:h-[35rem]">
                  <Image
                    src={image}
                    layout="fill"
                    alt="property image"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* pagination */}
      <div className="flex items-center justify-center gap-2">
        <div className="text-sm font-normal not-italic leading-[normal] text-[#999]">
          {current} de {count}
        </div>
      </div>
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
