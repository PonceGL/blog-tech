import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getMetadata } from "../utils/getMetadata";
import { Header } from "./components/header";
import { GoogleAnalytics } from "@next/third-parties/google";
import { InitializeGA } from "./components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...getMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? ""} />
      <InitializeGA />
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
