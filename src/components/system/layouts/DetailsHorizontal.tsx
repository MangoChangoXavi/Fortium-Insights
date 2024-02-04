import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import React from "react";

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
  color?: "primary" | "secondary" | "default" | "dark" | "disabled" | "error";
  className?: string;
  handleClick?: () => void;
}

interface ItemI {
  title: string;
  subtitle: string;
}

interface PropsI {
  imageUrl?: string | StaticImageData;
  title?: string;
  subtitle?: string;
  items?: ItemI[];
  buttons?: ButtonI[];
}

export const DetailsHorizontal = ({
  imageUrl,
  title,
  subtitle,
  items,
  buttons,
}: PropsI) => {
  return (
    <div className="flex w-full flex-col  gap-[32px] bg-white pb-[16px]">
      {/* header image */}
      {imageUrl && (
        <div className="relative h-[15rem] w-full">
          <Image src={imageUrl} fill objectFit="cover" alt="header iamge" />
        </div>
      )}

      <div className="flex flex-row gap-[32px]">
        <div className="flex flex-col gap-[32px]">
          {/* title and subtitle */}
          <div className="flex flex-col gap-[8px] ">
            {/* subtitle */}
            {subtitle && (
              <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
                {subtitle}
              </h1>
            )}
            {/* title */}
            {title && (
              <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
                {title}
              </article>
            )}
          </div>

          {/* properties */}
          <div className="flex w-full flex-row gap-[64px] ">
            {items?.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start justify-center gap-0.5 self-stretch"
              >
                <PropTitle text={item.title} />
                <PropSubtitle text={item.subtitle} />
              </div>
            ))}
          </div>

          {/* buttons */}
          <div className="flex flex-row items-start justify-start gap-[12px] ">
            {buttons?.map((button) => (
              <Button
                variant={"primary"}
                key={button.label}
                color={button.color}
                className={button.className}
                onClick={button.handleClick}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        {/* <div className="relative h-[306px] w-[336px]">
          <Image
            src={
              "https://images.unsplash.com/photo-1704629803946-04b543133943?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            fill
            objectFit="cover"
            alt="header iamge"
          />
        </div> */}
      </div>
    </div>
  );
};
