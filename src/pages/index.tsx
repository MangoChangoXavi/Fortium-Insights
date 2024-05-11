import { api, type RouterInputs } from "~/utils/api";
import React from "react";
import "chart.js/auto";

import { AcmResultDetailCard } from "~/components/template/layouts/AcmResultDetailCard";
import { Loader } from "~/components/system/layouts/Loader";
import { ClientSidePagination } from "~/components/system/ui/ClientSidePagination";
import Header from "~/features/landingPage/components/Header";
import Footer from "~/features/landingPage/components/Footer";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import MapSelect from "~/components/system/ui/MapSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { ToggleGroupButtons } from "~/components/template/ui/ToggleGroupButtons";
import { PriceRangeDropdown } from "~/components/template/layouts/PriceRangeDropdown";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MobileFilters } from "~/components/system/layouts/MobileFilters";
import { SendIcon } from "lucide-react";

// assets/svg
import Object1 from "~/assets/svg/object-1.svg";
import Object2 from "~/assets/svg/object-2.svg";
import Object3 from "~/assets/svg/object-3.svg";
import Object4 from "~/assets/svg/object-4.svg";
import Object5 from "~/assets/svg/object-5.svg";

// assets/img
import Client1 from "~/assets/img/client-1.png";
import Client2 from "~/assets/img/client-2.png";
import Home from "~/assets/img/home.png";

const BUTTON_ITEMS_FILTER = [
  { value: "all", label: "Todos" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const BUILDING_TYPES = [
  { value: "", label: "Todos" },
  { value: "apartment", label: "Apartamentos" },
  { value: "house", label: "Casas" },
  { value: "land", label: "Terrenos" },
  { value: "warehouse", label: "Bodegas" },
  { value: "office", label: "Oficinas" },
];

type RequirementsGetI = RouterInputs["requirements"]["get"];

export default function Index() {
  // Search parameters
  const [address, setAddress] = React.useState<string>("");
  const [valuationAddress, setValuationAddress] = React.useState<string>("");

  // on address change go to search/:address
  React.useEffect(() => {
    if (address) {
      window.location.href = `/search/${address}`;
    }
  }, [address]);

  return (
    <>
      <Header />
      <section className="relative flex w-full flex-col items-center overflow-hidden bg-white p-6 lg:h-[400px] lg:flex-row lg:px-32">
        <div className="space-y-5">
          <div className="space-y-3 text-center md:text-start">
            <h1 className="text-[35px] font-extrabold leading-10 text-slate-800 sm:text-[41px] sm:leading-[50px] lg:w-[550px]">
              Todos los bienes raices, en un solo lugar.
            </h1>
            <h2 className="text-lg font-semibold text-slate-600 sm:text-xl ">
              Busca ahora usando inteligencia artificial
            </h2>
          </div>
          <MapSelect
            setAddress={setAddress}
            className="h-16 rounded-2xl border border-black lg:w-[493px] "
          />
        </div>
        <div className="mt-60 sm:mt-72 lg:mt-0">
          <div className="absolute -bottom-[360px] right-10  h-[566.79px] w-[368.35px] rotate-[22.53deg] rounded-full bg-gradient-to-b from-slate-400 via-teal-400 to-lime-400 lg:-top-[80px] 2xl:-top-60 2xl:right-20 2xl:h-[954px] 2xl:w-[619.98px]" />
          <Image
            src={Client1}
            alt="Client1"
            className="absolute -right-12 bottom-0 h-[226px] w-[350px] sm:-right-20 sm:h-[326px] sm:w-[450px]  2xl:-right-10 2xl:h-[442px] 2xl:w-[610px] "
            draggable={false}
          />
          <Image
            src={Client2}
            alt="Client2"
            className="sm:right-30 absolute bottom-0 right-16 h-[170px] w-[281px] sm:right-20 sm:h-[253px] sm:w-[381px] 2xl:right-40 2xl:h-[362px] 2xl:w-[545px]"
            draggable={false}
          />
        </div>
      </section>
      <section className="flex  w-full items-center justify-center bg-neutral-900 p-4">
        <p className="font-semibold text-white sm:text-xl">
          Miles de personas usan nuestra plataforma semanalmente para buscar su
          proximo hogar.
        </p>
      </section>
      <section className="flex w-full flex-col items-center bg-white p-6 md:overflow-hidden lg:h-[400px] lg:flex-row lg:px-32">
        <div className="relative flex w-full items-center justify-center lg:w-1/2">
          <Image
            src={Home}
            alt="Home"
            className="w-[300px] lg:mr-24 lg:h-[319px] lg:w-[426px] "
            draggable={false}
          />
          <Image
            src={Object1}
            alt="Object1"
            className="floating absolute right-5 top-0 sm:right-24"
          />
          <Image
            src={Object2}
            alt="Object2"
            className="floating absolute right-20 top-40"
          />
          <Image
            src={Object3}
            alt="Object3"
            className="floating absolute right-0 top-20 sm:right-44 lg:top-60"
          />
          <Image
            src={Object4}
            alt="Object4"
            className="floating absolute left-0 top-0 sm:left-36"
          />
          <Image
            src={Object5}
            alt="Object5"
            className="floating absolute bottom-10 left-10"
          />
        </div>
        <div className="space-y-5 lg:w-1/2">
          <div className="space-y-3 text-center md:text-start">
            <h1 className="text-[35px] font-extrabold leading-10 text-slate-800 sm:text-[41px] sm:leading-[50px]">
              ¿No sabes cuanto vale tu casa?
            </h1>
            <h2 className="text-lg font-semibold text-slate-600 sm:text-xl ">
              Solicita una valoracion con nosotros
            </h2>
          </div>
          <div className="flex flex-row space-x-4">
            <MapSelect
              setAddress={setValuationAddress}
              className="h-16 w-2/3 rounded-2xl border border-black "
            />
            <Button
              className="h-16 w-16 rounded-[50px] border border-black"
              variant={"outline"}
              onClick={() => {
                if (!valuationAddress) {
                  alert("Por favor ingrese una direccion");
                  return;
                }
                window.location.href = `https://wa.me/+59541638?text=${encodeURI(
                  `Hola me gustaria solicitar una valoracion en esta direccion: ${valuationAddress}`,
                )}`;
              }}
            >
              <SendIcon />
            </Button>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center justify-center bg-neutral-900 p-4">
        <p className="font-semibold text-white sm:text-xl">
          Nuestras valoraciones estan certificadas por un experto, son 100%
          legales y al mejor precio del mercado
        </p>
      </section>
      <Footer />
    </>
  );
}
