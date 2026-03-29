import { supabase } from "../supabase/client";

/* -------- LOGIN -------- */
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const user = data.user;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return {
    user,
    role: profile?.role,
  };
}

/* -------- SIGNUP -------- */
export async function signupUser(
  form: any,
  profileImage: File | null
) {
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  });

  if (error) throw new Error(error.message);

  const user = data.user;

  if (!user) throw new Error("Signup failed");

  let imageUrl = "";

  /* upload image */
  if (profileImage) {
    const fileExt = profileImage.name.split(".").pop();
    const fileName = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(fileName, profileImage, { upsert: true });

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrl } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    imageUrl = publicUrl.publicUrl;
  }

  /* insert profile */
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      full_name: form.full_name,
      contact_no: form.contact_no,
      profile_url: imageUrl,
      email: form.email,
      role: "reader",
    });

  if (profileError) throw new Error(profileError.message);

  return user;
}