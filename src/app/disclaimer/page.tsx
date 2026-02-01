import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Vasudhev Hindi News",
  description:
    "Disclaimer outlining content accuracy, liability limits, and editorial responsibility of Vasudhev.com.",
  alternates: {
    canonical: "https://vasudhev.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-4">Disclaimer</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        The information provided on <strong>Vasudhev.com</strong> is published in
        good faith for general informational purposes only.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-3">Accuracy of Information</h2>
      <p className="text-gray-700 mb-6">
        While we strive for accuracy, Vasudhev does not guarantee completeness or
        reliability of any content.
      </p>

      <h2 className="text-2xl font-bold mb-3">External Links</h2>
      <p className="text-gray-700 mb-6">
        Our website may contain links to external sites. We are not responsible
        for the content or policies of those websites.
      </p>

      <h2 className="text-2xl font-bold mb-3">No Legal Advice</h2>
      <p className="text-gray-700">
        Content published is not a substitute for professional or legal advice.
      </p>
    </main>
  );
}
