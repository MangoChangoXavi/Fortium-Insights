"use client";
import React, { useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DashboardIcon } from "~/components/system/ui/Icons";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { data: session } = useSession();

  const menu = [
    { name: "Home", url: "/" },
    { name: "Proyectos", url: "/store" },
    {
      name: "Servicios",
      url: "/services",
    },
    { name: "Acerca De", url: "/about" },
    { name: "Contacto", url: "/contact" },
    {
      name: session ? "Oficina" : "Ingresa",
      url: session ? "/dashboard" : "/api/auth/signin",
    },
  ];
  return (
    <nav className="w-full bg-primary-800/80 shadow">
      <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-20 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <Link href="#" className="">
              <div className="avatar">
                <div className="w-16 rounded">
                  <h1 className="text-3xl font-bold text-white">
                    Tu Asesor Inmobiliario
                  </h1>
                </div>
              </div>
            </Link>

            <div className="md:hidden">
              <button
                className="rounded-md p-2 text-white outline-none focus:font-bold"
                onClick={() => setNavbar(!navbar)}
              >
                <DashboardIcon />
                {/* {navbar ? (
                  <RxCross1 className="text-white" />
                ) : (
                  <LinkiOutlineMenu className="text-white" />
                )} */}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`mt-8 hidden flex-1 justify-self-center pb-3 hover:block md:mt-0 md:block md:pb-0`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {menu.map(({ name, url }, index) => (
                <li key={index} className="text-white hover:font-bold">
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={`md:hidden ${navbar ? "block" : "hidden"}`}>
            <ul className=" items-center justify-center space-y-8 py-6 md:flex md:space-x-6 md:space-y-0">
              {menu.map(({ name, url }, index) => (
                <li key={index} className="text-white hover:font-bold">
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
