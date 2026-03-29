import { getUserWithRole } from "@/lib/service/auth.server";
import Link from "next/link";


export default async function Home() {
const data = await getUserWithRole();


  return (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans ">
      Home Page
      {!data?.user && (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}

      {data?.user && (
        <form action="/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded ">
            Sign Out
          </button>
        </form>
      )}

    </div>
  );
}
