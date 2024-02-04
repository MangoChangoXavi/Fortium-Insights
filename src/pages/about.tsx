import Link from "next/link";
import React from "react";
import { LayoutNotSigned } from "~/components/system/layouts/LayoutNotSigned";

export default function About() {
  return (
    <LayoutNotSigned>
      <section>
        <div className="container mx-auto px-6 py-12">
          <div className="grid items-center gap-4 xl:grid-cols-5">
            <div className="mx-auto my-8 max-w-2xl space-y-4 text-center xl:col-span-2 xl:text-left">
              <h2 className="text-4xl font-bold text-primary-800">
                Acerca de Megainversiones Inteligentes
              </h2>
              <p className="text-black">
                En Tu Asesor Inmobiliario nuestra misión es transformar sueños
                en hogares, ofreciendo lotes excepcionales en entornos
                cuidadosamente planificados. Desde nuestros inicios, nos hemos
                comprometido a crear comunidades que no solo reflejen calidad y
                excelencia, sino que también respeten el entorno y enriquezcan
                la vida de quienes las eligen como hogar.
              </p>
            </div>
            <div className="p-6 xl:col-span-3">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid content-center gap-4">
                  <div className="rounded p-6 text-primary-800 shadow-md">
                    <p>
                      Trabajar en Megainversiones Inteligentes va más allá de
                      una carrera; es una oportunidad para impactar
                      positivamente en la vida de las personas. La combinación
                      de creatividad, responsabilidad ambiental y compromiso con
                      la comunidad hace que nuestro equipo sea excepcional.
                      Estoy emocionado por lo que el futuro nos depara.
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <img
                        src="https://source.unsplash.com/51x51/?portrait"
                        alt=""
                        className="dark:bg-tertiary-500 h-12 w-12 rounded-full bg-cover bg-center"
                      />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-black">CTO of Company Co.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded p-6 text-primary-800 shadow-md">
                    <p>
                      Trabajar en Megainversiones Inteligentes ha sido una
                      experiencia inspiradora. Aquí, cada día es una oportunidad
                      para contribuir a la creación de hogares que van más allá
                      de las expectativas. La dedicación a la calidad y la
                      visión sostenible hacen que este equipo sea único y
                      motivador.
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <img
                        src="https://source.unsplash.com/52x52/?portrait"
                        alt=""
                        className="dark:bg-tertiary-500 h-12 w-12 rounded-full bg-cover bg-center"
                      />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-black">CTO of Company Co.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid content-center gap-4">
                  <div className="rounded p-6 text-primary-800 shadow-md">
                    <p>
                      Como [Cargo], he sido testigo del compromiso incansable de
                      Megainversiones Inteligentes con la excelencia. Desde la
                      planificación hasta la ejecución, cada proyecto es
                      abordado con una pasión que se refleja en la calidad de
                      nuestras comunidades. Ser parte de este equipo me llena de
                      orgullo.
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <img
                        src="https://source.unsplash.com/53x53/?portrait"
                        alt=""
                        className="dark:bg-tertiary-500 h-12 w-12 rounded-full bg-cover bg-center"
                      />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-black">CTO of Company Co.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded p-6 text-primary-800 shadow-md">
                    <p>
                      Lo que más valoro de Megainversiones Inteligentes es la
                      colaboración y el espíritu de equipo. Aquí, todos
                      compartimos una visión común de crear lugares que las
                      personas llamen hogar con alegría. Esta cultura de trabajo
                      ha hecho que mi experiencia sea gratificante y
                      significativa.
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <img
                        src="https://source.unsplash.com/54x54/?portrait"
                        alt=""
                        className="dark:bg-tertiary-500 h-12 w-12 rounded-full bg-cover bg-center"
                      />
                      <div>
                        <p className="text-lg font-semibold">Leroy Jenkins</p>
                        <p className="text-sm text-black">CTO of Company Co.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto flex flex-col p-6">
          <h2 className="py-4 text-center text-3xl font-bold text-primary-800">
            Conocenos Paso a Paso
          </h2>
          <div className="divide-y dark:divide-gray-700">
            <div className="mx-auto grid grid-cols-4 justify-center space-y-8 p-8 lg:space-y-0">
              <div className="col-span-full flex items-center justify-center lg:col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-16 w-16 text-primary-800"
                >
                  <path d="M17 7h-10v1h10v-1zm0 2h-10v1h10v-1zm-4 2h-6v1h6v-1zm9.042 4.638c.06.255-.277.414-.391.144-.136-.33-.356-1.734-.547-3.146-.103-.756-1.107-.663-1.104.118.003 1.215.002 2.228 0 4.027-.002 1.535.697 1.565 1.213 3.287.088.296.164.618.226.933l2.561-.895c-.893-1.747-.462-3.126-.373-4.255.122-1.543-.288-1.693-2.192-3.548.114.816.352 2.265.607 3.335zm-19.477-3.334c-1.904 1.854-2.314 2.005-2.192 3.548.089 1.128.52 2.507-.373 4.254l2.562.894c.062-.314.138-.637.226-.933.515-1.721 1.214-1.752 1.212-3.287-.002-1.8-.003-2.812 0-4.027.003-.781-1.002-.874-1.104-.118-.19 1.412-.411 2.816-.547 3.146-.113.271-.45.111-.391-.144.255-1.069.493-2.518.607-3.333zm2.435 4.696l.004-2h13.992l.004 2h-14zm-2-5.819v-6.681c0-.828.672-1.5 1.5-1.5h15c.828 0 1.5.672 1.5 1.5v6.681c-.138-.04-.282-.065-.436-.065-.41-.001-.812.166-1.102.457-.289.29-.449.686-.463 1.118v-7.691h-13.999v7.689c-.014-.432-.174-.827-.463-1.117-.29-.291-.691-.457-1.102-.457-.152 0-.296.026-.435.066z" />
                </svg>
              </div>
              <div className="col-span-full flex max-w-3xl flex-col justify-center text-center lg:col-span-3 lg:text-left">
                <span className="tracki text-tertiary-800 text-xs uppercase">
                  Paso 1 - Como nacimos
                </span>
                <span className="text-xl font-bold text-primary-800 md:text-2xl">
                  Nuestra Historia
                </span>
                <span className="mt-4 text-black">
                  Fundada en 2018, Megainversiones Inteligentes nació de la
                  visión de [Nombre del Fundador o Fundadores]. Inspirados por
                  la pasión por la arquitectura, el desarrollo sostenible y el
                  compromiso con la comunidad, hemos crecido para convertirnos
                  en líderes en la industria de bienes raíces. Desde nuestros
                  primeros proyectos hasta la actualidad, hemos mantenido un
                  enfoque centrado en el cliente, trabajando arduamente para
                  entender y superar las expectativas de aquellos que confían en
                  nosotros para construir sus hogares.
                </span>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-4 justify-center space-y-8 p-8 lg:space-y-0">
              <div className="col-span-full flex items-center justify-center lg:col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-16 w-16 text-primary-800"
                >
                  <path d="M24 11.374c0 4.55-3.783 6.96-7.146 6.796-.151 1.448.061 2.642.384 3.641l-3.72 1.189c-.338-1.129-.993-3.822-2.752-5.279-2.728.802-4.969-.646-5.784-2.627-2.833.046-4.982-1.836-4.982-4.553 0-4.199 4.604-9.541 11.99-9.541 7.532 0 12.01 5.377 12.01 10.374zm-21.992-1.069c-.145 2.352 2.179 3.07 4.44 2.826.336 2.429 2.806 3.279 4.652 2.396 1.551.74 2.747 2.37 3.729 4.967l.002.006.111-.036c-.219-1.579-.09-3.324.36-4.528 3.907.686 6.849-1.153 6.69-4.828-.166-3.829-3.657-8.011-9.843-8.109-6.302-.041-9.957 4.255-10.141 7.306zm8.165-2.484c-.692-.314-1.173-1.012-1.173-1.821 0-1.104.896-2 2-2s2 .896 2 2c0 .26-.05.509-.141.738 1.215.911 2.405 1.855 3.6 2.794.424-.333.96-.532 1.541-.532 1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5c-1.171 0-2.155-.807-2.426-1.895-1.201.098-2.404.173-3.606.254-.17.933-.987 1.641-1.968 1.641-1.104 0-2-.896-2-2 0-1.033.784-1.884 1.79-1.989.12-.731.252-1.46.383-2.19zm2.059-.246c-.296.232-.66.383-1.057.417l-.363 2.18c.504.224.898.651 1.079 1.177l3.648-.289c.047-.267.137-.519.262-.749l-3.569-2.736z" />
                </svg>
              </div>
              <div className="col-span-full flex max-w-3xl flex-col justify-center text-center lg:col-span-3 lg:text-left">
                <span className="tracki text-tertiary-800 text-xs uppercase">
                  Paso 2 - Como pensamos
                </span>
                <span className="text-xl font-bold text-primary-800 md:text-2xl">
                  Nuestra Filosofía
                </span>
                <span className="mt-4 text-black">
                  En Tu Asesor Inmobiliario creemos en la creación de más que
                  simples comunidades residenciales; aspiramos a construir
                  espacios que fomenten la conexión, la sostenibilidad y el
                  bienestar. Nuestra filosofía se basa en los siguientes
                  principios:
                  <br />
                  <br />
                  <ul className="list-disc">
                    <li>
                      <span className="font-bold">Calidad y Excelencia: </span>
                      Cada proyecto se planifica y ejecuta con los más altos
                      estándares de calidad, desde la infraestructura hasta los
                      servicios comunitarios.{" "}
                    </li>
                    <br />
                    <li>
                      <span className="font-bold">Desarrollo Sostenible: </span>
                      Estamos comprometidos con prácticas que respeten y
                      protejan el medio ambiente. Buscamos liderar el cambio
                      hacia un desarrollo sostenible y consciente.
                    </li>
                    <br />
                    <li>
                      <span className="font-bold">
                        Colaboración Comunitaria:{" "}
                      </span>
                      Valoramos la colaboración con las comunidades locales.
                      Trabajamos estrechamente con residentes y autoridades para
                      asegurar que nuestros proyectos beneficien a todos.
                    </li>
                  </ul>
                </span>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-4 justify-center space-y-8 p-8 lg:space-y-0">
              <div className="col-span-full flex items-center justify-center lg:col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-16 w-16 text-primary-800"
                >
                  <path d="M6.72 20.492c1.532.956 3.342 1.508 5.28 1.508 1.934 0 3.741-.55 5.272-1.503l1.24 1.582c-1.876 1.215-4.112 1.921-6.512 1.921-2.403 0-4.642-.708-6.52-1.926l1.24-1.582zm5.497-.492h-.447c-.117 0-.23-.04-.308-.109l-.593-.391h2.25l-.594.391c-.077.069-.19.109-.308.109zm-10.814-.838h-1.403c0-1.104.895-2 2-2h2c.53 0 1.039.211 1.414.586s.586.884.586 1.414h-1.403c-.196-.606-.755-.726-1.597-.726s-1.4.115-1.597.726zm11.737-.162h-2.279c-.138 0-.25-.112-.25-.25s.112-.25.25-.25h2.279c.138 0 .25.112.25.25s-.112.25-.25.25zm6.263 0h-1.403c0-1.105.895-2 2-2h2c.53 0 1.039.211 1.414.586s.586.883.586 1.414h-1.403c-.196-.606-.755-.726-1.597-.726s-1.4.115-1.597.726zm-7.586-.986h-1.414c-.013-2.57-1.403-2.878-1.403-4.647 0-1.695 1.327-2.852 3-2.852h.02c1.663.009 2.98 1.163 2.98 2.852 0 1.769-1.391 2.077-1.404 4.647h-1.414c0-2.735 1.318-3.614 1.318-4.651 0-.856-.694-1.333-1.5-1.348h-.019c-.798.022-1.481.499-1.481 1.348 0 1.037 1.317 1.916 1.317 4.651zm-8.817-5.852c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm18-.162c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm-5.13 2.386l1.349.612-.413.91-1.298-.588c.15-.3.275-.608.362-.934zm-7.739-.001c.087.332.208.631.36.935l-1.296.588-.414-.91 1.35-.613zm-5.131-.873c.497 0 .9.403.9.9s-.403.9-.9.9-.9-.403-.9-.9.403-.9.9-.9zm18-.162c.497 0 .9.403.9.9s-.403.9-.9.9-.9-.403-.9-.9.403-.9.9-.9zm-3.5.15h-1.501c.01-.335-.02-.673-.093-1h1.594v1zm-9.498 0h-1.502v-1h1.594c-.072.327-.102.663-.092.998v.002zm7.02-2.714l1.242-.882.579.816-1.252.888c-.146-.291-.335-.566-.569-.822zm-6.044-.001c-.23.252-.418.525-.569.823l-1.251-.888.578-.816 1.242.881zm4.435-1.046l.663-1.345.897.443-.664 1.345c-.278-.184-.58-.332-.896-.443zm-2.826-.001c-.315.11-.618.258-.897.442l-.663-1.343.897-.443.663 1.344zm-2.587-9.054v2.149c-2.938 1.285-5.141 3.942-5.798 7.158l-2.034-.003c.732-4.328 3.785-7.872 7.832-9.304zm8 0c4.047 1.432 7.1 4.976 7.832 9.304l-2.034.003c-.657-3.216-2.86-5.873-5.798-7.158v-2.149zm-3.5 8.847c-.334-.04-.654-.042-1-.002v-1.529h1v1.531zm-2.097-2.531h-1.403c0-1.105.895-2 2-2h2c.53 0 1.039.211 1.414.586s.586.883.586 1.414h-1.403c-.196-.606-.755-.726-1.597-.726s-1.4.115-1.597.726zm1.597-7c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0 1.35c.497 0 .9.403.9.9s-.403.9-.9.9-.9-.403-.9-.9.403-.9.9-.9z" />
                </svg>
              </div>
              <div className="col-span-full flex max-w-3xl flex-col justify-center text-center lg:col-span-3 lg:text-left">
                <span className="tracki text-tertiary-800 text-xs uppercase">
                  Paso 3 - Quienes somos
                </span>
                <span className="text-xl font-bold text-primary-800 md:text-2xl">
                  Nuestro Equipo
                </span>
                <span className="mt-4 text-black dark:bg-gray-800">
                  Detrás de cada proyecto exitoso hay un equipo apasionado y
                  dedicado. En Tu Asesor Inmobiliario contamos con profesionales
                  en bienes raíces, arquitectura, diseño y desarrollo sostenible
                  que comparten la visión de crear hogares que perduren.
                </span>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-4 justify-center space-y-8 p-8 lg:space-y-0">
              <div className="col-span-full flex items-center justify-center lg:col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-16 w-16 text-primary-800"
                >
                  <path d="M7.458 8.084l.405-.916c.694-1.565 1.591-3.592 2.754-6.265.258-.592.881-.906 1.397-.888.572.015 1.126.329 1.369.888 1.163 2.673 2.06 4.7 2.754 6.265l.405.916c.375-.936.806-2.016 1.3-3.267.204-.518.67-.806 1.17-.802.482.004.941.284 1.146.802.873 2.209 1.547 3.885 2.069 5.179 1.571 3.91 1.773 4.413 1.773 5.603 0 2.388-1.42 4.402-3.5 5.04v2.39h3.5v1h-24v-1h3.5v-2.39c-2.08-.638-3.5-2.652-3.5-5.04 0-1.19.202-1.693 1.774-5.603.521-1.294 1.195-2.97 2.068-5.179.204-.518.67-.806 1.17-.802.482.004.941.284 1.146.802.494 1.251.925 2.331 1.3 3.267zm7.915 11.197c-.569.331-1.199.581-1.873.733v3.015h4v-2.39c-.83-.254-1.555-.728-2.127-1.358zm-6.746 0c-.572.63-1.297 1.104-2.127 1.358v2.39h4v-3.015c-.674-.152-1.304-.402-1.873-.733zm3.873 3.734v-3.839c4.906-.786 5-4.751 5-5.244 0-1.218-.216-1.705-2.277-6.359-2.134-4.82-2.721-6.198-2.755-6.261-.079-.145-.193-.292-.455-.297-.238 0-.37.092-.481.297-.034.063-.621 1.441-2.755 6.261-2.061 4.654-2.277 5.141-2.277 6.359 0 .493.094 4.458 5 5.244v3.839h1zm-5.606-13.65c-1.264-3.153-1.639-4.117-1.664-4.167-.072-.151-.15-.226-.226-.228-.109 0-.188.13-.235.228-.028.05-.316.818-2.066 5.171-1.542 3.833-1.703 4.233-1.703 5.23 0 1.988 1.076 3.728 3.5 4.25v3.166h1v-3.166c.975-.209 1.729-.615 2.282-1.152-1.409-1.152-2.282-2.868-2.282-4.765 0-1.17.18-1.789 1.394-4.567zm9.323 9.332c.556.538 1.311.943 2.283 1.152v3.166h1v-3.166c2.448-.527 3.5-2.29 3.5-4.25 0-.997-.161-1.397-1.703-5.23-1.589-3.957-2.04-5.116-2.067-5.171-.072-.151-.15-.226-.226-.228-.109 0-.188.13-.235.228-.026.046-.27.697-1.663 4.167 1.214 2.778 1.394 3.397 1.394 4.567 0 1.897-.873 3.613-2.283 4.765z" />
                </svg>
              </div>
              <div className="col-span-full flex max-w-3xl flex-col justify-center text-center lg:col-span-3 lg:text-left">
                <span className="tracki text-tertiary-800 text-xs uppercase">
                  Paso 4 - Nuestro Compromiso
                </span>
                <span className="text-xl font-bold text-primary-800 md:text-2xl">
                  Compromiso Social y Ambiental
                </span>
                <span className="mt-4 text-black">
                  Creemos en devolver a la comunidad y al medio ambiente que nos
                  rodea. A través de iniciativas sociales y proyectos de
                  responsabilidad ambiental, buscamos crear un impacto positivo
                  y sostenible en cada lugar donde operamos.
                </span>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-4 justify-center space-y-8 p-8 lg:space-y-0">
              <div className="col-span-full flex items-center justify-center lg:col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-16 w-16 text-primary-800"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.144 0-9.39-3.905-9.938-8.905l2.385.635 1.355-4.983-2.894-.887c1.578-3.451 5.056-5.86 9.092-5.86 4.047 0 7.532 2.421 9.104 5.886l-2.907.86 1.355 4.983 2.384-.635c-.546 5.001-4.792 8.906-9.936 8.906zm-.936-6.032l-.671.907c-.181.246-.571.31-.821.125-.263-.192-.32-.56-.126-.823l.67-.905c.194-.262.561-.318.823-.126.262.192.319.56.125.822zm-1.187-.868l-.675.915c-.179.244-.562.306-.819.118-.261-.193-.322-.553-.129-.814l.676-.914c.191-.261.559-.318.82-.126.263.192.321.561.127.821zm-1.186-.866l-.671.907c-.182.248-.574.308-.822.126-.262-.192-.319-.561-.127-.822l.672-.907c.191-.262.559-.319.822-.125.263.191.318.559.126.821zm8.282.452c.23.229.23.602 0 .832-.229.229-.603.229-.831 0l-1.688-1.688c-.055-.055-.144-.057-.202-.004-.062.057-.065.154-.005.213l1.562 1.563c.229.23.229.602 0 .832s-.602.23-.832 0l-1.27-1.271c-.057-.057-.148-.057-.205-.001-.062.057-.062.151-.003.21l1.054 1.054c.229.23.229.601 0 .832-.229.229-.602.229-.832 0l-.544-.545c.141-.868-.497-1.576-1.276-1.644-.207-.492-.668-.821-1.185-.865-.198-.476-.654-.82-1.187-.867-.422-1.007-1.799-1.193-2.459-.293l-.367.496c-.373-.141-.777-.258-1.241-.367l1.062-3.904c1.584-.014 2.83-1.515 4.291-.591-.479.591-.87 1.063-1.462 1.409-.473.276-.694.817-.551 1.347.181.664.854 1.128 1.641 1.128 1.04 0 2.116-.854 2.935-1.468.481.48 3.191 3.146 3.595 3.592zm-4.846 1.326c.262.191.318.56.125.82l-.672.91c-.18.246-.568.311-.822.125-.262-.192-.318-.56-.127-.822l.674-.91c.191-.258.558-.317.822-.123zm5.356-6.718l1.08 3.973c-.387.173-.774.374-1.178.622 0 0-2.604-2.57-3.378-3.344-.412-.413-.697-.469-1.174-.085-.607.489-1.35.985-1.898 1.178-1.076.376-1.664-.54-1.163-.832 1.017-.593 1.513-1.448 2.366-2.415.237-.269.52-.368.807-.368.313 0 .635.117.912.261 1.264.653 2.415 1.099 3.626 1.01zm-4.266 7.874c.406.406.106.832-.346.832-.117 0-.246-.027-.375-.094.195-.265.482-.618.589-.871l.132.133z" />
                </svg>
              </div>
              <div className="col-span-full flex max-w-3xl flex-col justify-center text-center lg:col-span-3 lg:text-left">
                <span className="tracki text-tertiary-800 text-xs uppercase">
                  Paso 5 - Se parte
                </span>
                <span className="text-xl font-bold text-primary-800 md:text-2xl">
                  ¡Únete a Nuestra Historia!
                </span>
                <span className="mt-4 text-black">
                  Ya sea que estés interesado en adquirir uno de nuestros lotes
                  o simplemente quieras conocernos mejor, te invitamos a formar
                  parte de nuestra historia.{" "}
                  <Link href="/contact" className="text-accent-400 font-bold">
                    Contacta con Nosotros
                  </Link>{" "}
                  para descubrir cómo Megainversiones Inteligentes puede ser el
                  puente entre tus sueños y tu nuevo hogar. ¡Gracias por
                  considerar a Megainversiones Inteligentes para construir el
                  futuro contigo!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutNotSigned>
  );
}
