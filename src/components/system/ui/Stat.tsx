import React from "react";

interface PropsI {
  background: string;
  icon: React.ReactNode;
  label: string;
  total: string | number;
}

export const Stat = ({ background, icon, label, total }: PropsI) => {
  return (
    <>
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${background}`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
          {total}
        </span>
        <span
          className={`text-[#808080]" } text-xs font-medium not-italic
              leading-[normal]`}
        >
          {label}
        </span>
      </div>
    </>
  );
};
