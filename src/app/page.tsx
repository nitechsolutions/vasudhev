
import CardList from "@/components/CardList";
import Featured from "@/components/Featured";
import HoroscopeCard from "@/components/HoroscopeCard";
import SideList from "@/components/SideList";

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
