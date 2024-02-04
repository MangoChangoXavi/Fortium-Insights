import React from "react";
import { UILoadingPage } from "~/components/system/layouts/Loader";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { LayoutNotSigned } from "~/components/system/layouts/LayoutNotSigned";
import Card from "~/features/landing/components/Card";
import { Filter } from "~/features/landing/components/Filter";

const lotsPerPage = 8;

export default function Add() {
  const [lotsPage, setLotsPage] = React.useState(0);
  const [openFilters, setOpenFilters] = React.useState(false);

  const [selectedProjects, setSelectedProjects] = React.useState<number[]>([]);

  const { data, fetchNextPage, isLoading } =
    api.lot.infiniteLots.useInfiniteQuery(
      {
        limit: lotsPerPage,
        projects: selectedProjects,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        // initialCursor: 1, // <-- optional you can pass an initialCursor
      },
    );

  const { data: totalLots, isLoading: isCountingLots } =
    api.lot.countLots.useQuery({
      limit: lotsPerPage,
      projects: selectedProjects,
    });
  const handleLotPagination = async (updatePage: number) => {
    if (updatePage > lotsPage) {
      await fetchNextPage();
    }
    setLotsPage(updatePage);
  };

  const projects = [
    {
      projectId: 1,
      name: "Naranjo",
    },
  ];

  const currentPageItems = data?.pages[lotsPage]?.items;

  if (isLoading || isCountingLots) return <UILoadingPage />;

  return (
    <LayoutNotSigned>
      <>
        <div className="bg-white">
          <div>
            <main className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Proyectos -{" "}
                  <span className="text-primary-500">
                    {totalLots?.count} Resultados
                  </span>
                </h1>
                <div className="flex items-center">
                  {/* <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                        id="menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        Sort
                        <svg
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm font-medium text-gray-900"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                        >
                          Most Popular
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-500"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-1"
                        >
                          Best Rating
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-500"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                          Newest
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-500"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-3"
                        >
                          Price: Low to High
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-500"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-4"
                        >
                          Price: High to Low
                        </a>
                      </div>
                    </div>
                  </div> */}
                  {/* <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button> */}
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setOpenFilters(!openFilters)}
                  >
                    <span className="sr-only">Filters</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className={`border-b border-gray-200 py-6 lg:hidden ${
                  openFilters ? "" : "hidden"
                }`}
              >
                <Filter title="Nombre de Proyecto">
                  {projects?.map((project) => (
                    <div className="flex items-center" key={project.name}>
                      <input
                        id="filter-color-0"
                        name="color[]"
                        checked={selectedProjects.includes(project.projectId)}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProjects([
                              ...selectedProjects,
                              project.projectId,
                            ]);
                          } else {
                            setSelectedProjects(
                              selectedProjects.filter(
                                (p) => p !== project.projectId,
                              ),
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor="filter-color-0"
                        className="ml-3 text-sm text-gray-600"
                      >
                        {project.name}
                      </label>
                    </div>
                  ))}
                </Filter>
              </div>
              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    {/* <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                    >
                      <li>
                        <a href="#">Totes</a>
                      </li>
                      <li>
                        <a href="#">Backpacks</a>
                      </li>
                      <li>
                        <a href="#">Travel Bags</a>
                      </li>
                      <li>
                        <a href="#">Hip Bags</a>
                      </li>
                      <li>
                        <a href="#">Laptop Sleeves</a>
                      </li>
                    </ul> */}
                    <div className="border-b border-gray-200 py-6">
                      <Filter title="Nombre de Proyecto">
                        {projects?.map((project) => (
                          <div className="flex items-center" key={project.name}>
                            <input
                              id="filter-color-0"
                              name="color[]"
                              checked={selectedProjects.includes(
                                project.projectId,
                              )}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedProjects([
                                    ...selectedProjects,
                                    project.projectId,
                                  ]);
                                } else {
                                  setSelectedProjects(
                                    selectedProjects.filter(
                                      (p) => p !== project.projectId,
                                    ),
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {project.name}
                            </label>
                          </div>
                        ))}
                      </Filter>
                    </div>
                  </form>
                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* <LayoutVerticalInfinite
                          handlePagination={handleLotPagination}
                          page={lotsPage}
                          totalPages={totalLots?.pages}
                          itemPage={
                            // This should be a map of the data from the API
                            <div className="3xl:grid-cols-3 grid grid-cols-1 gap-4 xl:grid-cols-2 ">
                              {currentPageItems?.length !== 0 ? (
                                currentPageItems?.map((lot) => (
                                  <Card
                                    key={lot.identifier}
                                    title={`Lote ${lot.identifier}`}
                                    price={lot.price as unknown as number}
                                    imageSrc={lot.image ? lot.image : ""}
                                    location={lot.location}
                                    totalArea={lot.totalArea as unknown as number}
                                    downPayment={
                                      lot.downPayment as unknown as number
                                    }
                                    project={"Naranjo"}
                                  />
                                ))
                              ) : (
                                <div className="mt-10 flex flex-row items-center justify-items-center text-2xl text-primary-500">
                                  No hay Lotes
                                </div>
                              )}
                            </div>
                          }
                        /> */}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </>
    </LayoutNotSigned>
  );
}

// Fetch data before the page loads
export const getStaticProps = () => {
  const helpers = generateSSGHelper();

  helpers.lot.infiniteLots
    .prefetch({
      limit: lotsPerPage,
    })
    .catch((err) => {
      console.error(err);
    });

  helpers.lot.countLots
    .prefetch({
      limit: lotsPerPage,
    })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
    },
  };
};
