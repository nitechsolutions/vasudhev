import { createServerSupabaseClient } from "../supabase/server";


export async function getDefaultLanguage() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("languages")
    .select("*")
    .eq("is_default", true)
    .single();

  return data; // { code: 'hi' }
}