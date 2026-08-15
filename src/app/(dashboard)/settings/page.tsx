import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateNotificationPrefs } from "@/app/actions/settings";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("notification_prefs")
    .eq("id", user.id)
    .single();

  const currentDays =
    profile?.notification_prefs?.reminder_days ?? 7;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Manage your notification preferences.
        </p>
      </div>

      <div className="max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-zinc-900">
          Return window reminders
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Choose how many days before a return window closes you want to be notified.
        </p>

        <form action={updateNotificationPrefs} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="reminder_days"
              className="block text-sm font-medium text-zinc-700"
            >
              Remind me this many days before
            </label>
            <select
              id="reminder_days"
              name="reminder_days"
              defaultValue={currentDays}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="14">14 days before</option>
              <option value="10">10 days before</option>
              <option value="7">7 days before</option>
              <option value="5">5 days before</option>
              <option value="3">3 days before</option>
              <option value="1">1 day before</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Save preferences
          </button>
        </form>
      </div>
    </div>
  );
}