import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vasudhev Hindi News",
  description:
    "Understand how Vasudhev.com collects, uses, and protects user information while delivering trusted Hindi news.",
  alternates: {
    canonical: "https://vasudhev.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-extrabold mb-3">
        Privacy Policy
      </h1>

      <p className="text-gray-600 text-sm mb-8">
        Last updated: {new Date().toLocaleDateString("en-IN")}
      </p>

      {/* INTRO */}
      <p className="text-lg leading-relaxed text-gray-800 mb-8">
        At <strong>Vasudhev.com</strong>, we respect your privacy and are committed
        to protecting the personal information of our readers. This Privacy
        Policy explains how we collect, use, and safeguard your data while
        providing reliable Hindi news content.
      </p>

      <hr className="my-8" />

      {/* SECTION */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold">Information We Collect</h2>

        <p className="text-gray-700">
          We may collect the following types of information:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Personal Information:</strong> Name and email address (only
            when voluntarily submitted).
          </li>
          <li>
            <strong>Technical Information:</strong> IP address, browser type,
            device information.
          </li>
          <li>
            <strong>Cookies:</strong> To analyze traffic and improve performance.
          </li>
        </ul>
      </section>

      <hr className="my-8" />

      {/* SECTION */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold">How We Use Your Information</h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To improve content quality and user experience</li>
          <li>To respond to inquiries and feedback</li>
          <li>To analyze website usage and trends</li>
          <li>To prevent fraud and ensure platform security</li>
        </ul>
      </section>

      <hr className="my-8" />

      {/* COOKIES */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold">Cookies Policy</h2>

        <p className="text-gray-700">
          Vasudhev.com uses cookies to understand user behavior and enhance site
          functionality. You can disable cookies through your browser settings,
          but some features may not function properly.
        </p>
      </section>

      <hr className="my-8" />

      {/* SECURITY */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold">Data Security</h2>

        <p className="text-gray-700">
          We use industry-standard security measures to protect your
          information. However, no online system is completely secure, and we
          cannot guarantee absolute protection.
        </p>
      </section>

      <hr className="my-8" />

      {/* RIGHTS */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold">Your Rights</h2>

        <p className="text-gray-700">
          You have the right to request access, correction, or deletion of your
          personal information. You may also unsubscribe from our communications
          at any time.
        </p>
      </section>

      <hr className="my-8" />

      {/* CONTACT */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Contact Us</h2>

        <p className="text-gray-700">
          For privacy-related questions or requests, contact us at:
        </p>

        <p className="text-lg font-semibold">
          📧{" "}
          <a
            href="mailto:vasudhevnews24@gmail.com"
            className="text-blue-600 hover:underline"
          >
            privacy@vasudhev.com
          </a>
        </p>
      </section>
    </main>
  );
}
