import React from "react";
import { LayoutNotSigned } from "~/components/system/layouts/LayoutNotSigned";

export default function Services() {
  return (
    <LayoutNotSigned>
      <section className="py-8">
        <div className="container mx-auto">
          <div className="mx-auto p-4 text-center md:px-10 lg:px-32 xl:max-w-5xl">
            <h2 className="leadi text-2xl font-bold text-primary-800 sm:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="my-4 px-8 text-black">
              En Tu Asesor Inmobiliario estamos comprometidos con proporcionar
              servicios integrales que hagan que la experiencia de adquirir tu
              lote sea fluida y satisfactoria. Nuestro enfoque centrado en el
              cliente garantiza que cada paso del camino esté respaldado por la
              excelencia y la dedicación. Descubre cómo nuestros servicios te
              facilitan la elección y construcción de tu nuevo hogar.
            </p>
          </div>
          <div className="grid grid-cols-5 p-4 md:p-8">
            <div className="col-span-full hidden justify-center px-4 md:col-span-1 md:flex md:flex-col md:items-start md:justify-start">
              <button className="border-b-2 p-2 text-primary-800 md:border-b-0 md:border-l-2 md:py-3 dark:border-primary-300 dark:text-primary-400">
                Asesoramiento Personalizado
              </button>
              <button className="border-b-2 px-2  py-1 text-primary-800 md:border-b-0 md:border-l-2 md:py-3 dark:border-violet-400 dark:text-primary-50">
                Diseño y Planificación
              </button>
              <button className="border-b-2 px-2 py-1 text-primary-800 md:border-b-0 md:border-l-2 md:py-3 dark:border-primary-300 dark:text-primary-400">
                Financiamiento a Medida
              </button>
              <button className="border-b-2 px-2 py-1 text-primary-800 md:border-b-0 md:border-l-2 md:py-3 dark:border-primary-300 dark:text-primary-400">
                Desarrollo Sostenible
              </button>
              <button className="border-b-2 px-2 py-1 text-primary-800 md:border-b-0 md:border-l-2 md:py-3 dark:border-primary-300 dark:text-primary-400">
                Garantía de Calidad
              </button>
            </div>
            <div className="col-span-full grid gap-12 py-4 text-center sm:grid-cols-2 md:col-span-4 md:text-left">
              <div className="flex flex-col items-center justify-center space-y-3 md:items-start md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-10 w-10 text-primary-800"
                >
                  <path d="M6.994 15.026v-1.833c-.004-1.295-.168-2.66 2.502-3.268 1.01-.229 2.395-.544 2.622-1.046.024-.051.095-.209-.106-.582-1.431-2.638-1.698-4.965-.754-6.552.65-1.092 1.834-1.719 3.248-1.719 1.403 0 2.579.618 3.228 1.694.943 1.568.684 3.902-.731 6.573-.198.376-.125.535-.101.587.231.502 1.571.808 2.647 1.053 2.77.631 2.416 2.236 2.451 3.279v3.958c0 .49-.201.977-.609 1.356-1.378 1.28-4.453 4.026-4.935 4.467-.749.687-1.518 1.006-2.421 1.006-.405 0-.832-.065-1.308-.2-2.773-.783-4.484-1.036-5.727-1.105v1.332h-5v-9h4.994zm-.994 1h-3v7h3v-7zm1 5.664c2.092.118 4.405.696 5.999 1.147.817.231 1.761.354 2.782-.581 1.279-1.172 2.722-2.413 4.929-4.463.824-.765-.178-1.783-1.022-1.113 0 0-2.961 2.299-3.689 2.843-.379.285-.695.519-1.148.519-.36 0-2.232-.467-3.104-.743-.575-.183-.371-.993.268-.858.447.093 1.594.35 2.201.52 1.017.281 1.276-.867.422-1.152-.562-.19-.537-.198-1.889-.665-1.301-.451-2.214-.753-3.585-.156-.639.278-1.432.616-2.164.814v3.888zm14.006-6.066v-2.422c.008-1.858-.269-1.972-1.679-2.294-1.49-.34-2.898-.66-3.334-1.611-.201-.438-.158-.933.126-1.472 1.244-2.349 1.513-4.334.757-5.59-.469-.779-1.31-1.209-2.37-1.209-1.068 0-1.916.437-2.389 1.23-.757 1.272-.482 3.248.774 5.565.291.537.338 1.032.138 1.471-.432.955-1.897 1.287-3.312 1.608-1.402.321-1.724.415-1.717 2.297v3.2l.765-.325c.642-.28 1.259-.417 1.887-.417 1.214 0 2.205.499 4.303 1.205.64.214 1.076.716 1.175 1.306 1.124-.863 2.92-2.257 2.937-2.27.357-.284.773-.434 1.2-.434.262 0 .513.058.739.162z" />
                </svg>
                <h5 className="text-xl font-semibold text-primary-800">
                  Asesoramiento Personalizado
                </h5>
                <p className="text-black">
                  Nuestro equipo de asesores expertos en bienes raíces está
                  listo para acompañarte en todo el proceso. Desde la selección
                  del lote hasta la firma del contrato, recibirás orientación
                  personalizada para tomar decisiones informadas que se alineen
                  con tus necesidades y expectativas.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-3 md:items-start md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-10 w-10 text-primary-800"
                >
                  <path d="M24 23h-20c-2.208 0-4-1.792-4-4v-15.694c.313-1.071 1.285-2.306 3-2.306 1.855 0 2.769 1.342 2.995 2.312l.005 1.688h18v18zm-2-16h-16v11s-.595-1-1.922-1c-1.104 0-2.078.896-2.078 2s.896 2 2 2h18v-14zm-2 12h-12v-10h12v10zm-8-9h-3v8h10v-4h-2v3h-1v-3h-3v3h-1v-7zm-8-6.339c-.233-.921-1.807-.917-2 0v11.997c.408-.421 1.383-.724 2-.658v-11.339zm9 6.339v3h6v-3h-6z" />
                </svg>
                <h5 className="text-xl font-semibold text-primary-800">
                  Diseño y Planificación
                </h5>
                <p className="text-black">
                  En Tu Asesor Inmobiliario creemos que tu hogar debe ser un
                  reflejo de tus sueños. Colaboramos estrechamente con
                  arquitectos y diseñadores de renombre para ofrecerte opciones
                  de diseño que se adapten a tu estilo de vida. Planificamos
                  cada proyecto con atención al detalle, asegurándonos de crear
                  comunidades que prosperen.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-3 md:items-start md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-10 w-10 text-primary-800"
                >
                  <path d="M20.667 14c1.781 0 3.333-.671 3.333-1.5s-1.552-1.5-3.333-1.5c-1.781 0-3.333.671-3.333 1.5s1.551 1.5 3.333 1.5zm.062-1.34c-.199-.06-.81-.111-.81-.45 0-.189.223-.358.639-.396v-.148h.214v.141c.156.004.33.021.523.06l-.078.229c-.147-.034-.311-.066-.472-.066l-.048.001c-.321.013-.347.191-.125.267.364.112.844.195.844.493 0 .238-.289.366-.645.397v.146h-.214v-.139c-.22-.002-.451-.038-.642-.102l.098-.229c.163.042.367.084.552.084l.139-.01c.247-.034.296-.199.025-.278zm-.062 5.34c1.261 0 2.57-.323 3.333-.934v.434c0 .829-1.552 1.5-3.333 1.5-1.781 0-3.333-.671-3.333-1.5v-.434c.763.611 2.071.934 3.333.934zm0-3.333c1.261 0 2.57-.323 3.333-.934v.434c0 .829-1.552 1.5-3.333 1.5-1.781 0-3.333-.671-3.333-1.5v-.434c.763.611 2.071.934 3.333.934zm0 1.666c1.261 0 2.57-.323 3.333-.935v.435c0 .828-1.552 1.5-3.333 1.5-1.781 0-3.333-.672-3.333-1.5v-.435c.763.612 2.071.935 3.333.935zm-12.167-3.833c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5zm3.236-1.14l-.09.411c-.192-.067-.405-.128-.611-.116-.372.022-.405.344-.145.479.428.201.985.35.985.886.001.429-.334.659-.749.716v.264h-.251v-.25c-.259-.004-.526-.066-.749-.181l.113-.411c.239.092.558.191.807.135.287-.065.346-.36.028-.503-.233-.108-.944-.201-.944-.811 0-.341.261-.646.746-.713v-.266h.251v.254c.179.005.382.037.609.106zm6.264-5.36h-17v10h-1v-11h18v1zm2 1v2.834c-.715.059-1.401.214-2 .458v-1.292h-14v7h12v2h-14v-11h18z" />
                </svg>
                <h5 className="text-xl font-semibold text-primary-800">
                  {" "}
                  Financiamiento a Medida
                </h5>
                <p className="text-black">
                  Facilitamos el proceso financiero para que puedas concentrarte
                  en la emoción de construir tu hogar. Trabajamos con
                  instituciones financieras de confianza para ofrecerte opciones
                  de financiamiento personalizadas que se ajusten a tu
                  presupuesto y metas financieras.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-3 md:items-start md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10 text-primary-800"
                >
                  <path d="M7.458 8.084l.405-.916c.694-1.565 1.591-3.592 2.754-6.265.258-.592.881-.906 1.397-.888.572.015 1.126.329 1.369.888 1.163 2.673 2.06 4.7 2.754 6.265l.405.916c.375-.936.806-2.016 1.3-3.267.204-.518.67-.806 1.17-.802.482.004.941.284 1.146.802.873 2.209 1.547 3.885 2.069 5.179 1.571 3.91 1.773 4.413 1.773 5.603 0 2.388-1.42 4.402-3.5 5.04v2.39h3.5v1h-24v-1h3.5v-2.39c-2.08-.638-3.5-2.652-3.5-5.04 0-1.19.202-1.693 1.774-5.603.521-1.294 1.195-2.97 2.068-5.179.204-.518.67-.806 1.17-.802.482.004.941.284 1.146.802.494 1.251.925 2.331 1.3 3.267zm7.915 11.197c-.569.331-1.199.581-1.873.733v3.015h4v-2.39c-.83-.254-1.555-.728-2.127-1.358zm-6.746 0c-.572.63-1.297 1.104-2.127 1.358v2.39h4v-3.015c-.674-.152-1.304-.402-1.873-.733zm3.873 3.734v-3.839c4.906-.786 5-4.751 5-5.244 0-1.218-.216-1.705-2.277-6.359-2.134-4.82-2.721-6.198-2.755-6.261-.079-.145-.193-.292-.455-.297-.238 0-.37.092-.481.297-.034.063-.621 1.441-2.755 6.261-2.061 4.654-2.277 5.141-2.277 6.359 0 .493.094 4.458 5 5.244v3.839h1zm-5.606-13.65c-1.264-3.153-1.639-4.117-1.664-4.167-.072-.151-.15-.226-.226-.228-.109 0-.188.13-.235.228-.028.05-.316.818-2.066 5.171-1.542 3.833-1.703 4.233-1.703 5.23 0 1.988 1.076 3.728 3.5 4.25v3.166h1v-3.166c.975-.209 1.729-.615 2.282-1.152-1.409-1.152-2.282-2.868-2.282-4.765 0-1.17.18-1.789 1.394-4.567zm9.323 9.332c.556.538 1.311.943 2.283 1.152v3.166h1v-3.166c2.448-.527 3.5-2.29 3.5-4.25 0-.997-.161-1.397-1.703-5.23-1.589-3.957-2.04-5.116-2.067-5.171-.072-.151-.15-.226-.226-.228-.109 0-.188.13-.235.228-.026.046-.27.697-1.663 4.167 1.214 2.778 1.394 3.397 1.394 4.567 0 1.897-.873 3.613-2.283 4.765z" />
                </svg>
                <h5 className="text-xl font-semibold text-primary-800">
                  Desarrollo Sostenible
                </h5>
                <p className="text-black">
                  Nos enorgullece liderar el camino hacia el desarrollo
                  sostenible. Cada proyecto de Multinveriones Inteligentes se
                  planifica con el medio ambiente en mente. Implementamos
                  prácticas y tecnologías ecológicas para minimizar nuestro
                  impacto ambiental y promover un estilo de vida sostenible.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-3 md:items-start md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10 text-primary-800"
                >
                  <path d="M20.626 10l1.374-1.737-1.895-1.168.687-2.095-2.187-.46-.079-2.2-2.213.304-.84-2.04-1.977 1.031-1.496-1.635-1.497 1.634-1.977-1.03-.84 2.04-2.212-.305-.079 2.2-2.187.461.687 2.095-1.895 1.168 1.374 1.737-1.374 1.737 1.895 1.168-.687 2.095 2.187.46.079 2.2 2.213-.304.84 2.04 1.977-1.031 1.496 1.635 1.497-1.634 1.977 1.031.84-2.04 2.213.304.079-2.2 2.186-.461-.687-2.095 1.895-1.168-1.374-1.737zm-8.626 7c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm5.141 3.276l2.401 3.724 1.146-2h2.312l-2.655-4.103c-.917.969-1.999 1.775-3.204 2.379zm-13.486-2.379l-2.655 4.103h2.312l1.146 2 2.401-3.724c-1.205-.604-2.287-1.41-3.204-2.379zm8.345-12.897c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm0-1c-3.314 0-6 2.687-6 6s2.686 6 6 6 6-2.687 6-6-2.686-6-6-6z" />
                </svg>
                <h5 className="text-xl font-semibold text-primary-800">
                  Garantía de Calidad
                </h5>
                <p className="text-black">
                  Respaldamos la calidad de nuestros proyectos con una sólida
                  garantía. Desde la infraestructura hasta los servicios
                  comunitarios, nos esforzamos por superar tus expectativas y
                  proporcionar un entorno en el que te sientas orgulloso de
                  llamar hogar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutNotSigned>
  );
}
