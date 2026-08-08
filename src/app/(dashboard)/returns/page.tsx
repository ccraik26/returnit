import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ReturnsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs } = await supabase
    .from("returns")
    .select("*, receipts(store_name, order_number)")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Returns</h1>
          <p className="mt-1 text-sm text-zinc-600">Active and past return jobs.</p>
        </div>
        <Link
          href="/returns/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Request pickup
        </Link>
      </div>

      <div className="mt-8">
        {!jobs || jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <p className="text-zinc-600">No return jobs yet.</p>
            <Link
              href="/returns/new"
              className="mt-4 inline-block text-sm font-medium text-zinc-900 underline"
            >
              Schedule your first pickup
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {jobs.map((job: any) => (
              <li key={job.id}>
                <Link
                  href={`/returns/${job.id}`}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-4 hover:border-zinc-300"
                >
                  <div>
                    <div className="font-medium text-zinc-900">
                      {job.receipts?.store_name || "Return job"}
                    </div>
                    <div className="mt-0.5 text-sm text-zinc-500 capitalize">
                      {job.type.replace("_", " ")} · {job.status.replace("_", " ")}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}