import { Metadata } from "next";
import CardList from "@/components/CardList";
import Featured from "@/components/Featured";
import HoroscopeCard from "@/components/HoroscopeCard";
import SideList from "@/components/SideList";

export const metadata: Metadata = {
  title: "Vasudhev | हिंदी न्यूज़, ताज़ा खबरें, ब्रेकिंग न्यूज़, Breaking News, Latest News, Top Headlines",
  description:
    "Vasudhev पर पढ़ें भारत, दुनिया, राजनीति, टेक्नोलॉजी और बिज़नेस, हेल्थ, लाइफस्टाइल, दिल्ली, मुंबई, पुणे और राशिफल की ताज़ा खबरें।",

  alternates: {
    canonical: "https://vasudhev.com/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Vasudhev | हिंदी न्यूज़ पोर्टल",
    description:
      "भारत और दुनिया की ताज़ा खबरें, ब्रेकिंग न्यूज़ और विश्लेषण।",
    url: "https://vasudhev.com/",
    siteName: "Vasudhev",
    locale: "hi_IN",
    type: "website",
  },
};

export default async function Home() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-10">
         <Featured  />

        <section>
          <h2 className="text-2xl font-bold mb-4">ताज़ा ख़बर</h2>
          <CardList />
        </section>
      </div>

      <aside>
        <HoroscopeCard />
        <SideList />
      </aside>
    </div>
  );
}
