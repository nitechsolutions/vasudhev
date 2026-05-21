export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-700">
            Terms & Conditions
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Terms & Conditions For
            <span className="text-blue-600"> Vasudhev</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-3xl">
            By accessing and using Vasudhev, you agree to follow the terms,
            conditions, and policies mentioned on this page.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                Acceptance Of Terms
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                By using this website, you acknowledge that you have read,
                understood, and agreed to these Terms & Conditions. If you do not
                agree, please discontinue using the website.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                Website Content
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                All content published on Vasudhev is for informational and
                educational purposes only. We aim to provide accurate information,
                but we do not guarantee complete accuracy, reliability, or
                completeness.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                Intellectual Property Rights
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                All articles, graphics, logos, branding elements, and website
                content are the property of Vasudhev unless otherwise stated.
                Unauthorized copying, reproduction, or redistribution is prohibited.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                User Responsibilities
              </h2>

              <ul className="mt-6 space-y-4 text-gray-600 leading-8 list-disc pl-5">
                <li>Do not misuse the website or attempt unauthorized access.</li>
                <li>Do not publish harmful, spam, or misleading content.</li>
                <li>Respect intellectual property and copyright rules.</li>
                <li>Use the website only for lawful purposes.</li>
              </ul>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                External Links
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                Vasudhev may include links to third-party websites for reference,
                affiliate programs, or additional resources. We are not responsible
                for the content, services, or privacy practices of external websites.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                Advertisement & Affiliate Disclosure
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                This website may display advertisements and affiliate links.
                Clicking on these links may generate commissions without any extra
                cost to users.
              </p>

              <p className="mt-5 text-gray-600 leading-8">
                We strive to recommend only useful and relevant products or services.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                Limitation Of Liability
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                Vasudhev shall not be held responsible for any direct or indirect
                damages resulting from the use of website content, advertisements,
                external links, or services.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-2xl font-bold tracking-tight">
                Modifications To Terms
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                We reserve the right to update or modify these Terms & Conditions
                at any time without prior notice. Continued use of the website
                indicates acceptance of updated terms.
              </p>
            </div>

            {/* CONTACT SECTION */}
            <div className="rounded-3xl bg-gray-900 text-white p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Need Help?
              </h2>

              <p className="mt-5 text-gray-300 leading-8 max-w-2xl mx-auto">
                If you have questions regarding these Terms & Conditions,
                please contact us through our contact page.
              </p>

              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
