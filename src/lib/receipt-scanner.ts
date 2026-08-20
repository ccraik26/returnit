import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ScannedReceipt = {
  store_name: string | null;
  purchase_date: string | null; // YYYY-MM-DD
  total_amount: number | null;
  return_by_date: string | null; // YYYY-MM-DD
  currency: string | null;
  notes: string | null;
};

export async function scanReceipt(imageBase64: string): Promise<ScannedReceipt> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an expert at reading retail receipts. 
Extract the following information and return ONLY valid JSON with these exact keys:
{
  "store_name": "string or null",
  "purchase_date": "YYYY-MM-DD or null",
  "total_amount": number or null,
  "return_by_date": "YYYY-MM-DD or null",
  "currency": "USD or null",
  "notes": "any extra important info or null"
}

Rules:
- If a return window is given as "30 days" or "return by [date]", calculate the actual return_by_date from the purchase date.
- If no return information is found, set return_by_date to null.
- total_amount should be a number only (no $ sign).
- Be accurate. Prefer null over guessing.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract the receipt information from this image.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: 500,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return JSON.parse(content) as ScannedReceipt;
}