/* eslint-disable @next/next/no-css-tags */
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guess the card",
  description: "Connais-tu altered aussi bien que tu ne le pense ?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌹</text></svg>"
        />

        <link
          href="//cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body
        className={`fixed w-full background-gradient background-color-black ${inter.className}`}
      >
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <div className="flex flex-col h-screen	">
              <main className="  dark grow flex flex-col overflow-x-auto ">
                {children}
              </main>
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
