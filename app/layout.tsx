import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Comforter_Brush,
  Ruslan_Display,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  title: "Divyanshu Singh",
  description:
    "Its a portfolio of a designer and a developer doing both with ease. I made this to let people see my skills and work and hire me immediately.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ruslan.variable} ${comforter.variable} antialiased`}
        style={
          {
            "--font-docallisme": '"Docallisme On Street"',
          } as React.CSSProperties
        }>
        {children}
      </body>
    </html>
  );
}
