export default function ContactPage() {
  return (
    <main className="max-w-6xl bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-700">
              Contact Us
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Get In Touch With
              <span className="text-blue-600"> Vasudhev</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Have questions, suggestions, business inquiries, or feedback?
              We would love to hear from you. Feel free to contact us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Contact Information
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                For collaborations, advertising, guest posts, technical support,
                or general queries, you can connect with us using the information below.
              </p>

              <div className="space-y-6 mt-10">
                <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold">Email Address</h3>
                  <p className="mt-3 text-gray-600 text-sm leading-7">
                    contact@vasudhev.com
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold">Business Inquiry</h3>
                  <p className="mt-3 text-gray-600 text-sm leading-7">
                    For sponsorships, promotions, and partnerships.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold">Content Support</h3>
                  <p className="mt-3 text-gray-600 text-sm leading-7">
                    Report issues, corrections, or suggest new blog topics.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-sm bg-white">
              <h2 className="text-3xl font-bold tracking-tight">
                Send A Message
              </h2>

              <form className="mt-10 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Write your message..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gray-900 text-white p-10 lg:p-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
              Frequently Asked Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-lg font-semibold">
                  Do you accept guest posts?
                </h3>
                <p className="mt-3 text-gray-300 leading-7 text-sm">
                  Yes, quality and original guest posts related to tech, finance,
                  and automobile topics are accepted.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  How fast do you reply?
                </h3>
                <p className="mt-3 text-gray-300 leading-7 text-sm">
                  Usually within 24 to 48 hours depending on the inquiry.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Can I advertise on Vasudhev?
                </h3>
                <p className="mt-3 text-gray-300 leading-7 text-sm">
                  Yes, business promotions and advertising opportunities are available.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Do you provide product reviews?
                </h3>
                <p className="mt-3 text-gray-300 leading-7 text-sm">
                  Yes, we publish detailed informational reviews and comparison blogs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
