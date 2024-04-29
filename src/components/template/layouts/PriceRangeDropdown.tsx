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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Precio</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-10 space-y-4">
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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Precio Minimo" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="50000">{USD.format(50000)}</SelectItem>
                  <SelectItem value="100000">{USD.format(100000)}</SelectItem>
                  <SelectItem value="200000">{USD.format(200000)}</SelectItem>
                  <SelectItem value="300000">{USD.format(300000)}</SelectItem>
                  <SelectItem value="400000">{USD.format(400000)}</SelectItem>
                  <SelectItem value="500000">{USD.format(500000)}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label htmlFor="">Maximo</label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Precio Maximo" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="50000">{USD.format(50000)}</SelectItem>
                  <SelectItem value="100000">{USD.format(100000)}</SelectItem>
                  <SelectItem value="200000">{USD.format(200000)}</SelectItem>
                  <SelectItem value="300000">{USD.format(300000)}</SelectItem>
                  <SelectItem value="400000">{USD.format(400000)}</SelectItem>
                  <SelectItem value="500000">{USD.format(500000)}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
