"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createReceipt } from "@/app/actions/receipts";
import { scanReceiptAction } from "@/app/actions/scan-receipt";

export default function NewReceiptPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [scanning, setScanning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form values
  const [storeName, setStoreName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [returnByDate, setReturnByDate] = useState("");
  const [notes, setNotes] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setError(null);
    setScanning(true);

    const formData = new FormData();
    formData.append("receipt_image", file);

    const result = await scanReceiptAction(formData);

    setScanning(false);

    if (result.error) {
      setError("Could not read the receipt. You can still fill the fields manually.");
      return;
    }

    if (result.data) {
      if (result.data.store_name) setStoreName(result.data.store_name);
      if (result.data.purchase_date) setPurchaseDate(result.data.purchase_date);
      if (result.data.total_amount) setTotalAmount(String(result.data.total_amount));
      if (result.data.return_by_date) setReturnByDate(result.data.return_by_date);
      if (result.data.notes) setNotes(result.data.notes);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("store_name", storeName);
    formData.append("purchase_date", purchaseDate);
    formData.append("total_amount", totalAmount);
    formData.append("return_by_date", returnByDate);
    formData.append("notes", notes);
    if (imageFile) {
      formData.append("receipt_image", imageFile);
    }

    const result = await createReceipt(formData);

    setSubmitting(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push("/receipts");
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Add receipt
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Upload a photo and we’ll try to fill in the details for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
            Receipt photo
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
          />
          {scanning && (
            <p className="mt-2 text-sm text-emerald-600 animate-pulse">
              Scanning receipt…
            </p>
          )}
        </div>

        {/* Store name */}
        <div>
          <label className="block text-sm font-medium text-zinc-700">Store name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="e.g. Target"
          />
        </div>

        {/* Purchase date */}
        <div>
          <label className="block text-sm font-medium text-zinc-700">Purchase date</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Total amount */}
        <div>
          <label className="block text-sm font-medium text-zinc-700">Total amount</label>
          <input
            type="number"
            step="0.01"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="0.00"
          />
        </div>

        {/* Return by date */}
        <div>
          <label className="block text-sm font-medium text-zinc-700">Return by date</label>
          <input
            type="date"
            value={returnByDate}
            onChange={(e) => setReturnByDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-zinc-700">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting || scanning}
          className="w-full rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Saving…" : "Save receipt"}
        </button>
      </form>
    </div>
  );
}