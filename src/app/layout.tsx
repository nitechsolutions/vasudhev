import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/footer";
import { getDefaultLanguage } from "@/lib/service/language.service";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vasudhev.com"),
  title: {
    default:
      "Vasudhev - Money Investment Guideline, Earn Money, Tech, Auto & Finance Blogs in Hindi",
    template: "%s | Vasudhev",
  },
  description:
    "Vasudhev.com पर पढ़ें Tech, Auto और Finance से जुड़े आसान और उपयोगी ब्लॉग। Electric Cars, Bikes, SIP Investment, Loans, Mobile Phones and Laptops, Gadgets और बहुत कुछ हिंदी में।",
  icons: {
    icon: { url: "/favicon.png" },
  },
  verification: {
    google: "h2r-7ZmZZMNmEyjCH5M9Ub1UFh5TYqNrSpRipHOfa1c",
  },
  keywords: [
    "vasudhev",
    "hindi blog",
    "tech blog hindi",
    "auto blog india",
    "finance blog hindi",
    "investment blog hindi",
    "Saving money blog hindi",
    "electric car vs petrol car",
    "best bikes under 1 lakh",
    "best bikes under 2 lakh",
    "best laptops",
    "best smartphones",
    "online earn money",
  ],

  authors: [{ name: "Vasudhev Team" }],
  creator: "Vasudhev",
  publisher: "Vasudhev",

  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: "https://vasudhev.com",
    siteName: "Vasudhev",
    title:
      "Vasudhev - Money Investment Guideline, Earn Money, Tech, Auto & Finance Blogs in Hindi",
    description:
      "Tech, Auto और Finance से जुड़े ब्लॉग हिंदी में। आसान भाषा में समझें investment, gadgets और vehicles.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vasudhev Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vasudhev Blog",
    description: "Tech, Auto और Finance ब्लॉग हिंदी में पढ़ें।",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://vasudhev.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getDefaultLanguage();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="w-full items-center flex flex-col">
        <>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8924375033562590"
     crossOrigin="anonymous"></script>
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-8924375033562590"
     data-ad-slot="6037473465"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</>
        <Navbar lang={data.code} />
        <main className="flex-1">{children}</main>
        <Footer lang={data.code} />
        <Analytics />
        <Script
          src="https://push.aplu.io/push-notify.js"
          strategy="afterInteractive"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8924375033562590"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
