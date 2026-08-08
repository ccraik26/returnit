"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ReceiptState = {
  error?: string;
};

export async function createReceipt(
  prevState: ReceiptState,
  formData: FormData
): Promise<ReceiptState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const storeName = (formData.get("store_name") as string)?.trim();
  const orderNumber = (formData.get("order_number") as string)?.trim() || null;
  const amountRaw = formData.get("amount") as string;
  const purchaseDate = (formData.get("purchase_date") as string) || null;
  const returnWindowEnd = (formData.get("return_window_end") as string) || null;
  const file = formData.get("receipt_image") as File | null;

  if (!storeName) {
    return { error: "Store name is required." };
  }

  let amount: number | null = null;
  if (amountRaw) {
    amount = parseFloat(amountRaw);
    if (isNaN(amount)) {
      return { error: "Invalid amount." };
    }
  }

  let imageUrls: string[] = [];

  if (file && file.size > 0) {
    if (file.size > 10 * 1024 * 1024) {
      return { error: "Image must be under 10MB." };
    }

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` };
    }

    imageUrls = [path];
  }

  const { data, error } = await supabase
    .from("receipts")
    .insert({
      user_id: user.id,
      store_name: storeName,
      order_number: orderNumber,
      amount,
      purchase_date: purchaseDate,
      return_window_end: returnWindowEnd,
      receipt_image_urls: imageUrls.length ? imageUrls : null,
      source: file && file.size > 0 ? "upload" : "manual",
      status: "active",
      currency: "USD",
    })
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/receipts");
  redirect(`/receipts/${data.id}`);
}