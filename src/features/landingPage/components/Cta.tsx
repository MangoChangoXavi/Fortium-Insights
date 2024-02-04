import React from "react";
import Image from "next/image";
import grpImg from "../assets/images/grp-img.png";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const Cta = () => {
  return (
    <>
      <div className="relative mb-4 pt-14">
        <div className="pb-14 sm:px-10   lg:px-20">
          <div className="bg-custom-sky m-5 flex flex-col sm:grid md:grid-cols-2 xl:grid-cols-2 ">
            <div className="relative my-auto py-[60px] ps-6 text-start lg:ps-20">
              <h2 className="text-custom-green mb-5 text-[32px] font-black font-semibold leading-[50px] lg:text-[48px]">
                Eleve su negocio inmobiliario hoy
              </h2>

              <p className="mb-5 max-w-md text-[16px] font-medium leading-5 text-white">
                Todas sus propiedades y procesos en un solo lugar, mejora la
                eficiencia de tu negocio.
              </p>
              <div className="flex pt-4 ">
                <Link
                  className="bg-custom-green text-400 flex  items-center px-5 py-3 font-normal text-white hover:bg-blue-700"
                  href={"https://wa.me/59541638"}
                >
                  Contactanos &nbsp; <ArrowRightIcon />
                </Link>
              </div>
            </div>
            <div className="lg:clip-sec bg-custom-green relative overflow-hidden pt-5 text-start">
              <Image
                className="w-90 relative mb-5 object-contain lg:translate-x-16"
                src={grpImg}
                alt="house image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cta;
