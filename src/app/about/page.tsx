import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-6xl bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1 text-sm font-medium text-gray-700 bg-gray-50">
              About Vasudhev
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Reliable Hindi Blogs For
              <span className="text-blue-600"> Tech, Finance, Auto </span>
              & Everyday Digital Knowledge
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-3xl">
              Vasudhev is a modern Hindi blogging platform where readers can explore
              useful and simplified content related to technology, electric vehicles,
              smartphones, laptops, finance, investment awareness, online earning,
              and digital trends.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* LEFT SIDE */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Our Mission
              </h2>

              <p className="mt-6 text-gray-600 leading-8 text-base">
                The main goal of Vasudhev is to provide practical and easy-to-understand
                information in Hindi so every reader can stay updated with modern
                technology and smart financial decisions.
              </p>

              <p className="mt-5 text-gray-600 leading-8 text-base">
                We focus on creating detailed and SEO-friendly blogs that help users
                understand topics deeply instead of just reading short surface-level
                information. Every article is written with research, readability,
                and user value in mind.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-xl font-semibold">Technology</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-7">
                    Smartphones, laptops, gadgets, AI tools, apps, and digital updates.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-xl font-semibold">Automobile</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-7">
                    Electric vehicles, bikes, cars, EV comparisons, and auto news.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-xl font-semibold">Finance</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-7">
                    Investment awareness, savings tips, SIP basics, and money guidance.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                  <h3 className="text-xl font-semibold">Guides</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-7">
                    Beginner-friendly tutorials and helpful informational articles.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-8 lg:p-10 shadow-sm">
              <h2 className="text-3xl font-bold tracking-tight">
                Why Readers Trust Us
              </h2>

              <div className="space-y-7 mt-10">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    01
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      Research-Based Content
                    </h3>
                    <p className="mt-2 text-gray-600 leading-7 text-sm">
                      We gather information from trusted official sources and present
                      it in a simple format.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    02
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      Easy Hindi Language
                    </h3>
                    <p className="mt-2 text-gray-600 leading-7 text-sm">
                      Complex topics are explained in a reader-friendly Hindi language.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    03
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      User-Focused Blogging
                    </h3>
                    <p className="mt-2 text-gray-600 leading-7 text-sm">
                      Every article is written to solve real user queries and provide
                      meaningful value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    04
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      SEO & Performance Optimized
                    </h3>
                    <p className="mt-2 text-gray-600 leading-7 text-sm">
                      Optimized content structure for fast loading, readability, and
                      better search engine visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gray-900 px-8 py-14 md:px-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Learn Something Useful Every Day
            </h2>

            <p className="mt-5 text-gray-300 max-w-2xl mx-auto leading-8">
              Explore informative blogs about technology, EV cars, smartphones,
              finance, online earning, and modern digital lifestyle.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Explore Blogs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
