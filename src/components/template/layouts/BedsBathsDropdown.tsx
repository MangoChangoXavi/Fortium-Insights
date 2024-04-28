import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  numberOfRooms: string;
  setNumberOfRooms: (value: string) => void;
  numberOfBathrooms: string;
  setNumberOfBathrooms: (value: string) => void;
}

export const BedsBathsDropdown = ({
  numberOfRooms,
  setNumberOfRooms,
  numberOfBathrooms,
  setNumberOfBathrooms,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Cuartos y Baños</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-48 p-4">
        <DropdownMenuLabel>Numero de Baños</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ToggleGroup
          type="single"
          variant={"outline"}
          className="gap-1"
          value={numberOfRooms}
          onValueChange={(value) => setNumberOfRooms(value)}
        >
          <ToggleGroupItem value="all">Todos</ToggleGroupItem>
          <ToggleGroupItem value="1">1+</ToggleGroupItem>
          <ToggleGroupItem value="2">2+</ToggleGroupItem>
          <ToggleGroupItem value="3">3+</ToggleGroupItem>
          <ToggleGroupItem value="4">4+</ToggleGroupItem>
          <ToggleGroupItem value="5">5+</ToggleGroupItem>
        </ToggleGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Numero de Cuartos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ToggleGroup
          type="single"
          variant={"outline"}
          className="gap-1"
          value={numberOfBathrooms}
          onValueChange={(value) => setNumberOfBathrooms(value)}
        >
          <ToggleGroupItem value="all">Todos</ToggleGroupItem>
          <ToggleGroupItem value="1">1+</ToggleGroupItem>
          <ToggleGroupItem value="2">2+</ToggleGroupItem>
          <ToggleGroupItem value="3">3+</ToggleGroupItem>
          <ToggleGroupItem value="4">4+</ToggleGroupItem>
          <ToggleGroupItem value="5">5+</ToggleGroupItem>
        </ToggleGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
