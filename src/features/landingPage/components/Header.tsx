"use client";
import React from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/logo.webp";
import {
  GalleryHorizontalEnd,
  SquareUserRound,
  UserIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  const menu = [
    // { name: "Home", url: "/" },
    { name: "Portafolio", url: "/portfolio", icon: <GalleryHorizontalEnd /> },
    {
      name: "Contactanos",
      url: "https://wa.me/59541638",
      icon: <SquareUserRound />,
    },
    {name: session ? "Oficina" : "Ingresa",
    url: session ? "/dashboard" : "/api/auth/signin", icon: <UserIcon /> },
  ];
  return (
    <nav className="w-full bg-transparent">
      <div className="mx-auto flex justify-between px-4 md:items-center md:px-20 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <Link href="/" className="">
              <div className="avatar">
                <div className="rounded">
                  {/* <img src="" /> */}
                  <Image className="w-[150px]" src={logo} alt="Logo Image" />
                  {/* <h1 className="text-3xl text-white font-bold">NEXT </h1> */}
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div
            className={`mt-3 flex-1 justify-self-center pb-3 hover:block md:mt-0 md:block md:pb-0 lg:mt-8`}
          >
            <ul className="items-center justify-center  md:flex md:space-x-6 md:space-y-0">
              {menu.map(({ name, url }, index) => (
                <li
                  key={index}
                  className="text-400 align-middle font-normal text-primary-500 hover:underline"
                >
                  <Link className="flex items-center" href={url}>
                    {" "}
                    {name} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
