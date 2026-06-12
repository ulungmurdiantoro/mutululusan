import { promises as fs } from "node:fs";
import path from "node:path";
import type { Order as PrismaOrder } from "@prisma/client";
import { isDatabaseConfigured, prisma } from "./db";

export type OrderStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "completed"
  | "expired"
  | "cancelled"
  | "refunded";

export interface OrderNotified {
  receipt?: boolean;
  reminderH3?: boolean;
  reminderH1?: boolean;
  recovery?: boolean;
}

export interface Order {
  orderId: string;
  userId: string | null;
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
  notified: OrderNotified;
  createdAt: string;
  updatedAt: string;
}

export type NewOrder = Omit<Order, "status" | "notified" | "createdAt" | "updatedAt">;

/**
 * Lapisan penyimpanan order. Bila DATABASE_URL aktif → PostgreSQL via Prisma.
 * Bila belum → file JSON lokal (.data/orders.json) agar situs tetap jalan tanpa
 * database. Setiap operasi DB dibungkus try/catch sehingga gangguan DB otomatis
 * jatuh ke file store, bukan menggagalkan checkout/webhook.
 */

/* ── File store (fallback) ──────────────────────────────────────── */
const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function fileReadAll(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function fileWriteAll(orders: Order[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

async function fileCreate(input: NewOrder): Promise<Order | null> {
  const now = new Date().toISOString();
  const order: Order = { ...input, status: "pending", notified: {}, createdAt: now, updatedAt: now };
  try {
    const orders = await fileReadAll();
    orders.push(order);
    await fileWriteAll(orders);
    return order;
  } catch (error) {
    console.error("[orders] gagal menyimpan order (file):", error);
    return null;
  }
}

async function fileUpdate(orderId: string, patch: Partial<Order>): Promise<Order | null> {
  try {
    const orders = await fileReadAll();
    const index = orders.findIndex((o) => o.orderId === orderId);
    if (index === -1) return null;
    orders[index] = { ...orders[index], ...patch, updatedAt: new Date().toISOString() };
    await fileWriteAll(orders);
    return orders[index];
  } catch (error) {
    console.error("[orders] gagal memperbarui order (file):", error);
    return null;
  }
}

/* ── Mapping Prisma → Order ──────────────────────────────────────── */
function mapRow(row: PrismaOrder): Order {
  return {
    orderId: row.orderId,
    userId: row.userId,
    programSlug: row.programSlug,
    programTitle: row.programTitle,
    batchId: row.batchId,
    batchStartDate: row.batchStartDate,
    batchEndDate: row.batchEndDate,
    buyerName: row.buyerName,
    email: row.email,
    whatsapp: row.whatsapp,
    institution: row.institution,
    qty: row.qty,
    tier: row.tier,
    subtotal: row.subtotal,
    discount: row.discount,
    couponCode: row.couponCode,
    total: row.total,
    status: row.status as OrderStatus,
    paymentChannel: row.paymentChannel,
    gatewayToken: row.gatewayToken,
    notified: (row.notified ?? {}) as OrderNotified,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/* ── API publik (dispatch DB ↔ file) ────────────────────────────── */
export async function createOrder(input: NewOrder): Promise<Order | null> {
  if (isDatabaseConfigured()) {
    try {
      const row = await prisma.order.create({
        data: {
          orderId: input.orderId,
          userId: input.userId,
          programSlug: input.programSlug,
          programTitle: input.programTitle,
          batchId: input.batchId,
          batchStartDate: input.batchStartDate,
          batchEndDate: input.batchEndDate,
          buyerName: input.buyerName,
          email: input.email,
          whatsapp: input.whatsapp,
          institution: input.institution,
          qty: input.qty,
          tier: input.tier,
          subtotal: input.subtotal,
          discount: input.discount,
          couponCode: input.couponCode,
          total: input.total,
          paymentChannel: input.paymentChannel,
          gatewayToken: input.gatewayToken,
        },
      });
      return mapRow(row);
    } catch (error) {
      console.error("[orders] gagal simpan ke DB, fallback file:", error);
    }
  }
  return fileCreate(input);
}

export async function getOrder(orderId: string): Promise<Order | null> {
  if (isDatabaseConfigured()) {
    try {
      const row = await prisma.order.findUnique({ where: { orderId } });
      return row ? mapRow(row) : null;
    } catch (error) {
      console.error("[orders] gagal ambil dari DB, fallback file:", error);
    }
  }
  return (await fileReadAll()).find((o) => o.orderId === orderId) ?? null;
}

export async function updateOrder(orderId: string, patch: Partial<Order>): Promise<Order | null> {
  if (isDatabaseConfigured()) {
    try {
      // Hanya field yang memang diperbarui pemanggil (webhook/cron).
      const data: Record<string, unknown> = {};
      if (patch.status !== undefined) data.status = patch.status;
      if (patch.paymentChannel !== undefined) data.paymentChannel = patch.paymentChannel;
      if (patch.notified !== undefined) data.notified = patch.notified;
      if (patch.userId !== undefined) data.userId = patch.userId;
      const row = await prisma.order.update({ where: { orderId }, data });
      return mapRow(row);
    } catch (error) {
      console.error("[orders] gagal update DB, fallback file:", error);
    }
  }
  return fileUpdate(orderId, patch);
}

export async function listOrders(): Promise<Order[]> {
  if (isDatabaseConfigured()) {
    try {
      const rows = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
      return rows.map(mapRow);
    } catch (error) {
      console.error("[orders] gagal list DB, fallback file:", error);
    }
  }
  return (await fileReadAll()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Riwayat order milik pengguna (untuk dashboard /akun). Cocokkan userId atau email. */
export async function listOrdersForUser(userId: string, email: string): Promise<Order[]> {
  if (isDatabaseConfigured()) {
    try {
      const rows = await prisma.order.findMany({
        where: { OR: [{ userId }, { email }] },
        orderBy: { createdAt: "desc" },
      });
      return rows.map(mapRow);
    } catch (error) {
      console.error("[orders] gagal list user DB, fallback file:", error);
    }
  }
  return (await fileReadAll())
    .filter((o) => o.userId === userId || o.email === email)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
