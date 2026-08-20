"use server";

import { scanReceipt } from "@/lib/receipt-scanner";

export async function scanReceiptAction(formData: FormData) {
  const file = formData.get("receipt_image") as File | null;

  if (!file || file.size === 0) {
    return { error: "No image provided" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const result = await scanReceipt(base64);
    return { success: true, data: result };
  } catch (err: any) {
    console.error("Scan failed:", err);
    return { error: err.message || "Failed to scan receipt" };
  }
}