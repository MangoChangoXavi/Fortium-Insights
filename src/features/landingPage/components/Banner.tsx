"use client";
import React from "react";
const Banner = () => {
  return (
    <>
      <div className="relative mx-auto max-w-screen-xl px-4 pt-24 sm:px-10   lg:px-20">
        <div className=" mx-auto mb-5 w-full text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-bold sm:text-7xl ">
            Eleve su
            <span className="text-custom-green">
              &nbsp;negocio inmobiliario&nbsp;
            </span>
            con nuestras soluciones
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-center text-gray-500  sm:text-xl/relaxed">
            Creamos software personalizado para su negocio inmobiliario y lo
            ayudamos a hacer crecer su negocio.
          </p>
        </div>
      </div>
      <div className="position-relative mx-auto max-w-screen-xl px-4 pb-10 pt-8 sm:px-10 lg:px-20 lg:pb-40">
        <video autoPlay loop controls>
          <source src="https://djphay76mkeogjjl.public.blob.vercel-storage.com/Final.mp4" />
        </video>
      </div>
    </>
  );
};

export default Banner;
