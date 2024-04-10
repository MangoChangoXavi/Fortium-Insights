import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/assets/styles/globals.css";
import Head from "next/head";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAdSense } from "nextjs-google-adsense";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Analytics />
      <Head>
        <title>Techos Digitales</title>
        <meta
          name="title"
          content="Techos Digitales - Eleve su negocio inmobiliario con nuestras soluciones"
        />
        <meta
          name="description"
          content="Techos Digitales is a one stop solution for real estate businesses to get customised solutions and software for their business!"
        />
        <meta
          name="keywords"
          content="solucion inmobiliaria, soluciones inmobiliarias, crm inmobiliario, crm inmobiliaria, software inmobiliario, crm para inmobiliarias, inmobiliaria solucion, que es un crm inmobiliario, mejor crm inmobiliario"
        />
        <link rel="icon" type="image/svg+xml" href="/g8.svg" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6713030727031078"
          crossorigin="anonymous"
        ></script>
      </Head>
      <main
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Toaster />
        <GoogleAdSense publisherId="ca-pub-6713030727031078" />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
