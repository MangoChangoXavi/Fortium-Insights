import React from "react";
import Image from "next/image";
import imageSrc from "../assxets/images/Icon_Like.webp";
import calendar from "../assets/icons/calendar.svg";
import brain from "../assets/icons/brain.svg";
import clock from "../assets/icons/clock.svg";
import devices from "../assets/icons/devices.svg";
import documents from "../assets/icons/documents.svg";
import loop from "../assets/icons/loop.svg";

import screenImg from "../assets/images/middle-screen.png";

const Softwares = () => {
  return (
    <>
      <div className="relative mb-4 pt-20">
        <div className="relative ">
          <div className="items-cente flex flex-col justify-center text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">
              Nuestras&nbsp;
              <span className="text-custom-sky block inline font-bold">
                soluciones de software
              </span>
              &nbsp;
              <br />
              lo tienen todo...……!
            </h2>
          </div>
        </div>

        <div className="mt-10  sm:px-10   lg:px-20">
          <div className="m-5 flex flex-col gap-6 p-5 sm:grid md:grid-cols-2 xl:grid-cols-3  ">
            <div className="border-inherit relative rounded-xl px-6 py-8 text-start shadow">
              <Image
                className="mb-5 h-[40px] object-contain"
                src={calendar}
                alt="house image"
              />

              <h3 className="text-dark mb-5 text-[24px] font-black font-semibold leading-7">
                Inteligencia Artificial
              </h3>

              <p className="text-[16px] font-black font-normal leading-5 text-gray-500">
                Soluciones modernas
                <br /> para que no te quedes atras.
              </p>
            </div>
            <div className="border-inherit relative rounded-xl px-6 py-8 text-start shadow">
              <Image
                className="mb-5 h-[40px]  object-contain "
                src={loop}
                alt="house image"
              />

              <h3 className="text-dark mb-5 text-[24px] font-black font-semibold leading-7">
                Seguimiento de clientes
              </h3>

              <p className="text-[16px] font-black font-normal leading-5 text-gray-500">
                Progreso del cliente de <br />
                principio a fin
              </p>
            </div>
            <div className="border-inherit relative rounded-xl px-6 py-8 text-start shadow">
              <Image
                className="mb-5 h-[40px] object-contain"
                src={brain}
                alt="house image"
              />

              <h3 className="text-dark mb-5 text-[24px] font-black font-semibold leading-7">
                Informacion Inteligente
              </h3>

              <p className="text-[16px] font-black font-normal leading-5 text-gray-500">
                Analiza automticamente
                <br />
                tus datos
              </p>
            </div>
            <div className="border-inherit relative rounded-xl px-6 py-8 text-start shadow">
              <Image
                className="mb-5 h-[40px] object-contain"
                src={documents}
                alt="house image"
              />

              <h3 className="text-dark mb-5 text-[24px] font-black font-semibold leading-7">
                Creacion de Documentos
              </h3>

              <p className="text-[16px] font-black font-normal leading-5 text-gray-500">
                No pierda tiempo llenando documentos a mano
                <br />
                el sistema los crea por ti
              </p>
            </div>
            <div className="border-inherit relative rounded-xl px-6 py-8 text-start shadow">
              <Image
                className="mb-5 h-[40px] object-contain"
                src={devices}
                alt="house image"
              />

              <h3 className="text-dark mb-5 text-[24px] font-black font-semibold leading-7">
                Trabaja en cualquier dispositivo
              </h3>

              <p className="text-[16px] font-black font-normal leading-5 text-gray-500">
                usalo en todas partes y en <br />
                cualquier dispositivo.
              </p>
            </div>
            <div className="border-inherit relative rounded-xl px-6 py-8 text-start shadow">
              <Image
                className="mb-5 h-[40px] object-contain"
                src={clock}
                alt="house image"
              />

              <h3 className="text-dark mb-5 text-[24px] font-black font-semibold leading-7">
                Datos en tiempo real
              </h3>

              <p className="text-[16px] font-black font-normal leading-5 text-gray-500">
                Comparte los datos dentro de tu negocio
                <br />
                al instante entre todos los usuarios
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mb-4 py-20 text-center">
        <div className="img-container relative px-6 lg:px-20">
          <Image
            className="w-100 mx-auto mb-5 object-contain"
            src={screenImg}
            alt="house image"
          />
        </div>
      </div>
    </>
  );
};

export default Softwares;
