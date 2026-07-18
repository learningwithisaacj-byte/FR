// /app/api/admin/participants/[id]/status/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { statusUpdateSchema } from "@/lib/schemas/status";
import { getAdminFromRequest } from "@/lib/auth";
import { Prisma } from "@/src/generated/prisma/client";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = statusUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const participant = await prisma.participant.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ participant });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 });
    }
    console.error("Status update failed:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}