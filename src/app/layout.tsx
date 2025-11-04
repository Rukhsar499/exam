"use client";
import { useEffect, useState } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-poppins' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [fontClasses, setFontClasses] = useState("");

  useEffect(() => {
    setFontClasses(`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`);
  }, []);

  return (
    <html lang="en" className="hydrated">
      <body className={`${fontClasses} antialiased`}>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}
