import CreateBlogPage from "./page";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CreateLayout() {

  return <CreateBlogPage />
}