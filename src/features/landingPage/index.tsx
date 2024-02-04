import React from "react";
import Header from "./components/Header";

import Banner from "./components/Banner";
import logo from "../assets/images/top-bg.jpg";
import Softwares from "./components/Softwares";
import WhyUs from "./components/WhyUs";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import { Customers } from "./components/Customers";

export const Landing = () => {
  return (
    <>
      {/* <Hero/> */}
      <section className="w-100 relative bg-[url(/mask-2.webp)]  bg-cover bg-center bg-no-repeat">
        <Header />
        <Banner />
      </section>
      <Softwares />
      <WhyUs />
      <Customers />
      <Cta />
      <Footer />
    </>
  );
};
