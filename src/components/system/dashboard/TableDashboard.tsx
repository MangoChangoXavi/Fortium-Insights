import React from "react";
import { Stat } from "../ui/Stat";
import { DataTable } from "@/components/layouts/data-table";
import { projectsColumns } from "~/components/template/columns/Projects";

interface PropsI {
  title: string;
  stats: {
    background: string;
    icon: React.ReactNode;
    label: string;
    total: string | number;
  }[];
  children: React.ReactNode;
}

export const TableDashboard = ({ title, stats, children }: PropsI) => {
  return (
    <div className="flex min-h-[341px] w-full flex-col gap-6 rounded-xl bg-white">
      <h2 className="ml-[16px] mt-[18px] text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
        {title}
      </h2>
      <div
        className={`flex w-full flex-col justify-evenly rounded-xl bg-white px-6 sm:flex-row`}
      >
        {stats.map((item, index) => (
          <div
            key={`${index}${item.label}`}
            className={`flex flex-row gap-[8px] p-2`}
          >
            <Stat
              background={item.background}
              icon={item.icon}
              label={item.label}
              total={item.total}
            />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
