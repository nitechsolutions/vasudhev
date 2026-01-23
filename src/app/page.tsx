
import CardList from "@/components/CardList";
import Featured from "@/components/Featured";
import HoroscopeCard from "@/components/HoroscopeCard";
// import SideList from "@/components/SideList";
// import type { Post } from "@/types/post";

// async function getData(endpoint: string) {
//   const res = await fetch(endpoint, { cache: "no-store" });
//   return res.ok ? res.json() : null;
// }

export default async function Home() {
 

  // const trendingRes = await getData("/api/posts?type=trending&limit=6");
  // const trendingPosts: Post[] = trendingRes?.posts || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-10">
         <Featured  />

        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
          <CardList />
        </section>
      </div>

      <aside>
        <HoroscopeCard />
        {/* <SideList trendingPost={trendingPosts} /> */}
      </aside>
    </div>
  );
}
