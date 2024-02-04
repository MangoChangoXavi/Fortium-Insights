import React from "react";
import Image from "next/image";

import Link from "next/link";
import logo from "../assets/images/logo.webp";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "lucide-react";
import { WhatsAppIcon } from "~/components/system/ui/Icons";

const Footer = () => {
  // const menu = [

  //     { name: "Contact us", url: "/#contact" },
  //   ];
  return (
    <>
      <div id="contact" className="footer-bg relative pt-14">
        <div className="pb-14 sm:px-10   lg:px-20">
          <div className="m-5 flex flex-col sm:grid md:grid-cols-2 xl:grid-cols-2 ">
            <div className="relative my-auto text-start">
              <div className="mb-4 rounded">
                {/* <img src="" /> */}
                <Image className="w-[170px]" src={logo} alt="Logo Image" />
                {/* <h1 className="text-3xl text-white font-bold">NEXT </h1> */}
              </div>

              <p className="mb-5 text-[16px] font-medium leading-6 text-gray-600">
                ¡Techos Digitales es una solucion integral para que las empresas
                <br /> de bienes raices obtengan soluciones y software
                personalizados
                <br /> para sus negocios!
              </p>
            </div>
            <div className="relative text-start">
              <div className="relative ms-auto pt-5 text-start lg:w-3/5">
                <h4 className="mb-5 text-[24px] font-medium leading-8 text-gray-800 lg:text-[32px]">
                  Contactanos
                </h4>
                <p className="mb-5 text-[16px] font-normal leading-5 text-gray-400">
                  <Link target="_blank" href={"mailto:milkyware@hotmail.com"}>
                    milkyware@hotmail.com
                  </Link>
                </p>
                <p className="mb-4 text-[16px] font-normal leading-5 text-gray-400">
                  Ciudad de Guatemala, Guatemala, Centro America
                </p>
                <div className="social-icons flex justify-between px-10 text-gray-400">
                  <Link
                    className="text-[30px]"
                    href={"https://twitter.com/TechosDigitales"}
                  >
                    <XIcon />
                  </Link>
                  <Link
                    className="text-[30px]"
                    href={"https://www.linkedin.com/company/techos-digitales"}
                  >
                    <LinkedinIcon />
                  </Link>
                  <Link className="text-[26px]" href={"#"}>
                    <FacebookIcon />
                  </Link>
                  <Link className="text-[28px]" href={"#"}>
                    <InstagramIcon />
                  </Link>
                  <Link className="text-[28px]" href={"https://wa.me/59541638"}>
                    <WhatsAppIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
