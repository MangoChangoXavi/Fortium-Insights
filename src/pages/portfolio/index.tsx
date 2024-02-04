import Image from "next/image";
import Link from "next/link";
import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import { projects } from "~/data/projects";

export default function Portfolio() {
  return (
    <>
      <Header />
      <div className="px-12 md:px-[120px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-[42px] font-bold tracking-normal text-black opacity-100">
              Nuestro Trabajo
            </h1>
            <p className="text-center text-[16px] tracking-normal text-gray-500">
              Trabajo inteligente en nuestro negocio
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative rounded-xl border-inherit px-6 py-8 text-start shadow"
              >
                <Link href={`portfolio/${project.id}`}>
                  <div className="relative h-40 md:h-80">
                    <Image
                      src={project.cover}
                      alt="house image"
                      objectFit="cover"
                      fill
                      className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
