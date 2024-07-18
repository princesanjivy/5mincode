import type { Metadata } from "next";
import { Krona_One, Judson } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const kronaOne = Krona_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-krona-one",
});

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-judson",
});

export const metadata: Metadata = {
  title: "5 Min Code",
  description: "Challenge your friends for a 5 minute coding battle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kronaOne.variable} ${judson.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
