export async function signUp(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const fullName = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || password.length < 8) {
    return { error: "Email and a password of at least 8 characters are required." };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || null,
        },
      },
    });

    if (error) {
      console.error("Supabase signUp error:", error);
      return { error: error.message };
    }

    revalidatePath("/", "layout");
    redirect("/receipts");
  } catch (err: any) {
    console.error("Unexpected signUp error:", err);
    return { error: err?.message || "Something went wrong. Please try again." };
  }
}