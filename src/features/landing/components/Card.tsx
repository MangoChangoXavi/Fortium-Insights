import Image, { type StaticImageData } from "next/image";
import React from "react";
import { GTQ } from "~/utils/functions";

const Card = ({
  imageSrc,
  title,
  price,
  location,
  totalArea,
  downPayment,
  project,
}: {
  imageSrc: string | StaticImageData;
  title: string;
  price: number;
  location: string;
  totalArea: number;
  downPayment: number;
  project?: string;
}) => {
  return (
    <div className="mx-auto h-[400px] w-[350px] overflow-hidden rounded-xl bg-white shadow-md duration-200 ease-in hover:scale-105 dark:bg-slate-700">
      <div className="flex flex-col items-start">
        <div>
          <div className="relative h-[190px] w-[350px] ">
            <Image src={imageSrc} alt="My Image" fill objectFit="cover" />
          </div>
          {/* <div className="absolute left-0 top-0 ml-[30px] mt-[30px] flex items-center justify-center ">
            <div className=" flex items-center justify-center rounded-[5px] bg-black bg-opacity-[50%] py-[3px] pl-[5px] pr-[10px] ">
              <Image src={eyeIcon} alt="icon" height={24} width={24} />
              <p className="text-[10px] font-black leading-5 text-white">65</p>
            </div>
            <div className="ml-[10px] flex items-center justify-center rounded-[5px] bg-black bg-opacity-[50%] px-[10px] py-[5px] ">
              <p className="text-center text-[10px] font-black leading-5 text-white">
                1995
              </p>
            </div>
          </div> */}
        </div>

        <div className="p-8">
          <div className="text-cardText text-[15px] font-black capitalize leading-[30px] dark:text-white">
            {title}
          </div>
          <p className=" text-cardText py-[10px] text-2xl font-bold leading-[30px] text-primary-700 dark:text-white ">
            {GTQ.format(Number(price))}
          </p>
          <p className="text-blueCardSubTitle py-[10px] text-[13px] font-bold leading-[25px]  dark:text-white">
            {location}
          </p>
          <p className="text-blueCardSubTitle text-xs font-bold leading-5 dark:text-white">
            {project && `${project} - `}
            {totalArea} m2&nbsp;&nbsp;-&nbsp;&nbsp;
            {GTQ.format(downPayment)} Enganche
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
