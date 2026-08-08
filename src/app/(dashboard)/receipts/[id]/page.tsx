import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { daysUntil, formatCurrency } from "@/lib/utils";

export default async function ReceiptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: receipt } = await supabase
    .from("receipts")
    .select("*")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (!receipt) {
    notFound();
  }

  const days = daysUntil(receipt.return_window_end);

  return (
    <div>
      <div className="mb-6">
        <Link href="/receipts" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← Back to receipts
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
          {receipt.store_name}
        </h1>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-zinc-500">Order number</dt>
            <dd className="mt-0.5 font-medium">{receipt.order_number || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Amount</dt>
            <dd className="mt-0.5 font-medium">
              {formatCurrency(receipt.amount, receipt.currency)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Purchase date</dt>
            <dd className="mt-0.5 font-medium">{receipt.purchase_date || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Return window ends</dt>
            <dd className="mt-0.5 font-medium">
              {receipt.return_window_end || "—"}
              {days !== null && (
                <span className="ml-2 text-sm text-zinc-500">
                  ({days < 0 ? "closed" : days === 0 ? "today" : `${days} days left`})
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Status</dt>
            <dd className="mt-0.5 font-medium capitalize">{receipt.status}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <Link
            href={`/returns/new?receipt_id=${receipt.id}`}
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Request pickup
          </Link>
        </div>
      </div>
    </div>
  );
}