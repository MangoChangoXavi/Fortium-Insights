import React from "react";
import Tabs from "./Tabs";

const Properties = () => {
  return (
    <div id="deals" className="relative mb-4 p-4">
      <div className="relative ">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mt-20 text-2xl font-extrabold sm:text-4xl">
            <span className="block font-extrabold text-secondary-700">
              LOTES
            </span>
            &nbsp;DESTACADOS
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <p className="mt-5 w-full text-center text-base font-medium  text-primary-900 md:w-2/3">
          En <b>Megainversiones Inteligentes</b>, entendemos que la elección de
          tu nuevo hogar es una de las decisiones más importantes que tomarás.
          Por eso, te ofrecemos una selección única de lotes en proyectos
          cuidadosamente planificados que se adaptan a tus necesidades y estilo
          de vida.
        </p>
      </div>

      <div className="mt-10">
        <Tabs />
      </div>
    </div>
  );
};

export default Properties;
