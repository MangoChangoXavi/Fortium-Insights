import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { PageNotFound } from "~/components/system/layouts/PageNotFound";
import { LoadingPage } from "~/components/system/layouts/Loader";
import { addDays } from "~/utils/functions";
import ProposalIllustration1 from "~/assets/svg/ProposalIllustration1.svg";
import ProposalIllustration2 from "~/assets/svg/ProposalIllustration2.svg";
import ProposalIllustration3 from "~/assets/svg/ProposalIllustration3.svg";
import ProposalIllustration4 from "~/assets/svg/ProposalIllustration4.svg";

import Image from "next/image";
import Link from "next/link";
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Proposal(props: PageProps) {
  const { data: proposal, isLoading } = api.proposal.read.useQuery({
    identifier: props.proposalIdentifier,
  });
  if (!proposal) return <PageNotFound />;
  if (isLoading) return <LoadingPage />;
  return (
    <>
      {/* <Hero/> */}
      <section className="w-100 relative   bg-cover bg-center bg-no-repeat">
        <Header />
        <div className="relative mx-auto max-w-screen-xl px-4 pt-24 sm:px-10 lg:px-20">
          <div className=" mx-auto mb-5 w-full text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-bold sm:text-7xl ">
              Propuesta de
              <span className="text-custom-green">&nbsp;Proyecto&nbsp;</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-center text-gray-500  sm:text-xl/relaxed">
              Gracias por tu interes en nosotros, te presentamos nuestra
              propuesta de una forma profesional para darte el mejor servicio
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-16 px-6 py-12 md:px-[120px]">
        <h2 className="text-3xl font-bold sm:text-5xl ">{proposal.title}</h2>
        {/* brief */}
        <div className="flex h-full flex-col lg:flex-row">
          <div className="my-1 flex w-full flex-col gap-2 lg:w-1/2">
            <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
              Resumen
            </h3>
            <p className="text-gray-500  sm:text-xl/relaxed">
              Estimado/as Lectores, Nos complace presentarle nuestra oferta
              económica para proporcionar servicios de software a{" "}
              {proposal.client}, una empresa líder en el sector de bienes
              raíces. En Techos Digitales, comprendemos la importancia de las
              soluciones tecnológicas eficientes y personalizadas para optimizar
              las operaciones y mejorar la experiencia del cliente en la
              industria inmobiliaria. Estamos seguros de que nuestros servicios
              serán de gran valor para su empresa.
            </p>
          </div>
          <div className="bottom-0 top-0 m-auto hidden w-full grow lg:block lg:w-1/2">
            <div className="relative h-96">
              <Image
                src={ProposalIllustration4}
                alt="Proposal Illustration"
                fill
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        {/* services */}
        <div className="flex h-full flex-col lg:flex-row">
          <div className="bottom-0 top-0 m-auto hidden w-full grow lg:block lg:w-1/2">
            <div className="relative h-80">
              <Image
                src={ProposalIllustration2}
                alt="Proposal Illustration"
                fill
                objectFit="contain"
              />
            </div>
          </div>
          <div className="my-1 flex w-full flex-col gap-2 lg:w-1/2">
            <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
              Descripcion de los Servicios
            </h3>
            <p className="text-gray-500  sm:text-xl/relaxed ">
              Nuestro equipo de expertos en software se compromete a
              proporcionar soluciones personalizadas y de alta calidad para
              satisfacer las necesidades específicas de {proposal.client}. Los
              servicios que ofrecemos incluyen, pero no se limitan a:
            </p>
            {proposal.proposalServices.map((service, index) => (
              <div key={index} className="my-1 flex flex-col gap-1">
                <h4 className="text-fourth-color  text-[20px] font-medium leading-8">
                  {index + 1}. {service.title}
                </h4>
                <p className="text-gray-500  sm:text-xl/relaxed ">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* terms and conditions */}
        <div className="flex h-full flex-col lg:flex-row">
          <div className="my-1 flex flex-col gap-4 lg:w-1/2">
            <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
              Terminos y condiciones
            </h3>
            <div className="my-1 flex flex-col gap-1">
              <h4 className="text-fourth-color  text-[20px] font-medium leading-8">
                Condiciones de Pago
              </h4>
              <p className="text-gray-500  sm:text-xl/relaxed">
                <span className="text-fourth-color  text-[16px] leading-8">
                  1. Pago Inicial
                  <br />
                </span>
                Se requiere un pago inicial el cual el link encontrara adjunto
                al final de la propuesta al iniciar el proyecto para cubrir los
                costos iniciales y asegurar nuestros servicios para su empresa.
                <br />
                <br />
                <span className="text-fourth-color  text-[16px] leading-8">
                  2. Plazo de pago
                  <br />
                </span>
                Se dara el restante 50% al finalizar el proyecto con todas las
                revisiones debidas para garantizar la mejor calidad, en caso se
                requiera una mejora continua para este proyecto con
                actualizaciones semanales los pagos se realizarán dentro de los
                últimos días de cada mes a partir de la fecha de emisión de la
                factura correspondiente a cada pago y serán por el monto de
                $600, y se recibiran actualizaciones semanales en el software.
                <br />
                <br />
                <span className="text-fourth-color  text-[16px]  leading-8">
                  3. Metodos de pago
                  <br />
                </span>
                Aceptamos pagos mediante nuestra pasarela de pago. Nosotros nos
                encargaremos de proporcionar los enlaces correspondientes para
                los pagos acordados en el proyecto.
              </p>
            </div>
            <div className="my-2 flex flex-col gap-1">
              <h4 className="text-fourth-color  text-[20px] font-medium leading-8">
                Duracion del Proyecto
              </h4>
              <p className="text-gray-500  sm:text-xl/relaxed">
                El proyecto se completará en un plazo estimado de los meses
                requeridos por el cliente a partir del inicio del desarrollo,
                sujeto a cambios según las necesidades específicas del proyecto.
              </p>
            </div>
          </div>
          <div className="bottom-0 top-0 m-auto hidden w-full grow lg:block lg:w-1/2">
            <div className="relative h-80">
              <Image
                src={ProposalIllustration1}
                alt="Proposal Illustration"
                fill
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col lg:flex-row">
          <div className="bottom-0 top-0 m-auto hidden w-full grow lg:block lg:w-1/2">
            <div className="relative h-96">
              <Image
                src={ProposalIllustration3}
                alt="Proposal Illustration"
                fill
                objectFit="contain"
              />
            </div>
          </div>
          <div className="my-1 flex w-full flex-col gap-2 lg:w-1/2">
            <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
              Aceptacion de la oferta
            </h3>
            <p className="text-gray-500  sm:text-xl/relaxed">
              Esta oferta es válida hasta el{" "}
              {addDays(proposal.createdAt, 5).toDateString()}. Y para aceptarla
              se necesitara la validacion del link del pago siguiente:{" "}
              <Link
                href={proposal.paymentLink}
                className="cursor-pointer font-semibold text-blue-500 hover:underline"
              >
                Aqui
              </Link>
              <br />
              <br />
              Agradecemos la oportunidad de presentar nuestra propuesta y
              esperamos poder trabajar juntos para llevar a {proposal.client} al
              siguiente nivel en términos de eficiencia operativa y satisfacción
              del cliente. No dude en ponerse en contacto con nosotros para
              discutir cualquier detalle adicional o para programar una reunión
              para aclarar cualquier pregunta que pueda tener.
              <br />
              <br />
              Atentamente,
              <br />
              Javier Monterroso
              <br />
              Fundador y CEO
              <br />
              jvmonteros98@gmail.com
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

// Fetch data before the page loads
export const getStaticProps = (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const slug = ctx.params?.slug as string;

  if (!slug) throw new Error("No slug provided");

  const proposalIdentifier = slug;

  helpers.proposal.read
    .prefetch({ identifier: proposalIdentifier })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      proposalIdentifier,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
