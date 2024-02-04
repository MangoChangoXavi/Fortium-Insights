import React from "react";
import { BlueprintContainer } from "./BlueprintContainer";

import { Button } from "@/components/ui/button";

interface PropsI {
  handleClick: (id: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  projectId: number;
  projectName: string;
  projectsLength: number;
  projectBlueprint: string;
}

export const ProjectsContainer = ({
  handleClick,
  handlePrevious,
  handleNext,
  projectId,
  projectName,
  projectsLength,
  projectBlueprint,
}: PropsI) => {
  return (
    <>
      <div className="flex w-full flex-col pt-8">
        <div className="flex h-full w-full flex-col justify-start gap-8 rounded-xl bg-white  p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-[45px] font-bold not-italic leading-[normal] text-black">
              {projectName}
            </h1>
            <h2 className="text-[25px] font-medium not-italic leading-[normal] text-[#A9A9A9]">
              Mostrando {projectId} de {projectsLength}
            </h2>
            {projectsLength > 1 && (
              <div className="flex flex-row items-start justify-start gap-2">
                <Button color="primary" onClick={handlePrevious}>
                  Anterior{" "}
                </Button>
                <Button color="primary" onClick={handleNext}>
                  Siguiente
                </Button>
              </div>
            )}
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <BlueprintContainer
              handleClick={handleClick}
              projectId={projectId}
              blueprint={projectBlueprint}
            />
          </div>
        </div>
      </div>
    </>
  );
};
