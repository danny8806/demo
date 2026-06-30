import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ucode Infotech | Digital Marketing Services in Pathankot | Web & App Development",
  description:
    "Digital marketing services and courses in Pathankot, Punjab. Social media marketing, SEO, content creation, paid campaigns, web and app development, and reputation management services.",
  keywords: [
    "Digital marketing services",
    "Digital marketing training",
    "Digital marketing course",
    "Pathankot",
    "Punjab",
    "web development",
    "app development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
