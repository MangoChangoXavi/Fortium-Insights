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

interface Props {
  buildingType: string;
  setBuildingType: (buildingType: string) => void;
}

export const BuildingTypeDropdown = ({
  buildingType,
  setBuildingType,
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
          <DropdownMenuRadioItem value="">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="apartment">
            Apartamento
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="house">Casa</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="land">Terreno</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="warehouse">
            Bodega
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="office">Oficina</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
