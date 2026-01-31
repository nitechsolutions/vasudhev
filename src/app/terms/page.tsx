import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vasudhev Hindi News",
  description:
    "Read the terms and conditions governing the use of Vasudhev.com Hindi news platform.",
  alternates: {
    canonical: "https://vasudhev.com/terms-and-conditions",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-4">Terms & Conditions</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        By accessing and using <strong>Vasudhev.com</strong>, you agree to comply
        with the following terms and conditions. Please read them carefully.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-3">Use of Content</h2>
      <p className="text-gray-700 mb-6">
        All content published on Vasudhev.com is for informational purposes only.
        Republishing, copying, or distributing content without permission is
        prohibited.
      </p>

      <h2 className="text-2xl font-bold mb-3">User Responsibility</h2>
      <p className="text-gray-700 mb-6">
        Users must not misuse the website, post harmful comments, or attempt to
        disrupt site functionality.
      </p>

      <h2 className="text-2xl font-bold mb-3">Changes to Terms</h2>
      <p className="text-gray-700">
        Vasudhev reserves the right to update these terms at any time without
        prior notice.
      </p>
    </main>
  );
}
