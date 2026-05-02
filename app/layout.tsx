import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Comforter_Brush,
  Ruslan_Display,
} from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const docallisme = localFont({
  src: "../public/fonts/DOCALLISME ON STREET.ttf",
  variable: "--font-docallisme",
  display: "swap",
});

const sedgwick = localFont({
  src: "../public/fonts/SedgwickAveDisplay-Regular.ttf",
  variable: "--font-sedgwick",
  display: "swap",
});

const ruslan = Ruslan_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ruslan",
});

const comforter = Comforter_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-comforter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divyanshu Singh | Designer & Developer",
  description:
    "Portfolio of Divyanshu Singh, a Full Stack Developer and UI/UX Designer specializing in high-performance, interactive web experiences with Next.js, GSAP, and Framer Motion.",
  keywords: ["Divyanshu Singh", "Portfolio", "Full Stack Developer", "UI/UX Designer", "Next.js", "GSAP", "React Developer"],
  authors: [{ name: "Divyanshu Singh" }],
  openGraph: {
    title: "Divyanshu Singh | Designer & Developer",
    description: "Full Stack Developer and UI/UX Designer specializing in high-performance web experiences.",
    url: "https://divyanshu.dev", // Update with actual URL if known
    siteName: "Divyanshu Singh Portfolio",
    images: [
      {
        url: "/images/og-image.png", // Ensure this exists or suggest creating it
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyanshu Singh | Designer & Developer",
    description: "Full Stack Developer and UI/UX Designer specializing in high-performance web experiences.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ruslan.variable} ${comforter.variable} ${docallisme.variable} ${sedgwick.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
