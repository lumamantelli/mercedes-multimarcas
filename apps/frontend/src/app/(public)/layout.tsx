import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Mercedes Multimarcas",
  description: "Garagem de carros virtual",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
