import React from "react";

// components
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PriceRangeDropdown } from "~/components/template/layouts/PriceRangeDropdown";
import { ToggleGroupButtons } from "~/components/template/ui/ToggleGroupButtons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-dropdown-menu";

interface Item {
  value: string;
  label: string;
}

interface MobileFiltersProps {
  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  operationType: string;
  setOperationType: React.Dispatch<React.SetStateAction<string>>;
  numberOfRooms: string;
  setNumberOfRooms: React.Dispatch<React.SetStateAction<string>>;
  numberOfBathrooms: string;
  setNumberOfBathrooms: React.Dispatch<React.SetStateAction<string>>;
  numberOfParkingLots: string;
  setNumberOfParkingLots: React.Dispatch<React.SetStateAction<string>>;
  buildingType: string;
  setBuildingType: React.Dispatch<React.SetStateAction<string>>;
  numberOfRoomsAndBathroomsItems: Item[];
  buildingTypes: Item[];
}

export const MobileFilters = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  operationType,
  setOperationType,
  numberOfRooms,
  setNumberOfRooms,
  numberOfBathrooms,
  setNumberOfBathrooms,
  numberOfParkingLots,
  setNumberOfParkingLots,
  buildingType,
  setBuildingType,
  numberOfRoomsAndBathroomsItems,
  buildingTypes,
}: MobileFiltersProps) => {
  return (
    <section className="flex flex-col gap-4">
      {/* price range */}
      <label htmlFor="">Rango de precios</label>
      <PriceRangeDropdown
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      {/* operation type */}
      <div className="flex flex-col items-start justify-start gap-3">
        <label htmlFor="">Tipo de Operacion</label>
        <ToggleGroup
          type="single"
          value={operationType}
          onValueChange={(value) => setOperationType(value)}
        >
          <ToggleGroupItem value="all">Todas</ToggleGroupItem>
          <ToggleGroupItem value="sell">Compra</ToggleGroupItem>
          <ToggleGroupItem value="rent">Alquiler</ToggleGroupItem>
        </ToggleGroup>
      </div>
      {/* number of rooms */}
      <div className="flex flex-col items-start justify-start gap-3">
        <label htmlFor="">Numero de dormitorios</label>
        <ToggleGroupButtons
          valueState={numberOfRooms}
          setValueState={setNumberOfRooms}
          items={numberOfRoomsAndBathroomsItems}
        />
      </div>
      {/* number of bathrooms */}
      <div className="flex flex-col items-start justify-start gap-3">
        <label htmlFor="">Numero de baños</label>
        <ToggleGroupButtons
          valueState={numberOfBathrooms}
          setValueState={setNumberOfBathrooms}
          items={numberOfRoomsAndBathroomsItems}
        />
      </div>
      {/* number of parking lots */}
      <div className="flex flex-col items-start justify-start gap-3">
        <label htmlFor="">Numero de parqueos</label>
        <ToggleGroupButtons
          valueState={numberOfParkingLots}
          setValueState={setNumberOfParkingLots}
          items={numberOfRoomsAndBathroomsItems}
        />
      </div>
      {/* building type radio buttons */}
      <div className="flex flex-col items-start justify-start gap-3">
        <label htmlFor="">Tipo de propiedad</label>
        <RadioGroup
          defaultValue="comfortable"
          value={buildingType}
          onValueChange={(value) => setBuildingType(value)}
        >
          {buildingTypes.map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value}>{item.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </section>
  );
};
