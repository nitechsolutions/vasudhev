import { getCurrentUserWithRole } from "@/lib/service/auth.service";
import { redirect } from "next/navigation";
import LoginPage from "./page";


export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginLayout() {
  const data = await getCurrentUserWithRole();

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