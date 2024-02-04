import React from "react";
import Image from "next/image";

interface ListItemI {
  title: string;
  description: string;
  image: string;
}

const ListItem = ({ title, description, image }: ListItemI) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {/* img */}
      <div className="bg-gray-300 relative h-[40px] w-[40px] rounded-full">
        <Image
          src={image}
          alt="seller image"
          fill
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        {/* name */}
        <p className="text-sm font-medium not-italic leading-[normal] text-[#2C2C2C]">
          {title}
        </p>
        {/* description */}
        <p className="text-xs font-medium not-italic leading-[normal] text-[#808080]">
          {description}
        </p>
      </div>
    </div>
  );
};

interface PropsI {
  title: string;
  image: string;
  items: ListItemI[];
}

export const ListDashboard = ({ title, image, items }: PropsI) => {
  return (
    <div className="flex flex-row rounded-xl bg-white">
      <div className="flex min-h-[271px] w-full flex-col gap-6  pl-[16px]">
        <h2 className=" mt-[18px] text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
          {title}
        </h2>
        {items.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
      <Image src={image} alt="list image" height={271} width={271} />
    </div>
  );
};
