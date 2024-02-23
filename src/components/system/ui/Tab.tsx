import React from "react";

export const Tab = ({
  label,
  icon,
  total,
  active = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  total: number;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className="flex h-full cursor-pointer flex-col rounded-xl"
      onClick={onClick}
    >
      <div className="flex h-full flex-row items-center justify-center gap-2">
        {icon}
        <div className="text-center text-sm font-semibold text-zinc-800">
          {label}: {total}
        </div>
      </div>
      {active && <div className="h-[2px] w-full  bg-zinc-800" />}
    </button>
  );
};
