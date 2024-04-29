import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroupButtons } from "../ui/ToggleGroupButtons";

interface Props {
  numberOfRooms: string;
  setNumberOfRooms: (value: string) => void;
  numberOfBathrooms: string;
  setNumberOfBathrooms: (value: string) => void;
  buttonItems: { value: string; label: string }[];
}

export const BedsBathsDropdown = ({
  numberOfRooms,
  setNumberOfRooms,
  numberOfBathrooms,
  setNumberOfBathrooms,
  buttonItems,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Cuartos y Baños</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-48 p-4">
        <DropdownMenuLabel>Numero de Baños</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ToggleGroupButtons
          valueState={numberOfBathrooms}
          setValueState={setNumberOfBathrooms}
          items={buttonItems}
        />
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Numero de Cuartos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ToggleGroupButtons
          valueState={numberOfRooms}
          setValueState={setNumberOfRooms}
          items={buttonItems}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
