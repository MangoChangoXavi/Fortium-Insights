import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { FormControl } from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const PriceRangeDropdown = () => {
  const [operationType, setOperationType] = React.useState("sell");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Precio</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-10">
        <DropdownMenuLabel>Rango de Precios</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ToggleGroup
          type="single"
          value={operationType}
          onChange={(e) => setOperationType(e.target.value)}
        >
          <ToggleGroupItem value="sell">Compra</ToggleGroupItem>
          <ToggleGroupItem value="rent">Alquiler</ToggleGroupItem>
        </ToggleGroup>
        <div className="mx-2 flex flex-row gap-2">
          <Select
          // onValueChange={field.onChange}
          // defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Minimo" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="10000">100,000</SelectItem>
              <SelectItem value="20000">200,000</SelectItem>
              <SelectItem value="30000">300,000</SelectItem>
              <SelectItem value="40000">400,000</SelectItem>
              <SelectItem value="50000">500,000</SelectItem>
              <SelectItem value="60000">600,000</SelectItem>
              <SelectItem value="70000">700,000</SelectItem>
              <SelectItem value="80000">800,000</SelectItem>
              <SelectItem value="90000">900,000</SelectItem>
              <SelectItem value="100000">1,000,000</SelectItem>
              <SelectItem value="150000">1,500,000</SelectItem>
              <SelectItem value="200000">2,000,000</SelectItem>
              <SelectItem value="250000">2,500,000</SelectItem>
              <SelectItem value="300000">3,000,000</SelectItem>
              <SelectItem value="350000">3,500,000</SelectItem>
              <SelectItem value="400000">4,000,000</SelectItem>
            </SelectContent>
          </Select>
          <span>-</span>
          <Select
          // onValueChange={field.onChange}
          // defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Maximo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10000">100,000</SelectItem>
              <SelectItem value="20000">200,000</SelectItem>
              <SelectItem value="30000">300,000</SelectItem>
              <SelectItem value="40000">400,000</SelectItem>
              <SelectItem value="50000">500,000</SelectItem>
              <SelectItem value="60000">600,000</SelectItem>
              <SelectItem value="70000">700,000</SelectItem>
              <SelectItem value="80000">800,000</SelectItem>
              <SelectItem value="90000">900,000</SelectItem>
              <SelectItem value="100000">1,000,000</SelectItem>
              <SelectItem value="150000">1,500,000</SelectItem>
              <SelectItem value="200000">2,000,000</SelectItem>
              <SelectItem value="250000">2,500,000</SelectItem>
              <SelectItem value="300000">3,000,000</SelectItem>
              <SelectItem value="350000">3,500,000</SelectItem>
              <SelectItem value="400000">4,000,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
