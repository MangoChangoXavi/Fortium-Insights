import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import MapSelect from "~/components/system/ui/MapSelect";
import { useEffect, useState } from "react";
import Map from "~/components/system/ui/Map";
import { getCoordinates } from "~/utils/googleMaps";
import { api } from "~/utils/api";
import { Card } from "~/components/system/ui/Card";
import { GTQ, USD } from "~/utils/functions";
import { OperationTypeDropdown } from "~/components/template/layouts/OperationTypeDropdown";
import { Loader } from "~/components/system/layouts/Loader";
import { PriceRangeDropdown } from "~/components/template/layouts/PriceRangeDropdown";
import { BuildingTypeDropdown } from "~/components/template/layouts/BulidingTypeDropdown";
import { BedsBathsDropdown } from "~/components/template/layouts/BedsBathsDropdown";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ToggleGroupButtons } from "~/components/template/ui/ToggleGroupButtons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PricesSelectFilter } from "~/components/template/ui/PricesSelectFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MobileFilters } from "~/components/system/layouts/MobileFilters";
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

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

export default function Address(props: PageProps) {
  const { location } = props;
  const [address, setAddress] = useState<string>(props.address);
  const [operationType, setOperationType] = useState("all");
  const [buildingType, setBuildingType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("all");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState("all");
  const [numberOfParkingLots, setNumberOfParkingLots] = useState("all");
  const [minPrice, setMinPrice] = useState("all");
  const [maxPrice, setMaxPrice] = useState("all");

  const { data, isLoading } = api.requirements.get.useQuery({
    lat: location.lat,
    lng: location.lng,
    operationType: operationType === "all" ? "" : operationType,
    buildingType,
    minNumberOfRooms: numberOfRooms === "all" ? 0 : parseInt(numberOfRooms),
    minNumberOfBathrooms:
      numberOfBathrooms === "all" ? 0 : parseInt(numberOfBathrooms),
    minNumberOfParkingLots:
      numberOfParkingLots === "all" ? 0 : parseInt(numberOfParkingLots),
    minPrice: minPrice === "all" ? undefined : parseInt(minPrice),
    maxPrice: maxPrice === "all" ? undefined : parseInt(maxPrice),
  });

  const markers = data?.map((i) => ({
    lat: i.location.coordinates[1] ?? 0,
    lng: i.location.coordinates[0] ?? 0,
  }));

  useEffect(() => {
    if (address !== props.address) {
      window.location.href = `/search/${address}`;
    }
  }, [address, props.address]);

  const hasData = data && data.length > 0 && markers && markers.length > 0;

  return (
    <>
      {/* <Hero/> */}
      <Header />
      {/* desktop filters */}
      <div className="hidden h-fit w-full flex-row gap-4 border-b-2 border-t-2 bg-white px-8 py-2 md:flex">
        <div className="w-96">
          <MapSelect setAddress={setAddress} address={address} />
        </div>
        <OperationTypeDropdown
          setOperationType={setOperationType}
          operationType={operationType}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Precio</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-80 space-y-4 pb-4">
            <DropdownMenuLabel>Rango de Precios</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <PriceRangeDropdown
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <BuildingTypeDropdown
          buildingType={buildingType}
          setBuildingType={setBuildingType}
          items={BUILDING_TYPES}
        />
        <BedsBathsDropdown
          numberOfBathrooms={numberOfBathrooms}
          setNumberOfBathrooms={setNumberOfBathrooms}
          numberOfRooms={numberOfRooms}
          setNumberOfRooms={setNumberOfRooms}
          buttonItems={BUTTON_ITEMS_FILTER}
        />
      </div>
      {/* mobile filters */}
      <ScrollArea className="-mt-1 flex flex-col gap-4 border-b-2 border-t-2 bg-white px-8 py-4 md:hidden">
        <div className="w-full">
          <MapSelect setAddress={setAddress} address={address} />
        </div>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="outline">Filtros</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-full rounded-none px-5 md:hidden">
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
                numberOfParkingLots={numberOfParkingLots}
                setNumberOfParkingLots={setNumberOfParkingLots}
                buildingType={buildingType}
                setBuildingType={setBuildingType}
                numberOfRoomsAndBathroomsItems={BUTTON_ITEMS_FILTER}
                buildingTypes={BUILDING_TYPES}
              />
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </ScrollArea>
      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      )}
      {hasData && (
        <section className="flex h-screen flex-row gap-2 md:h-[50vw]">
          {/* map */}
          <div className="hidden md:block">
            <Map
              center={{ lat: location.lat, lng: location.lng }}
              width="50vw"
              height="50vw"
              markers={markers}
            />
          </div>
          {/* results */}
          <div className="flex min-h-screen w-full flex-col gap-[16px] p-2 px-4 md:h-[50vw]">
            {/* title and subtitle */}
            <div className="flex w-full flex-col gap-[8px]">
              {/* title */}
              <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
                {
                  {
                    "": "Propiedades",
                    apartment: "Apartamentos",
                    house: "Casas",
                    land: "Terrenos",
                    warehouse: "Bodegas",
                    office: "Oficinas",
                  }[buildingType]
                }{" "}
                disponibles en {address}
              </h1>
              {/* subtitle */}
              <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
                {markers.length} resultados encontrados
              </article>
            </div>
            {/* cards */}
            <ScrollArea className="h-screen md:h-[45vw]">
              <div className="grid h-screen w-full grid-cols-1 gap-3 align-middle lg:grid-cols-2">
                {data.map((i) => (
                  <Card
                    key={i._id}
                    url={`/listing/${i._id}`}
                    formattedPrice={
                      i.currency === "GTQ"
                        ? GTQ.format(i.price)
                        : USD.format(i.price)
                    }
                    numberOfRooms={i.numberOfRooms}
                    numberOfBathrooms={i.numberOfBathrooms}
                    numberOfParkingLots={i.numberOfParkingLots}
                    totalArea={i.totalArea}
                    address={i.title ? i.title : i.address}
                    imageUrl={i.imagesUrl[0] ?? ""}
                    operationType={i.operationType}
                    buildingType={i.buildingType}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

// Fetch data before the page loads
export const getStaticProps = async (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const address = ctx.params?.address as string;
  const typeOfBuilding = ctx.params?.type as string;
  const numberOfRooms = ctx.params?.rooms as string;
  const numberOfBathrooms = ctx.params?.bathrooms as string;
  const numberOfParkingLots = ctx.params?.parking as string;
  const totalArea = ctx.params?.area as string;

  const hasAllParams =
    address &&
    typeOfBuilding &&
    numberOfRooms &&
    numberOfBathrooms &&
    numberOfParkingLots &&
    totalArea;

  if (!hasAllParams) throw new Error("Params are missing");

  const location = await getCoordinates(address);

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      address,
      typeOfBuilding,
      numberOfRooms,
      numberOfBathrooms,
      numberOfParkingLots,
      totalArea,
      location: JSON.parse(JSON.stringify(location)),
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
