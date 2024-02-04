"use client";
import React from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/logo.webp";
import {
  ArrowRightIcon,
  GalleryHorizontalEnd,
  SquareUserRound,
} from "lucide-react";

const Header = () => {
  const menu = [
    // { name: "Home", url: "/" },
    { name: "Portafolio", url: "/portfolio", icon: <GalleryHorizontalEnd /> },
    {
      name: "Contactanos",
      url: "https://wa.me/59541638",
      icon: <SquareUserRound />,
    },
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
              {menu.map(({ name, url, icon }, index) => (
                <li
                  key={index}
                  className="bg-custom-sky text-400 px-5 py-3 align-middle font-normal text-white hover:bg-blue-700 "
                >
                  <Link className="flex items-center" href={url}>
                    {" "}
                    {name} &nbsp; {icon}
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
