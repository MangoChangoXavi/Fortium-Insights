import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import logo from "~/features/landingPage/assets/images/logo.webp";
import Image from "next/image";

export default function Proposal() {
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
      <section className="flex flex-col gap-4 px-12 md:px-[120px]">
        <div className="flex flex-col">
          <Image className="w-[100px]" src={logo} alt="Logo Image" />
          <p className="text-gray-500  sm:text-xl/relaxed">+ (502) 5954 1638</p>
          <p className="text-gray-500  sm:text-xl/relaxed">
            jvmonteros98@gmail.com
          </p>
          <p className="text-gray-500  sm:text-xl/relaxed">20/Diciembre/2024</p>
        </div>
        <h2 className="text-3xl font-bold sm:text-5xl ">Nombre del proyecto</h2>
        <div className="my-1 flex flex-col gap-2">
          <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
            Resumen
          </h3>
          <p className="text-gray-500  sm:text-xl/relaxed lg:w-2/3">
            Estimado/as Lectores, Nos complace presentarle nuestra oferta
            económica para proporcionar servicios de software a [Nombre del
            cliente], una empresa líder en el sector de bienes raíces. En Techos
            Digitales, comprendemos la importancia de las soluciones
            tecnológicas eficientes y personalizadas para optimizar las
            operaciones y mejorar la experiencia del cliente en la industria
            inmobiliaria. Estamos seguros de que nuestros servicios serán de
            gran valor para su empresa.
          </p>
        </div>
        <div className="my-1 flex flex-col gap-2">
          <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
            Descripcion de los Servicios
          </h3>
          <p className="text-gray-500  sm:text-xl/relaxed lg:w-2/3">
            Nuestro equipo de expertos en software se compromete a proporcionar
            soluciones personalizadas y de alta calidad para satisfacer las
            necesidades específicas de [Nombre del cliente]. Los servicios que
            ofrecemos incluyen, pero no se limitan a:
          </p>
          <div className="my-1 flex flex-col gap-1">
            <h4 className="text-fourth-color  text-[20px] font-medium leading-8">
              1. Servicio
            </h4>
            <p className="text-gray-500  sm:text-xl/relaxed lg:w-2/3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
              ad, quo fuga dolores eius sunt suscipit quam et natus ipsa? Eaque
              at labore magnam, expedita provident molestiae iusto reprehenderit
              fuga! Nostrum, ea fugiat, eligendi ipsa at nesciunt nisi soluta
              dolores repellat maxime dolor asperiores pariatur libero quo natus
              sequi, repudiandae aperiam omnis. Labore in voluptatum aspernatur
              repellendus dolor, nulla pariatur. Esse sit optio veniam maiores,
              ex tempora itaque, voluptas beatae aliquid recusandae, eveniet
              facilis officia minima iste corporis dolorem quam commodi.
              Expedita natus recusandae excepturi modi tenetur magni laudantium
              autem. Sint fugiat ipsa suscipit minus tenetur beatae, saepe at
              doloremque rerum totam dignissimos vel earum, dolore, quam sunt
              est hic nesciunt illo nisi quae enim. Autem ipsum sint voluptatum
              assumenda. Eos cupiditate odit excepturi tempora laboriosam
              temporibus maxime accusamus consectetur earum dignissimos
              quibusdam dicta quia doloribus illum vel aliquid quas voluptate,
              facilis minus ea! Voluptates voluptatem minus perferendis
              voluptatibus magnam.
            </p>
          </div>
        </div>
        <div className="my-1 flex flex-col gap-2">
          <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
            Terminos y condiciones
          </h3>
          <div className="my-1 flex flex-col gap-1">
            <h4 className="text-fourth-color  text-[20px] font-medium leading-8">
              Condiciones de Pago
            </h4>
            <p className="text-gray-500  sm:text-xl/relaxed lg:w-2/3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
              ad, quo fuga dolores eius sunt suscipit quam et natus ipsa? Eaque
              at labore magnam, expedita provident molestiae iusto reprehenderit
              fuga! Nostrum, ea fugiat, eligendi ipsa at nesciunt nisi soluta
              dolores repellat maxime dolor asperiores pariatur libero quo natus
              sequi, repudiandae aperiam omnis. Labore in voluptatum aspernatur
              repellendus dolor, nulla pariatur. Esse sit optio veniam maiores,
              ex tempora itaque, voluptas beatae aliquid recusandae, eveniet
              facilis officia minima iste corporis dolorem quam commodi.
              Expedita natus recusandae excepturi modi tenetur magni laudantium
              autem. Sint fugiat ipsa suscipit minus tenetur beatae, saepe at
              doloremque rerum totam dignissimos vel earum, dolore, quam sunt
              est hic nesciunt illo nisi quae enim. Autem ipsum sint voluptatum
              assumenda. Eos cupiditate odit excepturi tempora laboriosam
              temporibus maxime accusamus consectetur earum dignissimos
              quibusdam dicta quia doloribus illum vel aliquid quas voluptate,
              facilis minus ea! Voluptates voluptatem minus perferendis
              voluptatibus magnam.
            </p>
          </div>
          <div className="my-1 flex flex-col gap-1">
            <h4 className="text-fourth-color  text-[20px] font-medium leading-8">
              Duracion del Proyecto
            </h4>
            <p className="text-gray-500  sm:text-xl/relaxed lg:w-2/3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
              ad, quo fuga dolores eius sunt suscipit quam et natus ipsa? Eaque
              at labore magnam, expedita provident molestiae iusto reprehenderit
              fuga! Nostrum, ea fugiat, eligendi ipsa at nesciunt nisi soluta
              dolores repellat maxime dolor asperiores pariatur libero quo natus
              sequi, repudiandae aperiam omnis. Labore in voluptatum aspernatur
              repellendus dolor, nulla pariatur. Esse sit optio veniam maiores,
              ex tempora itaque, voluptas beatae aliquid recusandae, eveniet
              facilis officia minima iste corporis dolorem quam commodi.
              Expedita natus recusandae excepturi modi tenetur magni laudantium
              autem. Sint fugiat ipsa suscipit minus tenetur beatae, saepe at
              doloremque rerum totam dignissimos vel earum, dolore, quam sunt
              est hic nesciunt illo nisi quae enim. Autem ipsum sint voluptatum
              assumenda. Eos cupiditate odit excepturi tempora laboriosam
              temporibus maxime accusamus consectetur earum dignissimos
              quibusdam dicta quia doloribus illum vel aliquid quas voluptate,
              facilis minus ea! Voluptates voluptatem minus perferendis
              voluptatibus magnam.
            </p>
          </div>
        </div>
        <div className="my-1 flex flex-col gap-2">
          <h3 className="text-dark mb-5 text-[24px]  font-semibold leading-7">
            Aceptacion de la oferta
          </h3>
          <p className="text-gray-500  sm:text-xl/relaxed lg:w-2/3">
            Esta oferta es válida hasta el 25 de Octubre del 2023. Para aceptar
            nuestra oferta, por favor, firme este documento y devuélvelo a más
            tardar el 25 de Octubre del 2023.
            <br />
            <br />
            Agradecemos la oportunidad de presentar nuestra propuesta y
            esperamos poder trabajar juntos para llevar a Multinversiones
            Inteligentes al siguiente nivel en términos de eficiencia operativa
            y satisfacción del cliente. No dude en ponerse en contacto con
            nosotros para discutir cualquier detalle adicional o para programar
            una reunión para aclarar cualquier pregunta que pueda tener.
            <br />
            <br />
            Atentamente,
            <br />
            Javier Monterroso
            <br />
            Ingeniero de Software
            <br />
            jvmonteros98@gmail.com
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
