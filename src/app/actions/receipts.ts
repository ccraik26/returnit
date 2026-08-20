"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { scanReceipt } from "@/lib/receipt-scanner";

export async function createReceipt(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const storeName = formData.get("store_name") as string;
  const purchaseDate = formData.get("purchase_date") as string;
  const totalAmount = formData.get("total_amount") as string;
  const returnByDate = formData.get("return_by_date") as string;
  const notes = formData.get("notes") as string;
  const file = formData.get("receipt_image") as File | null;

  let imagePath: string | null = null;
  let scannedData = null;

  // If an image was uploaded, scan it
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    try {
      scannedData = await scanReceipt(base64);
    } catch (err) {
      console.error("Receipt scan failed:", err);
      // Continue without scan results
    }

    // Upload image to Supabase Storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    if (!uploadError) {
      imagePath = fileName;
    }
  }

  // Prefer user-typed values, fall back to scanned values
  const finalStore = storeName || scannedData?.store_name || "Unknown Store";
  const finalPurchaseDate = purchaseDate || scannedData?.purchase_date;
  const finalTotal = totalAmount
    ? parseFloat(totalAmount)
    : scannedData?.total_amount;
  const finalReturnBy = returnByDate || scannedData?.return_by_date;
  const finalNotes = notes || scannedData?.notes;

  const { error } = await supabase.from("receipts").insert({
    user_id: user.id,
    store_name: finalStore,
    purchase_date: finalPurchaseDate,
    total_amount: finalTotal,
    return_by_date: finalReturnBy,
    notes: finalNotes,
    image_path: imagePath,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/receipts");
  return { success: true, scanned: scannedData };
}