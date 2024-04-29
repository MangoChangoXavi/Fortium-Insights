import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";

interface Item {
  value: string;
  label: string;
}

interface PropsI {
  valueState: string;
  setValueState: (value: string) => void;
  items: Item[];
}

export const ToggleGroupButtons = ({
  valueState,
  setValueState,
  items,
}: PropsI) => {
  return (
    <ToggleGroup
      type="single"
      variant={"outline"}
      className="gap-1"
      value={valueState}
      onValueChange={(value) => setValueState(value)}
    >
      {items.map((item) => (
        <ToggleGroupItem key={item.value} value={item.value}>
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
