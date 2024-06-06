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
        <title>Fortium</title>
        <meta
          name="title"
          content="Fortium Partners - Elevate Your Decision-Making with Trusted Recommendations From Your Own Partners"
        />
        <meta
          name="description"
          content="Elevate Your Decision-Making with Trusted Recommendations From Your Own Partners
          At Fortium Partners, we understand that making informed technology decisions is crucial for your clients success. 
          Thats why we've developed the CTO Insights Platform
          
          Streamlined Recommendations
          As a CTO, youre constantly navigating a complex landscape of technology services and solutions to find the best fit for your clients needs. 
          The CTO Insights Platform gives you direct access to other Fortium Partners experiences with technology service providers."
        />
        <meta
          name="keywords"
          content="fortium partners recommendations, fortium partners, fortium, fortium partners reviews, fortium partners insights, fortium partners platform, fortium partners technology, fortium partners technology insights, fortium partners technology recommendations, fortium partners technology reviews, fortium partners technology platform, fortium partners technology insights platform, fortium partners technology recommendations platform, fortium partners technology reviews platform, fortium partners technology platform, fortium partners technology insights platform, fortium partners technology recommendations platform, fortium partners technology reviews platform, fortium partners technology platform, fortium partners technology insights platform, fortium partners technology recommendations platform, fortium partners technology reviews platform"
        />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
      <main
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Toaster />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
