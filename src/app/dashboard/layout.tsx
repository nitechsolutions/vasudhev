import { requireDashboardAccess } from "@/lib/service/auth.guard";

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

 await requireDashboardAccess();

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}