import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";


export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Home Page
      <Link href='/login'>Log In</Link>
      <Link href='/signup'>Sign Up</Link>
      {user && (
        <form action="/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </form>
      )}

    </div>
  );
}
