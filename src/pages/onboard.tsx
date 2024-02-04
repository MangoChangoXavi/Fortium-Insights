import Image from "next/image";
import Link from "next/link";
import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import { projects } from "~/data/projects";
import { Onboard } from "~/components/template/forms/Onboard";

export default function OnBoard() {
  return (
    <>
      <Header />
      <div className="px-12 md:px-[120px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-[42px] font-bold tracking-normal text-black opacity-100">
              Nuevo Cliente
            </h1>
            <p className="text-center text-[16px] tracking-normal text-gray-500">
              Cuentanos sobre ti para poder brindarte el mejor servicio y
              resultados
            </p>
          </div>
          <Onboard />
        </div>
      </div>
      <Footer />
    </>
  );
}
