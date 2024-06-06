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

const LandingFooter = () => {
  return (
    <div className="h-fit w-full bg-blue-950 p-8">
      <div className="w-[1215px]">
        <span className="font-['Noto Sans JP'] text-base font-bold text-neutral-300">
          Elevate Your Decision-Making with Trusted Recommendations From Your
          Own Partners
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          At{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-yellow-500">
          Fortium Partners
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          , we understand that making informed technology decisions is crucial
          for your clients’ success. <br />
          That’s why we've developed the{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-sky-400">
          CTO Insights Platform <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-base font-bold text-neutral-300">
          Streamlined Recommendations
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          As a CTO, you’re constantly navigating a complex landscape of
          technology services and solutions to find the best fit for your
          clients’ needs. <br />
          The{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-sky-400">
          CTO Insights Platform
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          {" "}
          gives you direct access to other{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-yellow-500">
          Fortium Partners
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          ’ experiences with technology service providers.
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-base font-bold text-neutral-300">
          Getting Started is Easy
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          To get the most out of the{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-sky-400">
          CTO Insights Platform
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          , simply log in with your{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-yellow-500">
          Fortium Partners
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          {" "}
          account. <br />
          Once logged in, you can:
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          Start recording personal experiences and interactions with technology
          service providers that you may want to share with other{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-yellow-500">
          Fortium Partners
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          Access the reviews and experiences of other{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-yellow-500">
          Fortium Partners
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          {" "}
          to help you with your specific technology needs at your current client
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-base font-bold text-neutral-300">
          Your Technology Partner, Every Step of the Way
          <br />
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          At{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-yellow-500">
          Fortium Partners
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          , we are committed to supporting your journey as a technology leader.{" "}
          <br />
          Our{" "}
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-sky-400">
          CTO Insights Platform
        </span>
        <span className="font-['Noto Sans JP'] text-sm font-medium text-white">
          {" "}
          is intended to be more than just a tool—it’s a community-driven
          ecosystem designed to help you make the best technology decisions for
          your clients.
          <br />
        </span>
      </div>
    </div>
  );
};

const HeroText = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="font-['Noto Sans JP'] w-[527px] text-center text-[25px] font-bold text-blue-950">
        Get real time recommendations from others experts in Fortium
      </h1>
      <span className="group flex cursor-pointer items-center gap-3 ">
        <h2 className="font-['Noto Sans JP'] text-xl font-medium text-indigo-400">
          Sign in with your google account
        </h2>
        <LandingArrowIcon className="h-4 w-4 fill-indigo-400 stroke-indigo-400  group-hover:translate-x-2" />
      </span>
    </div>
  );
};

const LandingHero = () => {
  return (
    <section className="grid grid-cols-2">
      <div className="relative col-span-1 h-[80vh] overflow-hidden bg-[#093161a3]">
        {/* person background */}
        <div className="absolute -bottom-10 left-0 right-0 mx-auto h-[322.92px] w-[322.92px] -rotate-45 rounded-[50px] bg-slate-400/40" />
        {/* growth image */}
        <div className="pointer-events-none absolute bottom-20 right-24">
          <Image src={GrowthSvg} alt="growth image" />
        </div>
        {/* person image */}
        <Image
          className="pointer-events-none absolute -bottom-2 left-0 right-0 mx-auto h-[324px] w-[398px]"
          src={PersonImage}
          alt="person image"
        />
        {/* stats image */}
        <div className="pointer-events-none absolute bottom-0 left-40">
          <Image src={StatsImageSvg} alt="stats image" />
        </div>
        {/* chat image */}
        <div className="pointer-events-none absolute bottom-80 left-40">
          <Image src={ChatSvg} alt="chat image" />
        </div>
        {/* box image */}
        <div className="pointer-events-none absolute bottom-[400px] right-64">
          <Image src={BoxSvg} alt="box image" />
        </div>
        {/* star image */}
        <div className="pointer-events-none absolute bottom-72 right-24">
          <Image src={StarSvg} alt="star image" />
        </div>
        {/* small background */}
        <div className="absolute bottom-[420px] right-10 h-[100px] w-[100px] -rotate-45 rounded-[30px] bg-slate-400/40" />
      </div>
      <div className="col-span-1 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image className="h-[59px] w-[203px]" src={LogoSvg} alt="logo" />
          <HeroText />
        </div>
      </div>
    </section>
  );
};

export default function Index() {
  return (
    <>
      <LandingHero />
      <LandingFooter />
    </>
  );
}
