import React from "react";
import Image from "next/image";
import workflowIcon from "../assets/images/Icon-Workflow.svg";
import rocketIcon from "../assets/images/Icon-Rocket.svg";
import openbookIcon from "../assets/images/Icon-Opened-File.svg";
import likeIcon from "../assets/images/Icon-Like.svg";

const WhyUs = () => {
  return (
    <>
      <div className="relative mb-4">
        <div className="relative ">
          <div className="items-cente flex flex-col justify-center text-center">
            <h2 className="mb-6 text-3xl font-medium sm:text-5xl">
              Por que nosotros
            </h2>
            <p className="px-6 text-[16px] font-black font-light leading-5 text-gray-500">
              Identifique clientes nuevos y recurrentes, vea a sus visitantes
              mas frecuentes
              <br /> y mas recientes y descubra cuanto gasta su cliente
              promedio.
            </p>
          </div>
        </div>

        <div className="mt-10  sm:px-10   lg:px-20">
          <div className="m-5 flex flex-col gap-6 p-5 sm:grid md:grid-cols-2 xl:grid-cols-2  ">
            <div className="border-inherit relative flex flex-col gap-6  rounded-xl px-6 py-8 text-start shadow lg:flex-row">
              <div className="img-area">
                <Image
                  className="mb-5 w-[40px] object-contain lg:w-[40px]"
                  src={rocketIcon}
                  alt="house image"
                />
              </div>
              <div className="text">
                <h3 className="text-fourth-color mb-5 text-[24px] font-medium leading-8 lg:text-[32px]">
                  Soluciones a medida
                </h3>
                <p className="text-third-color text-[16px] font-normal leading-5">
                  Techos Digitales comprende los desafios
                  <br />
                  unicos de la industria inmobiliaria.
                </p>
              </div>
            </div>
            <div className="border-inherit relative flex flex-col gap-6  rounded-xl px-6 py-8 text-start shadow lg:flex-row">
              <div className="img-area">
                <Image
                  className="mb-5 w-[40px] object-contain lg:w-[70px]"
                  src={workflowIcon}
                  alt="house image"
                />
              </div>
              <div className="text">
                <h3 className="text-fourth-color mb-5 text-[24px] font-medium leading-8 lg:text-[32px]">
                  Automatizacion que <br /> ahorra tiempo
                </h3>
                <p className="text-third-color text-[16px] font-normal leading-5">
                  Aumente la productividad con la automatizacion inteligente, lo
                  que le permitira concentrarse en hacer crecer su negocio.
                </p>
              </div>
            </div>
            <div className="border-inherit relative flex flex-col gap-6  rounded-xl px-6 py-8 text-start shadow lg:flex-row">
              <div className="img-area">
                <Image
                  className="mb-5 w-[40px] object-contain lg:w-[80px]"
                  src={openbookIcon}
                  alt="house image"
                />
              </div>
              <div className="text">
                <h3 className="text-fourth-color mb-5 text-[24px] font-medium leading-8 lg:text-[32px]">
                  Integracion perfecta
                </h3>
                <p className="text-third-color text-[16px] font-normal leading-5">
                  Nuestro software conecta todos los aspectos de la gestion
                  inmobiliaria, garantizando un flujo de trabajo coherente y
                  eficiente.
                </p>
              </div>
            </div>
            <div className="border-inherit relative flex flex-col gap-6  rounded-xl px-6 py-8 text-start shadow lg:flex-row">
              <div className="img-area">
                <Image
                  className="mb-5 w-[40px] object-contain lg:w-[80px]"
                  src={likeIcon}
                  alt="house image"
                />
              </div>
              <div className="text">
                <h3 className="text-fourth-color mb-5 text-[24px] font-medium leading-8 lg:text-[32px]">
                  Interfaces faciles de usar
                </h3>
                <p className="text-third-color text-[16px] font-normal leading-5">
                  Disfrute de una plataforma intuitiva que requiere una
                  formacion minima, para que pueda obtener resultados sin la
                  curva de aprendizaje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyUs;
