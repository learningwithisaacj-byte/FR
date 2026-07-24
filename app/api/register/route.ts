// /app/api/register/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationConfirmation } from "@/lib/email";
import { registerSchema } from "@/lib/schemas/register";
import { Prisma } from "@/src/generated/prisma/client";

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const sequenceResult = await prisma.$queryRaw<{ nextval: bigint }[]>`
      SELECT nextval('participant_code_seq')
    `;
    const nextNumber = sequenceResult[0].nextval;
    const participantCode = `FR2030-${String(nextNumber).padStart(3, "0")}`;

    const participant = await prisma.participant.create({
      data: {
        participantCode,
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        linkedinUrl: data.linkedinUrl || undefined,
        designation: data.designation,
        company: data.company,
        industry: data.industry,
        companySize: data.companySize || "0",
        city: data.city,
        involvementType: data.involvementType,
      },
    });

    // Email failure must not fail the registration — the participant is
    // already saved; the admin dashboard remains the source of truth.
    await sendRegistrationConfirmation(participant).catch((error) => {
      console.error("Confirmation email failed:", error);
    });

    return NextResponse.json(
      { participantCode: participant.participantCode },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }
    console.error("Registration failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}