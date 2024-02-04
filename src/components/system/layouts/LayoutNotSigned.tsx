import React from "react";
import Footer from "~/features/landing/components/Footer";
import Navbar from "~/features/landing/components/Navbar";
import TopHeader from "~/features/landing/components/Topbar";

export const LayoutNotSigned = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* <Hero/> */}
      <TopHeader />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
