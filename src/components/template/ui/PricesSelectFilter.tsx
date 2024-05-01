import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USD } from "~/utils/functions";

interface PricesSelectFilterProps {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  prices: number[];
}

export const PricesSelectFilter = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  prices,
}: PricesSelectFilterProps) => {
  return (
    <>
      <div className="mx-2 flex flex-row gap-2">
        <div className="space-y-1">
          <label htmlFor="minPrice">Minimo</label>
          <Select
            name="minPrice"
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
          <label htmlFor="maxPrice">Maximo</label>
          <Select
            name="maxPrice"
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
    </>
  );
};
