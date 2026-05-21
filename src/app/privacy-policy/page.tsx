export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-6xl bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-700">
            Privacy Policy
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Privacy Policy For
            <span className="text-blue-600"> Vasudhev</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-3xl">
            Your privacy is important to us. This Privacy Policy explains how
            Vasudhev collects, uses, and protects user information while using
            our website.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Information We Collect
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                We may collect basic user information such as name, email address,
                browser type, device information, and usage data when users interact
                with our website, subscribe to newsletters, or contact us.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                How We Use Information
              </h2>

              <ul className="mt-6 space-y-4 text-gray-600 leading-8 list-disc pl-5">
                <li>To improve website performance and user experience.</li>
                <li>To respond to user inquiries and feedback.</li>
                <li>To analyze website traffic and audience engagement.</li>
                <li>To display relevant advertisements through advertising partners.</li>
                <li>To maintain website security and prevent misuse.</li>
              </ul>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Google AdSense & Advertising
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                Vasudhev may use third-party advertising services such as Google
                AdSense. These services may use cookies to show personalized ads
                based on user interests and browsing behavior.
              </p>

              <p className="mt-5 text-gray-600 leading-8">
                Google may use the DART cookie to serve ads based on users’ visits
                to this and other websites.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Cookies Policy
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                Cookies are small text files stored on your device to improve
                browsing experience, analyze traffic, and personalize content.
                Users can disable cookies through browser settings if preferred.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Third-Party Links
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                Our website may contain links to third-party websites for additional
                information or references. We are not responsible for the privacy
                practices or content of external websites.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Data Security
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                We take reasonable measures to protect user information against
                unauthorized access, misuse, or disclosure. However, no online
                platform can guarantee complete security.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Children’s Privacy
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                Vasudhev does not knowingly collect personal information from
                children under the age of 13. Parents are encouraged to monitor
                children's internet activity.
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 bg-white shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Changes To This Policy
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                We may update this Privacy Policy from time to time. Changes will
                be posted on this page with updated information.
              </p>
            </div>

            {/* CONTACT */}
            <div className="rounded-3xl bg-gray-900 text-white p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Contact Us
              </h2>

              <p className="mt-5 text-gray-300 leading-8 max-w-2xl mx-auto">
                If you have any questions regarding this Privacy Policy, feel free
                to contact us through our contact page or email.
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
