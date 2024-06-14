import React from "react";

export const Footer = ({ isLarge = false }: { isLarge?: boolean }) => {
  return (
    <div className="h-fit w-full bg-[#093061] p-8">
      <span className="text-base font-bold text-neutral-300">
        Elevate Your Decision-Making w ith Trusted Recommendations From Your Own
        Partners
        <br />
      </span>
      <span className="text-sm font-medium text-white">- At </span>
      <span className="text-sm font-medium text-yellow-500">
        Fortium Partners
      </span>
      <span className="text-sm font-medium text-white">
        , we understand that making informed technology decisions is crucial for
        your clients&apos; success. <br />- That&apos;s why we&apos;ve developed
        the{" "}
      </span>
      <span className="text-sm font-medium text-sky-400">
        CTO Insights Platform <br />
      </span>
      <span className="text-sm font-medium text-white">
        <br />
      </span>
      <span className="text-base font-bold text-neutral-300">
        Streamlined Recommendations
        <br />
      </span>
      <span className="text-sm font-medium text-white">
        - As a CTO, you&apos;re constantly navigating a complex landscape of
        technology services and solutions to find the best fit for your
        clients&apos; needs. <br />- The{" "}
      </span>
      <span className="text-sm font-medium text-sky-400">
        CTO Insights Platform
      </span>
      <span className="text-sm font-medium text-white">
        {" "}
        gives you direct access to other{" "}
      </span>
      <span className="text-sm font-medium text-yellow-500">
        Fortium Partners
      </span>
      <span className="text-sm font-medium text-white">
        &apos; experiences with technology service providers.
        <br />
      </span>
      <span className="text-sm font-medium text-white">
        <br />
      </span>
      {isLarge && (
        <>
          <span className="text-base font-bold text-neutral-300">
            Getting Started is Easy
            <br />
          </span>
          <span className="text-sm font-medium text-white">
            - To get the most out of the{" "}
          </span>
          <span className="text-sm font-medium text-sky-400">
            CTO Insights Platform
          </span>
          <span className="text-sm font-medium text-white">
            , simply log in with your{" "}
          </span>
          <span className="text-sm font-medium text-yellow-500">
            Fortium Partners
          </span>
          <span className="text-sm font-medium text-white">
            {" "}
            account. <br />
            - Once logged in, you can:
            <br />
          </span>
          <span className="text-sm font-medium text-white">
            &emsp;- Start recording personal experiences and interactions with
            technology service providers that you may want to share with other{" "}
          </span>
          <span className="text-sm font-medium text-yellow-500">
            Fortium Partners
            <br />
          </span>
          <span className="text-sm font-medium text-white">
            &emsp;- Access the reviews and experiences of other{" "}
          </span>
          <span className="text-sm font-medium text-yellow-500">
            Fortium Partners
          </span>
          <span className="text-sm font-medium text-white">
            {" "}
            to help you with your specific technology needs at your current
            client
            <br />
          </span>
          <span className="text-sm font-medium text-white">
            <br />
          </span>
          <span className="text-base font-bold text-neutral-300">
            Your Technology Partner, Every Step of the Way
            <br />
          </span>
          <span className="text-sm font-medium text-white">- At </span>
          <span className="text-sm font-medium text-yellow-500">
            Fortium Partners
          </span>
          <span className="text-sm font-medium text-white">
            , we are committed to supporting your journey as a technology
            leader. <br />- Our{" "}
          </span>
          <span className="text-sm font-medium text-sky-400">
            CTO Insights Platform
          </span>
          <span className="text-sm font-medium text-white">
            {" "}
            is intended to be more than just a tool—it&apos;s a community-driven
            ecosystem designed to help you make the best technology decisions
            for your clients.
            <br />
          </span>
        </>
      )}
    </div>
  );
};
