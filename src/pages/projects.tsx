import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import React, { useState } from "react";
import { ReservationContainer } from "~/components/template/layouts/ReservationContainer";
import { api } from "~/utils/api";
import { GTQ } from "~/utils/functions";
import { LotContainer } from "~/components/template/layouts/LotContainer";
import { ProjectsContainer } from "~/components/template/layouts/ProjectsContainer";
import { Announce } from "~/components/template/layouts/Announce";
import Reserved from "~/assets/img/reserved.gif";
import Sold from "~/assets/img/sold.gif";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { projects } from "~/data/json/projects";
import { toast } from "@/components/ui/use-toast";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";

export interface SearchParamsI {
  page?: number;
  elementsPerPage?: number;
  project?: number;
  minimumPrice?: number;
  maximumPrice?: number;
  minimumArea?: number;
  maximumArea?: number;
}

export default function Projects() {
  const [selectedLotIdentifier, setSelectedLotIdentifier] =
    useState<string>("0");
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [open, setOpen] = useState(false);

  const { data: lotData } = api.lot.getLot.useQuery({
    identifier: selectedLotIdentifier.toString(),
    projectId: currentProject?.id,
  });

  const handleClick = (id: string) => {
    setSelectedLotIdentifier(id);
    setOpen(true);
  };

  const handleSetCurrentProject = (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (project) setCurrentProject(project);
  };

  const handlePrevious = () => {
    if (currentProject) {
      if (currentProject.id - 1 <= 0) handleSetCurrentProject(projects.length);
      else handleSetCurrentProject(currentProject.id - 1);
    } else {
      toast({
        title: "Error",
        description: "No se pudo cambiar de proyecto",
      });
    }
  };

  const handleNext = () => {
    if (currentProject) {
      if (currentProject.id === projects.length) handleSetCurrentProject(1);
      else handleSetCurrentProject(currentProject.id + 1);
    } else {
      toast({
        title: "Error",
        description: "No se pudo cambiar de proyecto",
      });
    }
  };

  const getLotSteps = () => {
    if (lotData) {
      // get last reservation per created At Date
      const lastReservation = lotData.reservations?.sort(
        (a, b) => Number(b.createdAt) - Number(a.createdAt),
      )[0];

      if (lastReservation?.status === 1) {
        return (
          <Announce
            title="Lote ya reservado"
            subtitle="Lo sentimos, este lote ya ha sido reservado con anterioridad, si aun no ha sido vendido y piensa que es un error contacte con el supervisor para que lo ponga disponible de nuevo o lo marque como vendido."
            image={Reserved}
          />
        );
      } else if (lastReservation?.status === 2) {
        return (
          <Announce
            title="Lote ya vendido"
            subtitle="Felicitaciones, este lote ya ha sido vendido con exito."
            image={Sold}
          />
        );
      } else {
        const imagesArray = currentProject?.images;
        const randomImage = imagesArray
          ? imagesArray[Math.floor(Math.random() * imagesArray.length)]
          : "";
        return (
          <ReservationContainer
            lotDescription={`${currentProject?.name} ${lotData.location}`}
            lotTitle={`Agregado el ${lotData.createdAt.toLocaleDateString()}`}
            lotDownPayment={GTQ.format(
              lotData.downPayment as unknown as number,
            )}
            lotId={lotData.lotId as unknown as number}
            lotIdentifier={lotData.identifier}
            lotImage={randomImage ?? ""}
            lotPrice={GTQ.format(lotData.price as unknown as number)}
            lotMeasures={lotData.measures ?? "Sin medidas"}
          />
        );
      }
    } else if (currentProject) {
      return (
        <LotContainer
          lotIdentifier={selectedLotIdentifier}
          projectId={currentProject?.id}
        />
      );
    }
  };

  return (
    <LayoutSigned>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {/* If data is not available then we should add it */}
          {lotData
            ? getLotSteps()
            : currentProject && (
                <LotContainer
                  lotIdentifier={selectedLotIdentifier}
                  projectId={currentProject.id}
                />
              )}
        </DialogContent>
        {currentProject && (
          <ProjectsContainer
            projectBlueprint={currentProject.blueprint}
            projectId={currentProject.id}
            projectName={currentProject.name}
            projectsLength={projects.length}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            handleClick={handleClick}
          />
        )}
      </Dialog>
    </LayoutSigned>
  );
}

// Fetch data before the page loads
export const getStaticProps = () => {
  const helpers = generateSSGHelper();

  // helpers.lot.infiniteLots
  //   .prefetch({
  //     limit: itemsPerPage,
  //     availability: availability,
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
    },
  };
};
