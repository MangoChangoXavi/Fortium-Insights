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
  const [operationType, setOperationType] = React.useState<string>("sell"); // ["sell", "rent"]
  const [buildingType, setBuildingType] = React.useState<string>("apartment"); // ["apartment", "house"]
  const [address, setAddress] = React.useState<string>("");
  const [numberOfRooms, setNumberOfRooms] = React.useState<string>("");
  React.useState<string>("");
  const [numberOfBathrooms, setNumberOfBathrooms] = React.useState<string>("");
  const [numberOfParkingLots, setNumberOfParkingLots] =
    React.useState<string>("");
  const [totalArea, setTotalArea] = React.useState<string>("");
  const [minPrice, setMinPrice] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState<string>("");

  // on address change go to search/:address
  React.useEffect(() => {
    if (address) {
      window.location.href = `/search/${address}`;
    }
  }, [address]);

  return (
    <>
      <Header />
      <section className="relative flex h-[400px] w-full items-center overflow-hidden bg-white px-6 md:px-32">
        <div className="space-y-5">
          <div className="space-y-3">
            <h1 className="w-[550px] text-[41px] font-extrabold leading-[50px] text-slate-800">
              Todos los bienes raices, en un solo lugar.
            </h1>
            <h2 className=" text-xl font-semibold text-slate-600 ">
              Busca ahora usando inteligencia artificial
            </h2>
          </div>
          <MapSelect
            setAddress={setAddress}
            className="h-16 w-[493px] rounded-2xl border border-black "
          />
        </div>
        <div className="absolute  -top-60 right-20 h-[954px] w-[619.98px] rotate-[22.53deg] rounded-full bg-gradient-to-b from-slate-400 via-teal-400 to-lime-400" />
        <Image
          src={Client1}
          alt="Client1"
          className="absolute -right-10 bottom-0 h-[442px] w-[610px]"
          draggable={false}
        />
        <Image
          src={Client2}
          alt="Client2"
          className="absolute bottom-0 right-40  h-[362px] w-[545px]"
          draggable={false}
        />
      </section>
      <section className="flex  w-full items-center justify-center bg-neutral-900 p-4">
        <p className="text-xl font-semibold text-white">
          Miles de personas usan nuestra plataforma semanalmente para buscar su
          proximo hogar.
        </p>
      </section>
      <section className="flex h-[400px] w-full items-center overflow-hidden bg-white px-6 md:px-32">
        <div className="relative flex w-1/2 items-center justify-center">
          <Image
            src={Home}
            alt="Home"
            className="mr-24 h-[319px] w-[426px]"
            draggable={false}
          />
          <Image
            src={Object1}
            alt="Object1"
            className="floating absolute right-24 top-0"
          />
          <Image
            src={Object2}
            alt="Object2"
            className="floating absolute right-20 top-40"
          />
          <Image
            src={Object3}
            alt="Object3"
            className="floating absolute right-44 top-60"
          />
          <Image
            src={Object4}
            alt="Object4"
            className="floating absolute left-36 top-0"
          />
          <Image
            src={Object5}
            alt="Object5"
            className="floating absolute bottom-10 left-10"
          />
        </div>
        <div className="w-1/2 space-y-5">
          <div className="space-y-3">
            <h1 className="w-[550px] text-[41px] font-extrabold leading-[50px] text-slate-800">
              ¿No sabes cuanto vale tu casa?
            </h1>
            <h2 className=" text-xl font-semibold text-slate-600 ">
              Solicita una valoracion con nosotros
            </h2>
          </div>
          <div className="flex flex-row space-x-4">
            <MapSelect
              setAddress={setAddress}
              className="h-16 w-2/3 rounded-2xl border border-black "
            />
            <Button
              className="h-16 w-16 rounded-[50px] border border-black"
              variant={"outline"}
            >
              <SendIcon />
            </Button>
          </div>
        </div>
      </section>
      <section className="flex  w-full items-center justify-center bg-neutral-900 p-4">
        <p className="text-xl font-semibold text-white">
          Nuestras valoraciones estan certificadas por un experto, son 100%
          legales y al mejor precio del mercado
        </p>
      </section>
      <Footer />
    </>
  );
}
