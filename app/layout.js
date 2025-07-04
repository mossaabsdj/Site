import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers"; // relative path to providers.jsx
import { Icon } from "lucide-react";
import logo from "@/public/images/Logo.png";
// Load fonts with CSS variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ski agrotour luxe",
  description: "Business agro-touristique",
  icons: {
    icon: "@/public/images/Logo.png", // or use .png
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers> {children} </Providers>{" "}
      </body>{" "}
    </html>
  );
}
