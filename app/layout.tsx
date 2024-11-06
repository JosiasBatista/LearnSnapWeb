import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./_context/userContext";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ['400', '700']
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "LearnSnap",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={`${cormorant.variable} ${montserrat.variable} antialiased`}>
          <Toaster position="top-right"/>
          <UserProvider>
            {children}
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
