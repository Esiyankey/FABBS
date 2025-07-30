import type { Metadata } from "next";
import "./globals.css";
// import { Montserrat } from "next/font/google";
import { Navbar } from "./components/features/navbar";
import { Footer } from "./components/features/footer";



// const montserrat = Montserrat({
//   variable: "--font-montserrat",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "FABBS Production",
  description:
    " At Faabs Production, we believe that every moment tells a story worth preserving. With years of  experience in weddings, events, portraits, and commercial shoots, we tell your story with style and emotion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
