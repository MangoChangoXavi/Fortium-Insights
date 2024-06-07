import { MousePointerSquare, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoSvg from "~/assets/svg/logo.svg";
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
  return (
    <div onMouseLeave={() => setHoverOptions(false)}>
      {/* topbar */}
      <div
        className={`relative flex h-[60px] w-full ${
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
        <div className="absolute left-0 right-0 mx-auto inline-flex h-full items-center justify-center gap-8">
          <MousePointerSquare
            onMouseEnter={() => setHoverOptions(true)}
            className="cursor-pointer text-white transition duration-150 ease-in-out hover:scale-110"
          >
            Options
          </MousePointerSquare>
          <div className="relative h-[26px] w-[400px]">
            <input
              className="absolute left-[24px] top-0  w-[148px] border-none bg-transparent text-sm font-medium text-white outline-none"
              placeholder="Search"
            />
            <div className="absolute left-0 top-[26px] h-px w-[400px] bg-white" />
            <SearchIcon className="absolute left-[2px] top-[4px] h-[12px] w-[12px] stroke-gray-200" />
          </div>
        </div>
        {/* right items */}
        <div className="absolute bottom-0 right-[32px] top-0 my-auto flex items-center gap-2">
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
      </div>
      {/* overlay */}
      {hoverOptions && (
        <div className="fixed top-[60px] z-20 h-fit w-full bg-slate-950 p-16">
          <div className="inline-flex h-[95px] w-[348px] items-start justify-start gap-[72px]">
            <div className="inline-flex flex-col items-start justify-start gap-4">
              <div className="font-['Noto Sans JP'] text-[17px] font-bold text-white">
                Pages
              </div>
              <div className="flex flex-col items-start justify-start gap-2">
                <Link
                  href={"/dashboard"}
                  className="font-['Noto Sans JP'] text-base font-normal text-white hover:underline"
                >
                  Dashboard
                </Link>
                <Link
                  href={"/reports/users"}
                  className="font-['Noto Sans JP'] text-base font-normal text-white hover:underline"
                >
                  Users administration
                </Link>
              </div>
            </div>
            <div className="inline-flex flex-col items-start justify-start gap-4">
              <div className="font-['Noto Sans JP'] text-[17px] font-bold text-white">
                Actions
              </div>
              <div className="flex flex-col items-start justify-start gap-2">
                <button className="font-['Noto Sans JP'] text-base font-normal text-white hover:underline">
                  Add new vendor{" "}
                </button>
                <button
                  onClick={handleClickSignOut}
                  className="font-['Noto Sans JP'] text-base font-normal text-white hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
