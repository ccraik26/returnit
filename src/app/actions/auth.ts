export async function signUp(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    const supabase = await createClient();

    const fullName = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || password.length < 8) {
      return { error: "Email and a password of at least 8 characters are required." };
    }

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
      return { error: `Supabase error: ${error.message}` };
    }

    return { success: "Account created successfully! You can now log in." };
  } catch (err: any) {
    return { error: `Caught error: ${err?.message || "Unknown error"}` };
  }
}