import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vasudhev Hindi News",
  description:
    "Vasudhev.com is a trusted Hindi news platform delivering accurate, fast, and unbiased news across India and the world.",
  alternates: {
    canonical: "https://vasudhev.com/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-4">About Vasudhev</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        <strong>Vasudhev.com</strong> is an independent Hindi digital news
        platform dedicated to delivering accurate, fast, and meaningful news to
        readers across India and beyond.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Our mission is to provide factual, unbiased, and easy-to-understand
        news in Hindi, covering politics, business, technology, health,
        lifestyle, education, sports, and world affairs.
      </p>

      <h2 className="text-2xl font-bold mb-3">Why Vasudhev?</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Trusted Hindi journalism</li>
        <li>Fast and verified news updates</li>
        <li>Reader-first content approach</li>
        <li>Focus on credibility and accuracy</li>
      </ul>
    </main>
  );
}
