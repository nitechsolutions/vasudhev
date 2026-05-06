import EditPostPage from "./page";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditLayout() {

  return <EditPostPage />
}