import { redirect } from "next/navigation";
import Sidebar from "../components/dashboard/Sidebar";
import { getUserWithRole } from "@/lib/service/auth.server";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithRole();

 if (!user || user.role === "reader") {
  redirect("/login");
}

  return (
    <div className="min-h-screen flex w-6xl">
      <Sidebar user={user} />

      <main className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}