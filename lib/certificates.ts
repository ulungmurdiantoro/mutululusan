import type { Certificate, Order } from "@prisma/client";
import { isDatabaseConfigured, prisma } from "./db";

export type { Certificate };
export type CertificateWithOrder = Certificate & { order: Order };

export interface CertificateInput {
  number: string;
  orderId: string;
  userId?: string | null;
  participantName: string;
  programTitle: string;
  fileUrl: string;
}

/**
 * Sertifikat hanya bermakna bila DB aktif — diterbitkan admin setelah
 * pelatihan selesai, bukan bagian alur checkout kritikal.
 */
export async function listCertificatesForUser(userId: string): Promise<Certificate[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    return await prisma.certificate.findMany({
      where: { userId },
      orderBy: { issuedAt: "desc" },
    });
  } catch (error) {
    console.error("[certificates] gagal list sertifikat user:", error);
    return [];
  }
}

export async function listCertificatesForOrder(orderId: string): Promise<Certificate[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    return await prisma.certificate.findMany({ where: { orderId } });
  } catch (error) {
    console.error("[certificates] gagal list sertifikat order:", error);
    return [];
  }
}

export async function listAllCertificates(): Promise<CertificateWithOrder[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    return await prisma.certificate.findMany({
      include: { order: true },
      orderBy: { issuedAt: "desc" },
    });
  } catch (error) {
    console.error("[certificates] gagal list semua sertifikat:", error);
    return [];
  }
}

export async function createCertificate(input: CertificateInput): Promise<Certificate | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    return await prisma.certificate.create({
      data: {
        number: input.number,
        orderId: input.orderId,
        userId: input.userId ?? null,
        participantName: input.participantName,
        programTitle: input.programTitle,
        fileUrl: input.fileUrl,
      },
    });
  } catch (error) {
    console.error("[certificates] gagal buat sertifikat:", error);
    return null;
  }
}

export async function deleteCertificate(id: string): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;
  try {
    await prisma.certificate.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("[certificates] gagal hapus sertifikat:", error);
    return false;
  }
}
