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
  title: "Vasudhev | हिन्दी न्यूज, Breaking News, Latest News, Top Headlines",
  description: "Vasudhev Hindi News पर पढ़ें देश, दुनिया, बिज़नेस, टेक्नोलॉजी, हेल्थ, लाइफस्टाइल, दिल्ली, मुंबई, पुणे और राशिफल की ताज़ा खबरें। ",
  keywords: "Vasudhev Hindi News, हिंदी न्यूज़, आज की खबरें, भारत समाचार, देश, दुनिया, बिज़नेस, टेक्नोलॉजी, हेल्थ, लाइफस्टाइल, दिल्ली, मुंबई, पुणे और राशिफल की ताज़ा खबरें।",
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
          <div className="container w-full">
            <div className="wrapper px-4 lg:px-20 m-auto lg:max-w-[1256px] max-w-full">
              <Topbar />
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
