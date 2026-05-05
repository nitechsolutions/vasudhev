import { supabase } from "../supabase/client";


export async function deletePost(postId: string) {
  try {    
    /* =========================
       1. FETCH IMAGE PATHS FIRST
    ========================= */
    const { data: translations, error: fetchError } = await supabase
      .from("post_translations")
      .select("image")
      .eq("post_id", postId);

    if (fetchError) throw fetchError;

    // Extract storage paths
    const imagePaths =
      translations
        ?.map((t) => {
          if (!t.image) return null;

          const parts = t.image.split("/blog-images/");
          return parts[1] || null;
        })
        .filter(Boolean) as string[];

    /* =========================
       2. DELETE TRANSLATIONS
    ========================= */
    const { error: transError } = await supabase
      .from("post_translations")
      .delete()
      .eq("post_id", postId);

    if (transError) throw transError;

    /* =========================
       3. DELETE POST
    ========================= */
    const { error: postError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (postError) throw postError;

    /* =========================
       4. DELETE IMAGES (NON-BLOCKING CLEANUP)
    ========================= */
    console.log("image path",imagePaths);
    
    if (imagePaths.length > 0) {
      const { data, error: storageError } = await supabase.storage
        .from("blog-images")
        .remove(imagePaths);

        console.log("STORAGE DELETE RESULT:", data, storageError);

      if (storageError) {
        console.warn("Image cleanup failed:", storageError.message);
        // don't throw → DB already clean
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error("Delete failed:", err);
    return { success: false, error: err.message };
  }
}