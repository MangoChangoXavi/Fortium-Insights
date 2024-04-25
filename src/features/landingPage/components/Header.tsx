"use client";
import React from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/logo.webp";
import {
  Building,
  GalleryHorizontalEnd,
  Hammer,
  HomeIcon,
  MenuIcon,
  SquareUserRound,
  UserIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const menu = [
    { name: "Home", url: "/", icon: <HomeIcon /> },
    { name: "Empresa", url: "/company", icon: <Building /> },
    { name: "Portafolio", url: "/portfolio", icon: <Hammer /> },
    {
      name: "Contactanos",
      url: "https://wa.me/59541638",
      icon: <SquareUserRound />,
    },
    // {name: session ? "Oficina" : "Ingresa",
    // url: session ? "/dashboard" : "/api/auth/signin", icon: <UserIcon /> },
  ];
  return (
    <nav className="w-full bg-transparent px-6 md:px-32">
      <div className="mx-auto flex justify-between md:items-center">
        {/* logo */}
        <div className="flex items-center justify-between md:block">
          <Link href="/" className="">
            <div className="avatar">
              <div className="rounded">
                {/* <img src="" /> */}
                <Image className="w-[125px]" src={logo} alt="Logo Image" />
                {/* <h1 className="text-3xl text-white font-bold">NEXT </h1> */}
              </div>
            </div>
          </Link>
        </div>
        {/* desktop menu */}
        <div className={`hidden justify-self-center py-6 hover:block md:block`}>
          <ul className="items-center justify-center md:flex md:space-x-6 md:space-y-0">
            {menu.map(({ name, url }, index) => (
              <li
                key={index}
                className="text-400 align-middle font-normal text-primary-500 hover:underline"
              >
                <Link className="flex items-center text-sm" href={url}>
                  {" "}
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* mobile menu */}
        <div className="md:hidden">
          <button
            className="rounded-md p-2 text-white outline-none focus:font-bold"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <MenuIcon className="h-8 w-8 stroke-primary-500" />
          </button>
        </div>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } absolute left-0 right-0 top-11 z-10 bg-gradient-to-t from-green-100 to-secondary-100 p-4 transition duration-300 ease-in-out animate-in `}
      >
        <ul className=" items-center justify-center space-y-8 py-6 ">
          {menu.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.url}
                className="flex w-full transform flex-row items-center space-x-3 rounded-full  font-semibold text-primary-500 duration-300 ease-in-out hover:ml-4 hover:text-secondary-100 dark:hover:text-blue-500"
              >
                {item.icon}
                <div>{item.name}</div>
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Header;
