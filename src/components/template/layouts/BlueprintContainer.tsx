import React from "react";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";

interface BlueprintContainerProps {
  handleClick: (id: string) => void;
  projectId: number;
  blueprint: string;
}

export enum BlueprintFills {
  DEFAULT = "#8AB800",
  RESERVED = "#EAE140",
  SELLED = "#FF0005",
}

export const BlueprintContainer = ({
  handleClick,
  projectId,
  blueprint,
}: BlueprintContainerProps) => {
  // Get reservations
  const { data } = api.reservation.getAll.useQuery({
    projectId,
  });

  // Get svgs props
  const getOthers = (id: string) => {
    const getFill = (id: string) => {
      const status = data?.find((item) => item.lot.identifier === id)?.status;
      switch (status) {
        case 1:
          return BlueprintFills.RESERVED;
        case 2:
          return BlueprintFills.SELLED;
        default:
          return BlueprintFills.DEFAULT;
      }
    };

    return {
      className:
        "delay-50 duration-300 ease-in-out transform hover:fill-[#BAB9FF] cursor-pointer",
      fill: data ? getFill(id) : BlueprintFills.DEFAULT,
      onClick: () => handleClick(id),
    };
  };

  const DynamicComponent = dynamic(() =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    import(`~/components/template/blueprints/${blueprint}`).then(
      (mod) => mod.Blueprint,
    ),
  );

  return <DynamicComponent getOthers={getOthers} />;
};
