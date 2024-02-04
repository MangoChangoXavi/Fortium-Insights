"use client"; // This is a client component 👈🏽
import { useState } from "react";
import { UILoadingPage } from "~/components/system/layouts/Loader";
import { projects } from "~/data/json/projects";
import { api } from "~/utils/api";
import Card from "./Card";

const Tabs = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const { data, isLoading } = api.lot.getAll.useQuery({
    availability: true,
    project: selectedProject?.id,
  });

  if (isLoading) return <UILoadingPage />;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex ">
        {projects.map((project, idx) => {
          return (
            <button
              key={idx}
              className={`${
                project.name === selectedProject?.name
                  ? "border-b-2 border-secondary-700 text-secondary-700 "
                  : "hover:text-tertiary-700 text-secondary-400 dark:text-white dark:hover:text-secondary-400"
              } px-2 py-4 font-normal focus:outline-none sm:px-6 sm:font-medium ${
                idx === 3 && "hidden sm:flex"
              }`}
              onClick={() => {
                setSelectedProject(project);
              }}
            >
              {project.name}
            </button>
          );
        })}
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {data?.slice(0, 7).map((lot) => {
            const imagesArray = projects.find((p) => p.id === lot.projectId)
              ?.images;
            const randomImage = imagesArray
              ? imagesArray[Math.floor(Math.random() * imagesArray.length)]
              : "";
            return (
              <Card
                key={lot.identifier}
                title={`Lote ${lot.identifier}`}
                price={lot.price as unknown as number}
                imageSrc={randomImage ?? ""}
                location={lot.location}
                totalArea={lot.totalArea as unknown as number}
                downPayment={lot.downPayment as unknown as number}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
