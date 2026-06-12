import { promises as fs } from "node:fs";
import path from "node:path";

export type OrderStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "completed"
  | "expired"
  | "cancelled"
  | "refunded";

export interface Order {
  orderId: string;
  programSlug: string;
  programTitle: string;
  batchId: string;
  batchStartDate: string;
  batchEndDate: string;
  buyerName: string;
  email: string;
  whatsapp: string;
  institution: string;
  qty: number;
  tier: string;
  subtotal: number;
  discount: number;
  couponCode: string | null;
  total: number;
  status: OrderStatus;
  paymentChannel: string | null;
  gatewayToken: string | null;
  /** Penanda apakah notifikasi sudah dikirim, agar tidak dobel. */
  notified: { receipt?: boolean; reminderH3?: boolean; reminderH1?: boolean; recovery?: boolean };
  createdAt: string;
  updatedAt: string;
}

export type NewOrder = Omit<Order, "status" | "notified" | "createdAt" | "updatedAt">;

/**
 * Penyimpanan order berbasis file JSON. Cukup untuk MVP & pengembangan lokal.
 * Untuk produksi serverless (Vercel), ganti implementasi ini dengan
 * PostgreSQL (Supabase/Neon) + Prisma — antarmuka fungsi di bawah dipertahankan
 * agar pemanggil (checkout, webhook, admin) tidak perlu berubah.
 */
const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function readAll(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeAll(orders: Order[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export async function createOrder(input: NewOrder): Promise<Order | null> {
  const now = new Date().toISOString();
  const order: Order = {
    ...input,
    status: "pending",
    notified: {},
    createdAt: now,
    updatedAt: now,
  };
  try {
    const orders = await readAll();
    orders.push(order);
    await writeAll(orders);
    return order;
  } catch (error) {
    // Jangan gagalkan checkout hanya karena store tidak bisa ditulis
    // (mis. filesystem read-only). Transaksi Midtrans tetap valid.
    console.error("[orders] gagal menyimpan order:", error);
    return null;
  }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const orders = await readAll();
  return orders.find((o) => o.orderId === orderId) ?? null;
}

export async function updateOrder(
  orderId: string,
  patch: Partial<Order>,
): Promise<Order | null> {
  try {
    const orders = await readAll();
    const index = orders.findIndex((o) => o.orderId === orderId);
    if (index === -1) return null;
    orders[index] = { ...orders[index], ...patch, updatedAt: new Date().toISOString() };
    await writeAll(orders);
    return orders[index];
  } catch (error) {
    console.error("[orders] gagal memperbarui order:", error);
    return null;
  }
}

export async function listOrders(): Promise<Order[]> {
  const orders = await readAll();
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
