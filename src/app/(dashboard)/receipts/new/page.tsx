"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createReceipt, type ReceiptState } from "@/app/actions/receipts";

const initialState: ReceiptState = {};

export default function NewReceiptPage() {
  const [state, formAction, pending] = useActionState(createReceipt, initialState);

  return (
    <div>
      <div className="mb-6">
        <Link href="/receipts" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← Back to receipts
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
          Add receipt
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Upload a photo or enter details manually.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="store_name" className="block text-sm font-medium text-zinc-700">
              Store name
            </label>
            <input
              id="store_name"
              type="text"
              name="store_name"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              placeholder="Target, Amazon, Nordstrom…"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="order_number" className="block text-sm font-medium text-zinc-700">
                Order number
              </label>
              <input
                id="order_number"
                type="text"
                name="order_number"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                placeholder="Optional"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-zinc-700">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                name="amount"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="purchase_date" className="block text-sm font-medium text-zinc-700">
                Purchase date
              </label>
              <input
                id="purchase_date"
                type="date"
                name="purchase_date"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label htmlFor="return_window_end" className="block text-sm font-medium text-zinc-700">
                Return window ends
              </label>
              <input
                id="return_window_end"
                type="date"
                name="return_window_end"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="receipt_image" className="block text-sm font-medium text-zinc-700">
              Receipt photo
            </label>
            <input
              id="receipt_image"
              type="file"
              name="receipt_image"
              accept="image/*"
              className="mt-1 block w-full text-sm text-zinc-600 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200"
            />
            <p className="mt-1 text-xs text-zinc-400">PNG or JPG, max 10MB. Optional.</p>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600" role="alert">
              {state.error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/receipts"
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save receipt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}