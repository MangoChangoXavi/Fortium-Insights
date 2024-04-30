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
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("400000");

  const { data, isLoading } = api.requirements.get.useQuery({
    lat: location.lat,
    lng: location.lng,
    operationType: operationType === "all" ? "" : operationType,
    buildingType,
    minNumberOfRooms: numberOfRooms === "all" ? 0 : parseInt(numberOfRooms),
    minNumberOfBathrooms:
      numberOfBathrooms === "all" ? 0 : parseInt(numberOfBathrooms),
  });

  const markers = data?.map((i) => ({
    lat: i.location.coordinates[1],
    lng: i.location.coordinates[0],
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
      <section className="w-100 relative  bg-cover bg-center bg-no-repeat">
        <Header />
      </section>
      {/* desktop filters */}
      <div className="hidden h-fit w-full flex-row gap-4 border-b-2 border-t-2 bg-white px-8 py-2 md:flex">
        <div className="w-96">
          <MapSelect setAddress={setAddress} address={address} />
        </div>
        <OperationTypeDropdown
          setOperationType={setOperationType}
          operationType={operationType}
        />
        {/* <PriceRangeDropdown
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        /> */}
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
      <div className="flex flex-col gap-4 border-b-2 border-t-2 bg-white px-8 py-2 md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Filtros</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerContent>
              <section className="flex h-[32rem] flex-col gap-5 px-8">
                {/* operation type */}
                <div className="flex flex-col items-start justify-start gap-3">
                  <label htmlFor="">Tipo de Operacion</label>
                  <ToggleGroup
                    type="single"
                    value={operationType}
                    onValueChange={(value) => setOperationType(value)}
                  >
                    <ToggleGroupItem value="all">Todas</ToggleGroupItem>
                    <ToggleGroupItem value="sell">Compra</ToggleGroupItem>
                    <ToggleGroupItem value="rent">Alquiler</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                {/* number of rooms */}
                <div className="flex flex-col items-start justify-start gap-3">
                  <label htmlFor="">Numero de dormitorios</label>
                  <ToggleGroupButtons
                    valueState={numberOfRooms}
                    setValueState={setNumberOfRooms}
                    items={BUTTON_ITEMS_FILTER}
                  />
                </div>
                {/* number of bathrooms */}
                <div className="flex flex-col items-start justify-start gap-3">
                  <label htmlFor="">Numero de baños</label>
                  <ToggleGroupButtons
                    valueState={numberOfBathrooms}
                    setValueState={setNumberOfBathrooms}
                    items={BUTTON_ITEMS_FILTER}
                  />
                </div>
                {/* building type radio buttons */}
                <div className="flex flex-col items-start justify-start gap-3">
                  <label htmlFor="">Tipo de propiedad</label>
                  <RadioGroup
                    defaultValue="comfortable"
                    value={buildingType}
                    onValueChange={(value) => setBuildingType(value)}
                  >
                    {BUILDING_TYPES.map((item) => (
                      <div
                        key={item.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={item.value} id={item.value} />
                        <Label htmlFor={item.value}>{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </section>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      )}
      {hasData && (
        <section className="flex min-h-screen flex-row gap-2">
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
          <div className="flex min-h-screen flex-col gap-[16px] ">
            {/* title and subtitle */}
            <div className="flex flex-col gap-[8px]">
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
            <div className="grid h-screen grid-cols-1 gap-2 overflow-y-scroll align-middle lg:grid-cols-2">
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
                  totalArea={i.totalArea}
                  address={i.address}
                  imageUrl={i.imagesUrl ? i.imagesUrl[0] : ""}
                  operationType={i.operationType}
                  buildingType={i.buildingType}
                />
              ))}
            </div>
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

  const slug = ctx.params?.slug as string;

  if (!slug) throw new Error("No slug provided");

  const address = slug;

  const location = await getCoordinates(address);

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      address,
      location: JSON.parse(JSON.stringify(location)),
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
