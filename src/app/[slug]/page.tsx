// app/hi/post/[slug]/page.tsx  (SERVER)

import PostClient from "./PostClient";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return <PostClient slug={slug} />;
}
