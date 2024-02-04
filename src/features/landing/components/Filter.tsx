import React, { useState } from "react";

export const Filter = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <h3 className="-my-2 flow-root">
        {/* Expand/collapse section button */}
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
          aria-controls="filter-section-0"
          aria-expanded="false"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-medium text-gray-900">{title}</span>
          <span className="ml-6 flex items-center">
            {/* Expand icon, show/hide based on section open state. */}
            <svg
              className={`h-5 w-5 ${expanded ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            {/* Collapse icon, show/hide based on section open state. */}
            <svg
              className={`h-5 w-5 ${expanded ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </h3>
      {/* Filter section, show/hide based on section state. */}
      <div
        className={`pt-6 ${expanded ? "block" : "hidden"}`}
        id="filter-section-0"
      >
        <div className="space-y-4">{children}</div>
      </div>
    </>
  );
};
