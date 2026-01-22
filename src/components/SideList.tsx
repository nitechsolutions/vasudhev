import React from "react";

interface Author {
  name?: string;
}

export interface TrendingPost {
  _id: string;
  title: string;
  category: string;
  author?: Author | null;
}

interface SideListProps {
  trendingPost: TrendingPost[];
}

const SideList: React.FC<SideListProps> = ({ trendingPost }) => {
  return (
    <div className="mt-4 bg-gray-100 rounded-lg py-2 px-4 sticky top-10">
      <span className="text-black text-sm">What's hot</span>
      <h3 className="text-2xl font-bold mb-6">Trending 🔥</h3>

      <div className="space-y-6">
        {trendingPost.map((item) => (
          <div key={item._id} className="flex flex-col gap-2">
            <span className="px-3 py-1 text-black text-xs rounded-full w-fit bg-orange-600">
              {item.category}
            </span>

            <p className="font-medium">{item.title}</p>

            <span className="text-xs text-gray-500">
              {item.author?.name ?? "Unknown"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideList;
