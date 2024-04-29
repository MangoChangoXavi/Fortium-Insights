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

interface ItemI {
  value: string;
  label: string;
}
interface Props {
  buildingType: string;
  setBuildingType: (buildingType: string) => void;
  items: ItemI[];
}

export const BuildingTypeDropdown = ({
  buildingType,
  setBuildingType,
  items,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {
            {
              "": "Tipo de Propiedad",
              apartment: "Apartamentos",
              house: "Casas",
              land: "Terrenos",
              warehouse: "Bodegas",
              office: "Oficinas",
            }[buildingType]
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-10">
        <DropdownMenuLabel>Selecciona un tipo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={buildingType}
          onValueChange={setBuildingType}
        >
          {items.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
