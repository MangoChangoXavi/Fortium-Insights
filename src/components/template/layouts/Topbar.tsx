import { MenuIcon, MousePointerSquare, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoSvg from "~/assets/svg/logo.svg";
import { Debouncer } from "~/components/system/ui/Debouncer";
import { useSearchStore } from "~/stores/useSearchStore";
import { AddVendorDialog } from "../ui/AddVendorDialog";
import { useSession } from "next-auth/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export const Topbar = ({
  profileImgUrl,
  handleClickSignOut,
}: {
  profileImgUrl: string;
  handleClickSignOut: () => void;
}) => {
  /**
   * Represents the state of hover options in the topbar.
   */
  const [hoverOptions, setHoverOptions] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // session
  const session = useSession();
  const userRole = session.data?.user?.role;

  // zustand state
  const { search, setSearch } = useSearchStore();

  return (
    <Dialog open={open}>
      <div onMouseLeave={() => setHoverOptions(false)}>
        {/* topbar */}
        <div
          className={`relative flex h-[60px] w-full transition-colors duration-100 ease-in-out ${
            hoverOptions ? "bg-slate-950" : "bg-[#466488]"
          }`}
        >
          {/* logo */}
          <div
            onMouseEnter={() => setHoverOptions(false)}
            className="absolute bottom-0 left-0 top-0 z-10 my-auto flex h-full w-[203px] cursor-pointer items-center justify-center bg-white"
          >
            <Link href="/dashboard">
              <Image className="h-10 cursor-pointer" src={LogoSvg} alt="Logo" />
            </Link>
          </div>
          {/* center items */}
          <div className="absolute left-0 right-0 mx-auto hidden h-full items-center justify-center gap-8 lg:inline-flex">
            <MousePointerSquare
              onMouseEnter={() => setHoverOptions(true)}
              className="cursor-pointer text-white transition duration-150 ease-in-out hover:scale-110"
            >
              Options
            </MousePointerSquare>
            <Debouncer
              value={search}
              setValue={setSearch}
              placeholder="Search"
              icon={
                <SearchIcon className="h-[12px] w-[12px] stroke-gray-200" />
              }
            />
          </div>
          {/* right items */}
          <div className="absolute bottom-0 right-[32px] top-0 my-auto hidden items-center gap-2 lg:flex">
            {/* profile picture */}
            <div className="relative ">
              <Image
                className="h-[33px] w-[33px] rounded-full"
                src={profileImgUrl}
                alt="Profile Picture"
                width={33}
                height={33}
              />
              <div className="absolute right-0 top-0 h-1 w-1 rounded-full bg-green-500" />
            </div>
          </div>
          {/* hamburger */}
          <div className="absolute bottom-0 right-[32px] top-0 my-auto flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setHoverOptions((prev) => !prev)}
              className="flex items-center justify-center"
            >
              <MenuIcon className="h-[24px] w-[24px] text-white transition duration-150 ease-in-out hover:scale-110" />
            </button>
          </div>
        </div>
        {/* overlay */}
        {hoverOptions && (
          <div className="topbar-overlay absolute top-[60px] z-20 h-fit w-full bg-slate-950 p-16">
            <div className="inline-flex h-fit w-full items-start justify-start gap-[72px]">
              {userRole === "admin" && (
                <div className="inline-flex flex-col items-start justify-start gap-4">
                  <div className="text-[17px] font-bold text-white">Pages</div>
                  <div className="flex flex-col items-start justify-start gap-2">
                    <Link
                      href={"/dashboard"}
                      className="text-base font-normal text-white hover:underline"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={"/reports/users"}
                      className="text-base font-normal text-white hover:underline"
                    >
                      Users
                    </Link>
                    <Link
                      href={"/reports/vendors"}
                      className="text-base font-normal text-white hover:underline"
                    >
                      Vendors
                    </Link>
                    <Link
                      href={"/reports/categories"}
                      className="text-base font-normal text-white hover:underline"
                    >
                      Categories
                    </Link>
                  </div>
                </div>
              )}
              <div className="inline-flex flex-col items-start justify-start gap-4">
                <div className="text-[17px] font-bold text-white">Actions</div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full text-base font-normal text-white hover:underline"
                  >
                    Add new vendor{" "}
                  </button>
                  <button
                    onClick={handleClickSignOut}
                    className="text-base font-normal text-white hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AddVendorDialog setOpen={setOpen} />
    </Dialog>
  );
};
