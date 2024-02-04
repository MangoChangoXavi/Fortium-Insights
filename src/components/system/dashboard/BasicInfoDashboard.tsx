import React from "react";

interface PropsI {
  background: string;
  icon?: React.ReactNode;
  text: string;
}

export const BasicInfoDashboard = ({ background, icon, text }: PropsI) => {
  return (
    <div
      className={`flex min-h-[79px] w-full items-center rounded-xl ${background}`}
    >
      <p className="ml-4 flex flex-row gap-4 text-xl font-medium not-italic leading-[normal] text-white">
        {text} {icon}
      </p>
    </div>
  );
};
