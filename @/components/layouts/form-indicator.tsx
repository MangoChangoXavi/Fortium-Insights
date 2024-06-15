import React from "react";

export const FormIndicator = ({ required }: { required?: boolean }) => {
  return required ? (
    <span className="font-['Plus Jakarta Sans']  text-right text-sm font-semibold text-primary-500">
      Required
    </span>
  ) : (
    <span className="font-['Plus Jakarta Sans'] text-right text-sm font-semibold text-neutral-400">
      Optional
    </span>
  );
};
