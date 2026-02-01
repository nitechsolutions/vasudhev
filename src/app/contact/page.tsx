import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Vasudhev Hindi News",
  description:
    "Get in touch with Vasudhev.com for news tips, feedback, or business inquiries.",
  alternates: {
    canonical: "https://vasudhev.com/contact",
  },
};

export default function ContactUsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        We value your feedback, suggestions, and news tips. Reach out to us using
        the details below.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-3">Email</h2>
      <p className="text-lg font-semibold mb-4">
        📧{" "} Click Here 👉🏼 {' '}
        <a
          href="mailto:vasudhevnews24@gmail.com"
          className="text-blue-600 hover:underline"
        >
          vasudhevnews24@gmail.com
        </a>
      </p>

      <h2 className="text-2xl font-bold mb-3">Business & Advertising</h2>
      <p className="text-gray-700">
        For advertising, partnerships, or official communication, please email
        us directly.
      </p>
    </main>
  );
}
