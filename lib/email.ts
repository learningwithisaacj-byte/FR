// /lib/email.ts

import nodemailer, { type Transporter } from "nodemailer";
import {
  EVENT_NAME,
  EVENT_DATE_LABEL,
  EVENT_VENUE,
  EVENT_CITY,
  CONTACT_EMAIL,
  CONTACT_PHONE_NUMBERS,
  SOCIAL_LINKS,
} from "@/lib/constants/site";

interface EmailParticipant {
  fullName: string;
  email: string;
  participantCode: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn(
      "SMTP not configured — skipping email (set SMTP_HOST, SMTP_USER, SMTP_PASS)"
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
  return transporter;
}

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  const transport = getTransporter();
  if (!transport) return false;

  const from =
    process.env.SMTP_FROM ?? `"${EVENT_NAME}" <${process.env.SMTP_USER}>`;
  try {
    await transport.sendMail({ from, to, subject, html });
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    return false;
  }
}

function emailLayout(bodyHtml: string): string {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
    <div style="background: #0f172a; color: #ffffff; padding: 24px; border-radius: 8px 8px 0 0;">
      <h1 style="margin: 0; font-size: 20px;">${EVENT_NAME}</h1>
      <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">by FindingRoots</p>
    </div>
    <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
      ${bodyHtml}
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #64748b; margin: 0;">
        Questions? Reach us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        or call ${CONTACT_PHONE_NUMBERS.join(" / ")}.<br />
        <a href="${SOCIAL_LINKS.website}">${SOCIAL_LINKS.website}</a>
      </p>
    </div>
  </div>`;
}

function eventDetailsHtml(): string {
  return `
      <table style="font-size: 14px; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 4px 12px 4px 0; color: #64748b;">Date</td><td style="padding: 4px 0;"><strong>${EVENT_DATE_LABEL}</strong></td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #64748b;">Venue</td><td style="padding: 4px 0;"><strong>${EVENT_VENUE}, ${EVENT_CITY}</strong></td></tr>
      </table>`;
}

export async function sendRegistrationConfirmation(
  participant: EmailParticipant
): Promise<boolean> {
  const html = emailLayout(`
      <p style="font-size: 15px;">Hi ${escapeHtml(participant.fullName)},</p>
      <p style="font-size: 15px;">Thank you for registering for <strong>${EVENT_NAME}</strong>. Your registration is confirmed.</p>
      <p style="font-size: 15px; background: #f1f5f9; padding: 12px 16px; border-radius: 6px;">
        Your participant code: <strong>${participant.participantCode}</strong><br />
        <span style="font-size: 13px; color: #64748b;">Please keep this code handy — you'll need it at the event.</span>
      </p>
      ${eventDetailsHtml()}
      <p style="font-size: 15px;">We look forward to seeing you there!</p>`);

  return sendEmail(
    participant.email,
    `Registration confirmed — ${EVENT_NAME}`,
    html
  );
}

export async function sendEventReminder(
  participant: EmailParticipant
): Promise<boolean> {
  const html = emailLayout(`
      <p style="font-size: 15px;">Hi ${escapeHtml(participant.fullName)},</p>
      <p style="font-size: 15px;"><strong>${EVENT_NAME}</strong> is tomorrow — we're excited to see you there!</p>
      ${eventDetailsHtml()}
      <p style="font-size: 15px; background: #f1f5f9; padding: 12px 16px; border-radius: 6px;">
        Your participant code: <strong>${participant.participantCode}</strong><br />
        <span style="font-size: 13px; color: #64748b;">Have it ready at check-in.</span>
      </p>`);

  return sendEmail(
    participant.email,
    `Reminder: ${EVENT_NAME} is tomorrow — ${EVENT_DATE_LABEL}`,
    html
  );
}
