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
import {
  BathIcon,
  Bed,
  Building,
  Car,
  Home,
  Ruler,
  Search,
} from "lucide-react";
import { USD } from "~/utils/functions";
import { Input } from "@/components/ui/input";
import { ResponsiveAdUnit } from "nextjs-google-adsense";

const ITEMS_PER_PAGE = 4;
type RequirementsGetI = RouterInputs["requirements"]["get"];

export default function Index() {
  const [page, setPage] = React.useState<number>(0);

  // Search parameters
  const [operationType, setOperationType] = React.useState<string>("sell"); // ["sell", "rent"]
  const [buildingType, setBuildingType] = React.useState<string>("apartment"); // ["apartment", "house"]
  const [address, setAddress] = React.useState<string>("");
  const [minNumberOfRooms, setminNumberOfRooms] = React.useState<number>();
  const [maxNumberOfRooms, setmaxNumberOfRooms] = React.useState<number>();
  const [minNumberOfBathrooms, setminNumberOfBathrooms] =
    React.useState<number>();
  const [maxNumberOfBathrooms, setmaxNumberOfBathrooms] =
    React.useState<number>();
  const [minNumberOfParkingLots, setminNumberOfParkingLots] =
    React.useState<number>();
  const [maxNumberOfParkingLots, setmaxNumberOfParkingLots] =
    React.useState<number>();
  const [minTotalArea, setMinTotalArea] = React.useState<number>();
  const [maxTotalArea, setMaxTotalArea] = React.useState<number>();
  const [minPrice, setMinPrice] = React.useState<number>();
  const [maxPrice, setMaxPrice] = React.useState<number>();

  const [searchParameters, setSearchParemeters] =
    React.useState<RequirementsGetI | null>(null);

  const { data, isLoading } = api.requirements.get.useQuery({
    ...searchParameters,
  });

  const handleSubmit = (values: RequirementsGetI) => {
    setPage(0);
    setSearchParemeters(values);
  };

  const getMinimumPriceInDollars = () => {
    if (!data) return 0;
    return Math.min(
      ...data.map((i) => {
        if (i.currency === "GTQ") {
          return i.price / 7.8;
        }
        return i.price;
      }),
    );
  };

  const getMaximumPriceInDollars = () => {
    if (!data) return 0;
    return Math.max(
      ...data.map((i) => {
        if (i.currency === "GTQ") {
          return i.price / 7.8;
        }
        return i.price;
      }),
    );
  };

  const getMeanPriceInDollars = () => {
    if (!data) return 0;
    return (
      data.reduce((acc, i) => {
        if (i.currency === "GTQ") {
          return acc + i.price / 7.8;
        }
        return acc + i.price;
      }, 0) / data.length
    );
  };

  const hasData = data && data.length > 0;
  const paginatedData = hasData
    ? data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    : [];

  return (
    <>
      <ResponsiveAdUnit
        publisherId="pub-6713030727031078"
        slotId="5133228323"
        type="after-home-hero"
      />
      <Header />
      <div className="relative h-48 w-full md:h-96">
        <Image
          src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          fill
          objectFit="cover"
        />
        <ToggleGroup
          type="single"
          className="absolute bottom-0 left-0 right-0"
          value={operationType}
          onValueChange={(value) => {
            if (value) setOperationType(value);
          }}
        >
          <ToggleGroupItem
            value="sell"
            className="bg-primary-100 data-[state=on]:bg-primary-500 data-[state=on]:text-white"
          >
            Comprar
          </ToggleGroupItem>
          <ToggleGroupItem
            value="rent"
            className="bg-primary-100 data-[state=on]:bg-primary-500  data-[state=on]:text-white"
          >
            Rentar
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <section className="flex w-full flex-col gap-8  md:mx-auto">
        <div className="flex h-fit w-full flex-col items-center justify-center gap-16 rounded-lg bg-white p-4 md:p-10">
          <div className="flex w-full flex-col gap-4 md:max-w-[460px]">
            <div>
              <Select
                value={buildingType}
                onValueChange={(value) => {
                  if (value) setBuildingType(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo de inmueble" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">
                    <span className="flex flex-row items-center gap-2">
                      <Building size={16} /> Apartamento
                    </span>
                  </SelectItem>
                  <SelectItem value="house">
                    <span className="flex flex-row items-center gap-2">
                      <Home size={16} /> Casa
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <MapSelect setAddress={setAddress} />
            </div>
            <div>
              {/* numberOfBedrooms */}
              <div className="flex flex-row">
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Cuartos minimo"
                  className="rounded-r-none border-r-0"
                  value={minNumberOfRooms}
                  onChange={(e) =>
                    setminNumberOfRooms(parseInt(e.target.value))
                  }
                />
                <div className="border-glow flex h-10 w-20 items-center justify-center">
                  <Bed className="h-5 w-5" />
                </div>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Cuartos maximo"
                  className="rounded-l-none border-l-0"
                  value={maxNumberOfRooms}
                  onChange={(e) =>
                    setmaxNumberOfRooms(parseInt(e.target.value))
                  }
                />
              </div>
              {/* numberOfBathrooms */}
              <div className="flex flex-row">
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Baños minimo"
                  className="rounded-r-none border-r-0"
                  value={minNumberOfBathrooms}
                  onChange={(e) =>
                    setminNumberOfBathrooms(parseInt(e.target.value))
                  }
                />
                <div className="border-glow flex h-10 w-20 items-center justify-center">
                  <BathIcon className="h-5 w-5" />
                </div>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Baños maximo"
                  className="rounded-l-none border-l-0"
                  value={maxNumberOfBathrooms}
                  onChange={(e) =>
                    setmaxNumberOfBathrooms(parseInt(e.target.value))
                  }
                />
              </div>
              {/* numberOfParkingLots */}
              <div className="flex flex-row">
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Parqueos minimo"
                  className="rounded-r-none border-r-0"
                  value={minNumberOfParkingLots}
                  onChange={(e) =>
                    setminNumberOfParkingLots(parseInt(e.target.value))
                  }
                />
                <div className="border-glow flex h-10 w-20 items-center justify-center">
                  <Car className="h-5 w-5" />
                </div>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Parqueos maximo"
                  className="rounded-l-none border-l-0"
                  value={maxNumberOfParkingLots}
                  onChange={(e) =>
                    setmaxNumberOfParkingLots(parseInt(e.target.value))
                  }
                />
              </div>
              {/* totalArea */}
              <div className="flex flex-row">
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Area mt2 minimo"
                  className="rounded-r-none border-r-0"
                  value={minTotalArea}
                  onChange={(e) => setMinTotalArea(parseInt(e.target.value))}
                />
                <div className="border-glow flex h-10 w-20 items-center justify-center">
                  <Ruler className="h-5 w-5" />
                </div>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Area mt2 maximo"
                  className="rounded-l-none border-l-0"
                  value={maxTotalArea}
                  onChange={(e) => setMaxTotalArea(parseInt(e.target.value))}
                />
              </div>
              {/* price */}
              <div className="flex flex-row">
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Precio minimo"
                  className="rounded-r-none border-r-0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
                <div className="border-glow flex h-10 w-20 items-center justify-center">
                  <span>$</span>
                </div>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Precio maximo"
                  className="rounded-l-none border-l-0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
              </div>
            </div>
            <Button
              onClick={() =>
                handleSubmit({
                  address,
                  operationType,
                  buildingType,
                  minNumberOfRooms,
                  maxNumberOfRooms,
                  minNumberOfBathrooms,
                  maxNumberOfBathrooms,
                  minNumberOfParkingLots,
                  maxNumberOfParkingLots,
                  minTotalArea,
                  maxTotalArea,
                  minPrice,
                  maxPrice,
                })
              }
              variant={"primary"}
            >
              Buscar <Search size={12} className="ml-1" />
            </Button>
          </div>
          <div className="flex w-full flex-col gap-2 overflow-auto">
            {isLoading && (
              <div className="flex w-full items-center justify-center">
                <Loader />
              </div>
            )}
            {hasData && (
              <>
                {/* Min and Max values */}
                <div className="mb-8 flex w-full flex-col items-center justify-center gap-2 font-semibold">
                  <h2>Minimo: {USD.format(getMinimumPriceInDollars())}</h2>
                  <h2>Maximo: {USD.format(getMaximumPriceInDollars())}</h2>
                  <h2>Media: {USD.format(getMeanPriceInDollars())}</h2>
                </div>
                <div className="flex w-full flex-row items-center justify-between">
                  <span className="text-xl font-bold">Resultados</span>
                  <span className="text-sm text-gray-500">
                    {data.length} resultados
                  </span>
                </div>
                {paginatedData?.map((resultDetail, index) => (
                  <AcmResultDetailCard key={index} {...resultDetail} />
                ))}
                <ClientSidePagination
                  totalItems={data.length}
                  pageSize={ITEMS_PER_PAGE}
                  page={page}
                  setPage={setPage}
                />
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
