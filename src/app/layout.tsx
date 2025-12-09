import type { Metadata } from "next";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { getSeoData } from "@/lib/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Crew•Nest",
  description: "Connect & find roommates – built for the airline community",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seoData = await getSeoData();
  console.log(seoData);
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body>{children}</body>
    </html>
  );
}
