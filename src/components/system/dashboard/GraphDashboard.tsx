import React from "react";
import { Stat } from "../ui/Stat";

interface PropsI {
  title: string;
  stats: {
    background: string;
    icon: React.ReactNode;
    label: string;
    total: number | string;
  }[];
  graph: React.ReactNode;
}

export const GraphDashboard = ({ title, stats, graph }: PropsI) => {
  return (
    <div className="min-h-[223px] w-full rounded-xl bg-white">
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
          {title}
        </h2>
        <div className="flex flex-col items-center justify-center sm:flex-row">
          {/* graph */}
          <div className="flex items-center justify-center sm:w-3/5">
            {graph}
          </div>
          {/* stats */}
          <div
            className={`flex flex-col justify-evenly rounded-xl bg-white p-6 sm:w-2/5`}
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
        </div>
      </div>
    </div>
  );
};
