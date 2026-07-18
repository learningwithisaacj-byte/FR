// /app/api/admin/participants/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
import { Prisma, RegistrationStatus } from "@/src/generated/prisma/client";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20")));
  const search = searchParams.get("search")?.trim();
  const statusParam = searchParams.get("status");

  const where: Prisma.ParticipantWhereInput = {};

  if (statusParam && statusParam in RegistrationStatus) {
    where.status = statusParam as RegistrationStatus;
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { participantCode: { contains: search, mode: "insensitive" } },
    ];
  }

  const [participants, total] = await Promise.all([
    prisma.participant.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.participant.count({ where }),
  ]);

  return NextResponse.json({
    participants,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}