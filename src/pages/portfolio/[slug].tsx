import Image from "next/image";
import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";

import { projects } from "~/data/projects";

export default function Project() {
  const project = projects[0];
  if (!project) return null;
  return (
    <>
      <Header />
      <body className="px-12 md:px-[120px]">
        <div className="my-16 grid grid-cols-1 gap-4  md:grid-cols-2">
          <div className="flex w-full flex-col items-center gap-4">
            <Image
              src={project.logo}
              alt="house image"
              width={360}
              height={180}
            />
            <div className="flex w-full flex-col items-center gap-1">
              <p className="text-left text-[16px] tracking-normal text-gray-500">
                <b>Proyecto:</b> Manejo de planos en tiempo real
              </p>
              <p className="text-left text-[16px] tracking-normal text-gray-500">
                <b>Ubicacion:</b> Ciudad de Guatemala
              </p>
              <p className="text-left text-[16px] tracking-normal text-gray-500">
                <b>Industria:</b> Lotificadoras
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-left text-[42px] font-bold tracking-normal text-black opacity-100">
              Acerca De
            </h1>
            <p className="text-left text-[16px] tracking-normal text-gray-500">
              Tu asesor inmobiliario es una lotificadora ubicada en ciudad de
              guatemala que ha tenido mucho exito durante estos ultimos años
              expandiendose por varios departamentos del territorio nacional.
              <br />
              <br />
              Se realizo una actualizacion de la pagina de bienvenida
              agregandole funcionalidades extras como la posibilidad de
              virtualizar sus mapas en tiempo real logrando asi la coordinacion
              de todo su equipo de trabajo y conversion de ventas al mostrar sus
              planos a los clientes de manera mas profesional.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-8">
          {project.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="house image"
              width={720}
              height={360}
              className="cursor-pointer rounded-xl  border-4 border-primary-100 transition-all duration-300 ease-in-out hover:scale-105"
            />
          ))}
        </div>
      </body>

      <Footer />
    </>
  );
}
