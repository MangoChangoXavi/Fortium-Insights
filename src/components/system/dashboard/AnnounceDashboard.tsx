import React from "react";
import Image from "next/image";

interface PropsI {
  title: string;
  text: string;
  image: string;
  button?: React.ReactNode;
}

export const AnnounceDashboard = ({ title, text, image, button }: PropsI) => {
  return (
    <div className="bg-gray-gradiant relative min-h-[197px] w-full rounded-xl">
      <div className="flex flex-col gap-6 p-6">
        <h3 className="text-xl font-medium not-italic leading-[normal] text-white">
          {title}
        </h3>
        <article className="w-2/3 text-xs font-medium not-italic leading-[normal] text-[#D9D9D9]">
          {text}
        </article>
        {button}
      </div>
      <div className="absolute -right-0 bottom-0">
        <Image src={image} alt="bulb image" height={257} width={70} />
      </div>
    </div>
  );
};
