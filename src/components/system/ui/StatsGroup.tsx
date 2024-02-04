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
        isVertical ? "flex-col" : "flex-row"
      } justify-evenly rounded-xl bg-white p-6`}
    >
      {filters.map((item, index) => (
        <button
          onClick={() => setFilter(item.value)}
          key={`${index}${item.value}`}
          className={`flex flex-row gap-[8px] p-2 ${
            item.value === filter
              ? "rounded-lg border border-solid border-primary-500 bg-primary-100"
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
