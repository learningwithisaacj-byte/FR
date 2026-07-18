// /app/api/admin/dashboard/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { RegistrationStatus } from "@/src/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [total, today, pending, confirmed, cancelled] = await Promise.all([
    prisma.participant.count(),
    prisma.participant.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.participant.count({ where: { status: RegistrationStatus.PENDING } }),
    prisma.participant.count({ where: { status: RegistrationStatus.CONFIRMED } }),
    prisma.participant.count({ where: { status: RegistrationStatus.CANCELLED } }),
  ]);

  return NextResponse.json({ total, today, pending, confirmed, cancelled });
}