import { redirect } from "next/navigation";
import { getUserWithRole } from "./auth.server";

/* -------- GENERAL AUTH -------- */
export async function requireAuth() {
  const data = await getUserWithRole();

  if (!data?.user) {
    redirect("/login");
  }

  return data;
}

/* -------- DASHBOARD ACCESS -------- */
export async function requireDashboardAccess() {
  const data = await requireAuth();

  if (data.role === "reader") {
    redirect("/");
  }

  return data;
}