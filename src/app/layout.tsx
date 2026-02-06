// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vasudhev | हिंदी न्यूज़, ताज़ा खबरें, ब्रेकिंग न्यूज़, Breaking News, Latest News, Top Headlines",
  description:
    "Vasudhev पर पढ़ें भारत, दुनिया, राजनीति, टेक्नोलॉजी और बिज़नेस, हेल्थ, लाइफस्टाइल, दिल्ली, मुंबई, पुणे और राशिफल की ताज़ा खबरें।",
  keywords:
    "Vasudhev Hindi News, हिंदी न्यूज़, आज की खबरें, भारत समाचार, देश, दुनिया, बिज़नेस, टेक्नोलॉजी, हेल्थ, लाइफस्टाइल, दिल्ली, मुंबई, पुणे और राशिफल की ताज़ा खबरें।",
  metadataBase: new URL("https://vasudhev.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* 🔥 Full-width background wrapper */}
          <div className="w-full">
            {/* 🔥 Always-centered content */}
            <div className="mx-auto w-full max-w-[1256px] px-4 sm:px-6 lg:px-8">
              <Topbar />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
