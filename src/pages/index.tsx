import { api, type RouterInputs } from "~/utils/api";
import React from "react";
import "chart.js/auto";

import { RequirementsForm } from "~/components/template/forms/Requirements";
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
import { Building, Home, Search } from "lucide-react";

const ITEMS_PER_PAGE = 4;
type RequirementsGetI = RouterInputs["requirements"]["get"];

export default function Index() {
  const [page, setPage] = React.useState<number>(0);

  // Search parameters
  const [operationType, setOperationType] = React.useState<string>("sell"); // ["sell", "rent"]
  const [buildingType, setBuildingType] = React.useState<string>("apartment"); // ["apartment", "house"]
  const [address, setAddress] = React.useState<string>("");

  const [searchParameters, setSearchParemeters] =
    React.useState<RequirementsGetI | null>(null);

  const { data, isLoading } = api.requirements.get.useQuery({
    ...searchParameters,
  });

  const handleSubmit = (values: RequirementsGetI) => {
    setPage(0);
    setSearchParemeters(values);
  };

  const hasData = data && data.length > 0;
  const paginatedData = hasData
    ? data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    : [];

  return (
    <>
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
            <Button
              onClick={() =>
                handleSubmit({
                  address,
                  operationType,
                  buildingType,
                })
              }
              variant={"primary"}
            >
              Buscar <Search size={12} className="ml-1" />
            </Button>
          </div>
          {/* <RequirementsForm handleSubmit={handleSubmit} /> */}
          <div className="flex w-full flex-col gap-2 overflow-auto">
            {isLoading && (
              <div className="flex w-full items-center justify-center">
                <Loader />
              </div>
            )}
            {hasData && (
              <>
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
