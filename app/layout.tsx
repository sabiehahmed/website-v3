import type {Metadata} from "next";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import {config} from "@/lib/config";
import ogImage from "./opengraph-image.png";
import Script from "next/script";

export const metadata: Metadata = {
    title: config.metadata.title,
    description: config.metadata.description,
    metadataBase: new URL(`https://www.sabiehahmed.com`),
    openGraph: {
        images: [
            {
                url: ogImage.src,
                width: ogImage.width,
                height: ogImage.height,
            },
        ],
    },
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" suppressHydrationWarning>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SKRM16PJPS"/>
        <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SKRM16PJPS')`};
        </Script>
        <body
            className={`${GeistSans.variable} ${GeistMono.variable} relative font-sans bg-whiteout selection:text-white  selection:bg-pink-400 dark:bg-zinc-900 text-blackout dark:text-zinc-100`}
        >
        <ThemeProvider attribute="class">
            <Nav/>
            {children}
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}

export const revalidate = 300;
