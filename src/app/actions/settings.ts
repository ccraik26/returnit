"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateNotificationPrefs(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const reminderDays = Number(formData.get("reminder_days"));

  if (!reminderDays || isNaN(reminderDays)) {
    return;
  }

  await supabase
    .from("profiles")
    .update({
      notification_prefs: {
        email: true,
        push: true,
        reminder_days: reminderDays,
      },
    })
    .eq("id", user.id);

  revalidatePath("/settings");
}