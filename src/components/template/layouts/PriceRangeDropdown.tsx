import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormControl } from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { USD } from "~/utils/functions";

interface PropsI {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
}

export const PriceRangeDropdown = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: PropsI) => {
  const [operationType, setOperationType] = React.useState("sell");
  const SELL_PRICES = [
    50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
    900000, 1000000,
  ];
  const RENT_PRICES = [
    0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
  ];
  const prices = operationType === "sell" ? SELL_PRICES : RENT_PRICES;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Precio</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-80 space-y-4 pb-4">
        <DropdownMenuLabel>Rango de Precios</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ToggleGroup
          type="single"
          value={operationType}
          onValueChange={(value) => setOperationType(value)}
        >
          <ToggleGroupItem value="sell">Compra</ToggleGroupItem>
          <ToggleGroupItem value="rent">Alquiler</ToggleGroupItem>
        </ToggleGroup>
        <div className="mx-2 flex flex-row gap-2">
          <div className="space-y-1">
            <label htmlFor="">Minimo</label>
            <Select
              value={minPrice}
              onValueChange={(value) => setMinPrice(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Precio Minimo" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="all">Sin Minimo</SelectItem>
                  {prices.map((price) => (
                    <SelectItem key={price} value={`${price}`}>
                      {USD.format(price)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label htmlFor="">Maximo</label>
            <Select
              value={maxPrice}
              onValueChange={(value) => setMaxPrice(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Precio Maximo" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="all">Sin Maximo</SelectItem>
                  {prices.map((price) => (
                    <SelectItem key={price} value={`${price}`}>
                      {USD.format(price)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
