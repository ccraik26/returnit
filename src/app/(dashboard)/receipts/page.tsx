import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { daysUntil, formatCurrency } from "@/lib/utils";

export default async function ReceiptsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: receipts } = await supabase
    .from("receipts")
    .select("*")
    .eq("user_id", user!.id)
    .order("return_window_end", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Receipts</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Your receipt vault. We’ll remind you before windows close.
          </p>
        </div>
        <Link
          href="/receipts/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Add receipt
        </Link>
      </div>

      <div className="mt-8">
        {!receipts || receipts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <p className="text-zinc-600">No receipts yet.</p>
            <Link
              href="/receipts/new"
              className="mt-4 inline-block text-sm font-medium text-zinc-900 underline"
            >
              Add your first receipt
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {receipts.map((r: any) => {
              const days = daysUntil(r.return_window_end);
              const urgent = days !== null && days <= 7 && days >= 0;
              const expired = days !== null && days < 0;

              return (
                <li key={r.id}>
                  <Link
                    href={`/receipts/${r.id}`}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-4 hover:border-zinc-300"
                  >
                    <div>
                      <div className="font-medium text-zinc-900">{r.store_name}</div>
                      <div className="mt-0.5 text-sm text-zinc-500">
                        {r.order_number ? `#${r.order_number} · ` : ""}
                        {formatCurrency(r.amount, r.currency)}
                      </div>
                    </div>
                    <div className="text-right">
                      {r.return_window_end && (
                        <div
                          className={`text-sm font-medium ${
                            expired
                              ? "text-red-600"
                              : urgent
                              ? "text-amber-600"
                              : "text-zinc-600"
                          }`}
                        >
                          {expired
                            ? "Window closed"
                            : days === 0
                            ? "Due today"
                            : days === 1
                            ? "1 day left"
                            : `${days} days left`}
                        </div>
                      )}
                      <div className="mt-0.5 text-xs capitalize text-zinc-400">{r.status}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}