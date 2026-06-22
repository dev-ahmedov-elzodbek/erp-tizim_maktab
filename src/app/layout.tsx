import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "O'quv Markaz — IT va dizayn ta'lim markazi",
    template: "%s | O'quv Markaz",
  },
  description:
    "Toshkent shahridagi yetakchi IT va dizayn ta'lim markazi. 35+ zamonaviy kurslar, tajribali mentorlar va ishga joylashishda yordam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
