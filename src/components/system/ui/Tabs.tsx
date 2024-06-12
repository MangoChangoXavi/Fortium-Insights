import React from "react";

export interface TabI {
  icon: React.ReactNode;
  label: string;
}

interface PropsI {
  tabs: TabI[];
}

export const Tabs = ({ tabs }: PropsI) => {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  return (
    <div className={`flex w-full justify-evenly rounded-xl bg-white p-6`}>
      {tabs.map((item, index) => (
        <button
          onClick={() => setSelectedTab(item)}
          key={`${index}${item.label}`}
          className={`flex flex-row gap-[8px] p-2 ${
            item.label === selectedTab?.label
              ? "rounded-lg border border-solid border-blue-950 bg-primary-100"
              : ""
          }`}
        >
          {item.icon} {item.label}
        </button>
      ))}
    </div>
  );
};
