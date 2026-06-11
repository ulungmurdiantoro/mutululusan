const SNAP_SANDBOX_URL = "https://app.sandbox.midtrans.com/snap/v1/transactions";
const SNAP_PRODUCTION_URL = "https://app.midtrans.com/snap/v1/transactions";

export function isMidtransProduction(): boolean {
  return process.env.NEXT_PUBLIC_MIDTRANS_PRODUCTION === "true";
}

export function isMidtransConfigured(): boolean {
  return Boolean(process.env.MIDTRANS_SERVER_KEY);
}

export interface SnapTransactionPayload {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  item_details: {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }[];
  customer_details: {
    first_name: string;
    email: string;
    phone: string;
  };
  expiry: {
    unit: "minutes" | "hours" | "days";
    duration: number;
  };
}

export interface SnapTransactionResult {
  token: string;
  redirect_url: string;
}

export async function createSnapTransaction(
  payload: SnapTransactionPayload,
): Promise<SnapTransactionResult> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    throw new Error("MIDTRANS_SERVER_KEY belum dikonfigurasi");
  }

  const url = isMidtransProduction() ? SNAP_PRODUCTION_URL : SNAP_SANDBOX_URL;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Midtrans Snap error ${response.status}: ${body}`);
  }

  return response.json();
}

export async function verifyWebhookSignature(notification: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
}): Promise<boolean> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return false;

  const raw = `${notification.order_id}${notification.status_code}${notification.gross_amount}${serverKey}`;
  const digest = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(raw));
  const expected = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expected === notification.signature_key;
}

export function generateOrderId(): string {
  const now = new Date();
  const stamp = now
    .toISOString()
    .slice(2, 19)
    .replace(/[-:T]/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MTL-${stamp}-${random}`;
}
