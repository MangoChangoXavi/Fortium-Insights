import React from "react";
import { Stat } from "./Stat";

export interface IFilter {
  label: string;
  value: string;
  total: number;
  icon: React.ReactNode;
  background: string;
}

export const StatsGroup = ({
  filters,
  filter,
  setFilter,
  isVertical = false,
}: {
  filters: IFilter[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  isVertical?: boolean;
}) => {
  return (
    <div
      className={`flex w-full ${
        isVertical ? "flex-col" : "flex-col md:flex-row"
      } border-3 justify-evenly rounded-xl border border-blue-100 p-6`}
    >
      {filters.map((item, index) => (
        <button
          onClick={() => setFilter(item.value)}
          key={`${index}${item.value}`}
          className={`flex flex-row gap-[8px] p-2 ${
            item.value === filter
              ? "rounded-lg border border-solid border-blue-300 bg-blue-100"
              : ""
          }`}
        >
          <Stat
            background={item.background}
            icon={item.icon}
            label={item.label}
            total={item.total}
          />
        </button>
      ))}
    </div>
  );
};
