import Link from "next/link";
import React from "react";
import { DashboardIcon, LogoIcon, LogoutIcon, MenuIcon } from "../ui/Icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ItemI {
  name: string;
  icon: React.ReactNode;
  link: string;
  permissions: string[];
}

interface PropsI {
  items: ItemI[];
  userRole: string;
  userName: string;
  userImage: string;
  companyName: string;
}

export const Sidebar = ({
  items,
  userRole,
  userName,
  userImage,
  companyName,
}: PropsI) => {
  const [open, setOpen] = React.useState(true);

  // const sidebar = document.querySelector("aside");
  // const maxSidebar = document.querySelector(".max");
  // const miniSidebar = document.querySelector(".mini");
  // const maxToolbar = document.querySelector(".max-toolbar");
  // const logo = document.querySelector(".logo");
  // const content = document.querySelector(".content");

  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const maxSidebarRef = React.useRef<HTMLDivElement>(null);
  const miniSidebarRef = React.useRef<HTMLDivElement>(null);
  const maxToolbarRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  function openNav() {
    if (open) {
      // max sidebar
      sidebarRef.current?.classList.remove("-translate-x-48");
      sidebarRef.current?.classList.add("translate-x-none");
      maxSidebarRef.current?.classList.remove("hidden");
      maxSidebarRef.current?.classList.add("flex");
      miniSidebarRef.current?.classList.remove("flex");
      miniSidebarRef.current?.classList.add("hidden");
      // maxToolbar?.classList.add("translate-x-0");
      // maxToolbar?.classList.remove("translate-x-24", "scale-x-0");
      // logo?.classList.remove("ml-12");
      // content?.classList.remove("ml-12");
      // content?.classList.add("ml-12", "md:ml-60");
    } else {
      // mini sidebar
      sidebarRef.current?.classList.add("-translate-x-48");
      sidebarRef.current?.classList.remove("translate-x-none");
      maxSidebarRef.current?.classList.add("hidden");
      maxSidebarRef.current?.classList.remove("flex");
      miniSidebarRef.current?.classList.add("flex");
      miniSidebarRef.current?.classList.remove("hidden");
      // maxToolbar?.classList.add("translate-x-24", "scale-x-0");
      // maxToolbar?.classList.remove("translate-x-0");
      // logo?.classList.add("ml-12");
      // content?.classList.remove("ml-12", "md:ml-60");
      // content?.classList.add("ml-12");
    }
    setOpen((prev) => !prev);
  }

  const hasPermissions = (permissions: string[]) => {
    if (permissions.length === 0 || permissions.includes(userRole)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <nav className="mb-2 w-full bg-white shadow md:hidden">
        <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-20 lg:max-w-7xl">
          <div>
            <div className="flex items-center justify-between py-3 md:block md:py-5">
              <Link href="#" className="">
                <p className="text-[23px] font-normal not-italic leading-[normal] text-blue-950">
                  {companyName}
                </p>
              </Link>

              <div className="md:hidden">
                <button
                  className="rounded-md p-2  outline-none focus:font-bold"
                  onClick={() => setOpen(!open)}
                >
                  <MenuIcon className="h-5 w-5 stroke-blue-950 hover:stroke-secondary-500" />
                </button>
              </div>
            </div>
          </div>
          <div className={`md:hidden ${open ? "block" : "hidden"}`}>
            <ul className=" items-center justify-center space-y-8 py-6 ">
              {items.map((item, index) => {
                if (hasPermissions(item.permissions)) {
                  return (
                    <Link
                      key={index}
                      href={item.link}
                      className="animate-fade-down text-darkGray animate-delay-100 animate-duration-1000 animate-ease-in-out flex w-full  transform flex-row items-center space-x-3  rounded-full duration-300 ease-in-out hover:ml-4 hover:text-blue-950 "
                    >
                      {item.icon}
                      <div>{item.name}</div>
                    </Link>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </nav>
      <aside
        ref={sidebarRef}
        className="fixed z-50 hidden h-screen w-60 -translate-x-48 transform bg-white transition duration-1000 ease-in-out md:flex"
      >
        <button
          onClick={openNav}
          className={`absolute right-0 top-[31px] flex w-full transform items-center ${
            open ? "justify-between" : "justify-center"
          } gap-2  transition duration-500 ease-in-out`}
        >
          {/* {!open ? <LogoIcon className="h-6 w-6 stroke-blue-950" /> : null} */}
          <p className="w-fit p-2 text-[23px] font-normal not-italic leading-[normal] text-blue-950">
            {companyName}
          </p>
          {open ? (
            <LogoIcon className="mr-2 h-8 w-8  stroke-blue-950 " />
          ) : null}
        </button>
        <div
          ref={maxSidebarRef}
          className="max mt-32 hidden h-screen w-full flex-col gap-[32px] px-[24px]"
        >
          {/* dashboard button */}
          <Link href="/dashboard">
            <Button variant="dark" shape="pill">
              <DashboardIcon className="mr-2 h-5 w-5" /> Menu Principal
            </Button>
          </Link>

          {/* text and logo */}
          <div className="flex flex-col gap-6">
            {items.map((item, index) => {
              if (hasPermissions(item.permissions)) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className="flex w-full transform flex-row items-center gap-[8px] text-[#2C2C2C] duration-300 ease-in-out  hover:text-blue-950"
                  >
                    {item.icon}
                    <div className="w-[100px]">{item.name}</div>
                  </Link>
                );
              }
            })}
          </div>
        </div>

        <div className="absolute bottom-0 mx-[24px] flex w-full flex-col">
          <div className="flex flex-col gap-4">
            <p className="text-darkGray text-sm font-medium not-italic leading-[normal]">
              Terminaste tu día?
            </p>
            <Link href="/api/auth/signout">
              <Button variant="primary">
                <LogoutIcon className="mr-2 h-5 w-5" /> Salir
              </Button>
            </Link>
          </div>
          <div className="border-t-gray -mx-[24px] mt-6 flex w-full flex-row items-center gap-4 border-t p-4">
            <div className="relative h-9 w-9 shrink-0 rounded-full">
              <Image
                src={userImage}
                fill
                objectFit="cover"
                className="rounded-full"
                alt="profile picture"
              />
            </div>
            <p className="w-[112px] text-sm font-semibold not-italic leading-[normal] text-[#2C2C2C]">
              {userName}
            </p>
            <button>
              <MenuIcon className="stroke-darkGray ml-2 h-6 w-6 hover:stroke-blue-950" />
            </button>
          </div>
        </div>

        {/* only logos */}
        <div
          ref={miniSidebarRef}
          className="mini mt-32 flex h-full w-full flex-col gap-[32px]"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <Link
              href={"/dashboard"}
              className="text-darkGray mt-4 flex w-full transform justify-end px-3 duration-300 ease-in-out "
            >
              <DashboardIcon className="fill-darkGray stroke-darkGray  h-5 w-5  hover:fill-blue-950 hover:stroke-blue-950" />
            </Link>
            {items.map((item, index) => {
              if (hasPermissions(item.permissions)) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className="text-darkGray flex w-full transform justify-end px-3 duration-300  ease-in-out  hover:text-blue-950"
                  >
                    {item.icon}
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
