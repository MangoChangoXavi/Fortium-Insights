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
import { GoogleTagManager } from "@next/third-parties/google";

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
          content="Techos Digitales - compra, busca o alquila casas y apartamentos en Guatemala"
        />
        <meta
          name="description"
          content="busca facilmente casas y apartamentos en Guatemala. Busca propiedades en ventas y en alquiler de manera facil."
        />
        <meta
          name="keywords"
          content="busca inmuebles en guatemala, venta de apartamentos, renta de apartamentos, alquier de casas, casas en venta, venta de casas, buscar casas, buscar apartamentos, alquiler en guatemala, propiedades en alquiler, buscar alquiler, bienes raices inteligencia artificial"
        />
        <link rel="icon" type="image/svg+xml" href="/g8.svg" />
      </Head>
      <main
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Toaster />
        <GoogleTagManager gtmId="GTM-PCRDHGT9" />
        <GoogleAdSense publisherId="pub-6713030727031078" />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
