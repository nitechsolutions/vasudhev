import { redirect } from "next/navigation";
import LoginPage from "./page";
import { getUserWithRole } from "@/lib/service/auth.server";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginLayout() {
  const data = await getUserWithRole();

  /* 🔥 IF LOGGED IN → REDIRECT */
  if (data) {
    if (data.role === "admin" || data.role === "writer") {
      redirect("/dashboard");
    } else {
      redirect("/");
    }
  }

  return <LoginPage />;
}
