import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 md:mt-10 lg:mt-10 md:m-auto m-auto lg:m-auto items-center justify-center bg-gray-200 text-black">
      {/* ---------- TOP ---------- */}
      <div className="max-w-7xl md:m-auto m-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* BRAND */}
        <div className="items-center  m-auto">
            <img src="/vasudhev_tree2.png" alt="vasudhev_hindi_news" className="m-auto w-1/2 lg:w-1/2 md:w-full" />
          
          <p className="mt-2 text-sm leading-relaxed">
            Vasudhev Hindi News पर पढ़ें देश, दुनिया, राजनीति, बिज़नेस,
            टेक्नोलॉजी, हेल्थ और राशिफल की भरोसेमंद खबरें।
          </p>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">श्रेणियाँ</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/category/भारत">देश</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/category/एजुकेशन">एजुकेशन</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/category/ऑटोमोबाईल ">ऑटोमोबाईल</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/category/टेक्नोलॉजी">टेक्नोलॉजी</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/category/हेल्थ">हेल्थ</Link></li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">महत्वपूर्ण लिंक</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/about">About Us</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/contact">Contact</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/terms">Terms & Conditions</Link></li>
            <li><Link className="active:text-orange-600 hover:font-semibold" href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>

        {/* FOLLOW */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
          <div className="flex gap-4 text-sm">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 "
            >
              Facebook
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM ---------- */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-center text-gray-800">
          © {new Date().getFullYear()} Vasudhev Hindi News. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
