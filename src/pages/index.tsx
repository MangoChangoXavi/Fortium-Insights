import React from "react";
import LogoSvg from "~/assets/svg/logo.svg";
import PersonImage from "~/assets/img/person.png";
import StatsImageSvg from "~/assets/svg/stats.svg";
import GrowthSvg from "~/assets/svg/growth.svg";
import ChatSvg from "~/assets/svg/chat.svg";
import BoxSvg from "~/assets/svg/box.svg";
import StarSvg from "~/assets/svg/star.svg";
import Image from "next/image";
import { LandingArrowIcon } from "~/components/system/ui/Icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoadingPage } from "~/components/system/layouts/Loader";
import { Footer } from "~/components/template/layouts/Footer";

const HeroCTA = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="col-span-1 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image className="h-[59px] w-[203px]" src={LogoSvg} alt="logo" />
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="w-[527px] text-center text-[25px] font-bold text-[#093061]">
            Get real time recommendations from others experts in Fortium
          </h1>
          <button
            className="group flex cursor-pointer items-center gap-3"
            onClick={handleClick}
          >
            <h2 className="text-xl font-medium text-indigo-400 transition duration-150 ease-out group-hover:text-indigo-500">
              Sign in with your google account
            </h2>
            <LandingArrowIcon className="h-4 w-4 fill-indigo-400 stroke-indigo-400 transition duration-150 ease-out group-hover:translate-x-2 group-hover:fill-indigo-500 group-hover:ease-in" />
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroImage = () => {
  return (
    <div className="relative col-span-1 h-screen overflow-hidden bg-[#466488]">
      {/* person background */}
      <div className="absolute -bottom-10 left-0 right-0 mx-auto h-[322.92px] w-[322.92px] -rotate-45 rounded-[50px] bg-slate-400/40" />
      {/* growth image */}
      <div className="floating pointer-events-none absolute bottom-24 right-24">
        <Image src={GrowthSvg} alt="growth image" />
      </div>
      {/* person image */}
      <Image
        className="pointer-events-none absolute -bottom-28 left-0 right-0 mx-auto "
        src={PersonImage}
        alt="person image"
      />
      {/* stats image */}
      <div className="floating pointer-events-none absolute bottom-0 left-40">
        <Image src={StatsImageSvg} alt="stats image" />
      </div>
      {/* chat image */}
      <div className="floating pointer-events-none absolute bottom-80 left-40">
        <Image src={ChatSvg} alt="chat image" />
      </div>
      {/* box image */}
      <div className="floating pointer-events-none absolute bottom-[400px] right-64">
        <Image src={BoxSvg} alt="box image" />
      </div>
      {/* star image */}
      <div className="floating pointer-events-none absolute bottom-72 right-24">
        <Image src={StarSvg} alt="star image" />
      </div>
      {/* small background */}
      <div className="absolute bottom-[420px] right-10 h-[100px] w-[100px] -rotate-45 rounded-[30px] bg-slate-400/40" />
    </div>
  );
};

const LandingHero = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <section className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
      <HeroImage />
      <HeroCTA handleClick={handleClick} />
    </section>
  );
};

export default function Index() {
  const router = useRouter();
  const { data: session, status } = useSession();
  // wait to load the session
  if (status === "loading") return <LoadingPage />;
  if (session) {
    void router.push("/dashboard");
    return <LoadingPage />;
  }

  const handleClick = () => signIn("google");
  return (
    <>
      <LandingHero handleClick={handleClick} />
    </>
  );
}
