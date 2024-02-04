"use client";
import Link from "next/link";
import React, { type FormEvent, useState } from "react";
import { UILoadingPage } from "~/components/system/layouts/Loader";
import { type SearchParamsI } from "~/pages/projects";
import { api } from "~/utils/api";
import { projects } from "~/data/json/projects";
import Card from "./Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Banner = () => {
  const [searchParams, setSearchParams] = useState<SearchParamsI>({});

  const { data, isLoading } = api.lot.getAll.useQuery({
    availability: true,
    ...searchParams,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { maximumPrice, maximumArea } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement),
    );
    const params = [
      ["maximumPrice", maximumPrice && parseInt(maximumPrice as string)],
      ["maximumArea", maximumArea && parseInt(maximumArea as string)],
    ];
    setSearchParams({});
    params.forEach(([key, value]) => {
      if (value) {
        setSearchParams((prev) => ({ ...prev, [key as string]: value }));
      }
    });
  };

  if (isLoading) return <UILoadingPage />;

  return (
    <>
      <Dialog>
        <DialogContent>
          <div className="h-[60rem] overflow-y-scroll">
            <div className="grid grid-cols-2 gap-4">
              {data?.map((lot) => {
                const currentProject = projects.find(
                  (p) => p.id === lot.projectId,
                );
                const imagesArray = currentProject?.images;
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
                    project={currentProject?.name ?? "Anonimo"}
                  />
                );
              })}
            </div>
          </div>
        </DialogContent>
        <section className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/25  sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-10 lg:flex lg:h-screen lg:items-center  lg:px-20">
            <div className="mx-auto w-full max-w-xl text-center lg:w-1/2 lg:text-start ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-[60px] font-extrabold leading-[65px]">
                Tenemos tu
                <p className="block font-extrabold text-secondary-800">
                  proximo
                </p>
                hogar
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-center sm:text-xl/relaxed lg:text-start">
                Descubre tu futuro hogar en nuestros exclusivos proyectos de
                lotes
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-center lg:justify-start">
                <Link
                  href="/contact"
                  className="block w-full rounded bg-secondary-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary-700 focus:outline-none focus:ring active:bg-secondary-500 sm:w-auto"
                >
                  Empieza
                </Link>
                <Link
                  href="/services"
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-secondary-600 shadow hover:text-secondary-700 focus:outline-none focus:ring active:text-secondary-500 sm:w-auto"
                >
                  Aprende Mas
                </Link>
              </div>
            </div>
            <div className="flex  w-full items-center justify-center pt-4 md:p-8 lg:h-screen lg:justify-end">
              <form
                className="block w-[500px] rounded bg-secondary-600/80 p-8 shadow"
                onSubmit={handleSubmit}
              >
                <select
                  className="mb-4 block w-full rounded  p-3 text-primary-800  placeholder:text-primary-500"
                  name="project"
                  id="project"
                >
                  <option value="">Nuestros Proyectos</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>

                {/* Row */}
                <div className="flex gap-4">
                  {/* minimum area  */}
                  {/* <input
                  className="mb-4 block w-full rounded  p-3 text-primary-800  placeholder:text-primary-500 p-8 bg-primary-800"
                  type="number"
                  name="minimumArea"
                  placeholder="Area minima en m2?"
                  defaultValue={searchParams.minimumArea}
                /> */}
                  {/* maximum area  */}
                  <input
                    className="mb-4 block w-full rounded   p-3 text-primary-800  placeholder:text-primary-500"
                    type="number"
                    name="maximumArea"
                    placeholder="Area maxima en m2?"
                    defaultValue={searchParams.maximumArea}
                  />
                </div>

                {/* Row */}
                <div className="flex gap-4">
                  {/* minimum price  */}
                  {/* <input
                  className="mb-4 block w-full rounded  p-3 text-primary-800  placeholder:text-primary-500 p-8 bg-primary-800"
                  type="number"
                  name="minimumPrice"
                  placeholder="Precio minimo en Q.?"
                  defaultValue={searchParams.minimumPrice}
                /> */}
                  {/* maximum price  */}
                  <input
                    className="mb-4 block w-full rounded  p-3 text-primary-800  placeholder:text-primary-500"
                    type="number"
                    name="maximumPrice"
                    placeholder="Precio maximo en Q.?"
                    defaultValue={searchParams.maximumPrice}
                  />
                </div>
                <DialogTrigger>
                  <button
                    className="hover:bg-gradient block  w-full rounded-r bg-secondary-700 p-2 text-white  shadow duration-300 hover:font-bold hover:text-white"
                    type="submit"
                  >
                    Buscar propiedades
                  </button>
                </DialogTrigger>
              </form>
            </div>
          </div>
        </section>
      </Dialog>
    </>
  );
};

export default Banner;
