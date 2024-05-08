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
    <Drawer direction="right">
      <Header />
      <div className="relative h-40 w-full md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          fill
          objectFit="cover"
        />
        <div className="absolute right-1/2 top-1/2 w-full -translate-y-1/2 translate-x-1/2 p-4 md:w-1/3 md:p-0">
          <MapSelect setAddress={setAddress} />
        </div>
      </div>
      <div className="flex h-10 w-full items-center justify-center gap-3 bg-gray-700 px-5 py-10 text-sm font-semibold text-white">
        No encuentras lo que buscas?, nuestros asesores te ayudan{" "}
        <DrawerTrigger>
          <Button variant={"dark"} size={"sm"}>
            Pedir requerimiento
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-full rounded-none px-5 md:w-[500px]">
        <MobileFilters
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          operationType={operationType}
          setOperationType={setOperationType}
          numberOfRooms={numberOfRooms}
          setNumberOfRooms={setNumberOfRooms}
          numberOfBathrooms={numberOfBathrooms}
          setNumberOfBathrooms={setNumberOfBathrooms}
          buildingType={buildingType}
          setBuildingType={setBuildingType}
          numberOfRoomsAndBathroomsItems={BUTTON_ITEMS_FILTER}
          buildingTypes={BUILDING_TYPES}
        />
      </DrawerContent>
      <Footer />
    </Drawer>
  );
}
