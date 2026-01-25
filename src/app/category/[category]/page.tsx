import CategoryClient from "./CategoryClient";


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return <CategoryClient category={decodedCategory} />;
}
