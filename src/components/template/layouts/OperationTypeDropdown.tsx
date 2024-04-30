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
  operationType: string;
  setOperationType: (operationType: string) => void;
}

export const OperationTypeDropdown = ({
  operationType,
  setOperationType,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {
            {
              all: "Venta/Renta",
              rent: "En renta",
              sell: "En venta",
            }[operationType]
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-10">
        <DropdownMenuLabel>Tipo de Operacion</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={operationType}
          onValueChange={setOperationType}
        >
          <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rent">En renta</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sell">En venta</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
