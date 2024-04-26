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

  // on address change go to search/:address
  React.useEffect(() => {
    if (address) {
      window.location.href = `/search/${address}`;
    }
  }, [address]);

  return (
    <>
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
      <Footer />
    </>
  );
}
