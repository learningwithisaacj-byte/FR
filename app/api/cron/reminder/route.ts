// /app/api/cron/reminder/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEventReminder } from "@/lib/email";
import { EVENT_DATE_ISO } from "@/lib/constants/site";

// Hit daily by a cron scheduler (see vercel.json). Only actually sends within
// the 26 hours before the event starts, so the schedule doesn't need to know
// the event date — and re-runs are safe because reminderSentAt marks who has
// already been emailed.
const REMINDER_WINDOW_HOURS = 26;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hoursUntilEvent =
    (new Date(EVENT_DATE_ISO).getTime() - Date.now()) / 3_600_000;
  if (hoursUntilEvent < 0 || hoursUntilEvent > REMINDER_WINDOW_HOURS) {
    return NextResponse.json({ sent: 0, skipped: "outside reminder window" });
  }

  const participants = await prisma.participant.findMany({
    where: { status: { not: "CANCELLED" }, reminderSentAt: null },
    select: { id: true, fullName: true, email: true, participantCode: true },
  });

  let sent = 0;
  let failed = 0;
  for (const participant of participants) {
    const ok = await sendEventReminder(participant);
    if (ok) {
      await prisma.participant.update({
        where: { id: participant.id },
        data: { reminderSentAt: new Date() },
      });
      sent++;
    } else {
      failed++;
    }
  }

  return NextResponse.json({ sent, failed });
}
