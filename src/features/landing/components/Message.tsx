import React from "react";

export const Message = () => {
  return (
    <>
      <div className="relative z-20 flex items-center overflow-hidden bg-[url(https://images.unsplash.com/photo-1581279813180-4dddc1008167?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-fixed bg-center bg-no-repeat dark:bg-tertiary-800">
        <div className=" relative mx-0 flex">
          <div className="relative z-20 flex flex-col bg-white px-6 py-20 ps-20 sm:w-1/2 lg:w-2/5">
            <span className="mb-10 h-2 w-20 bg-secondary-700 dark:bg-white"></span>
            <h2 className="text-3xl font-extrabold sm:text-5xl">
              ¡Tu Nuevo
              <strong className="inline-block font-extrabold text-secondary-700">
                &nbsp;Hogar
              </strong>
              &nbsp;Comienza Aquí!
            </h2>
            <p className="pt-5 text-sm text-secondary-700 dark:text-white sm:text-base">
              Explora nuestros proyectos, encuentra el lote perfecto y comienza
              la emocionante jornada de construir tu hogar. Megainversiones
              Inteligentes está aquí para hacer que tus sueños se hagan
              realidad.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
