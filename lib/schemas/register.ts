// /lib/schemas/register.ts

import { z } from "zod";

export const involvementTypeValues = [
  "KEYNOTE_SPEAKER",
  "PANELIST",
  "OBSERVER",
  "SPONSOR",
] as const;

export const industryOptions = [
  "Information Technology",
  "GCC / Shared Services",
  "BFSI",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Consulting",
  "Other",
] as const;

// Accepts: 9876543210, +919876543210, 919876543210, 09876543210
// Indian mobile numbers start with 6, 7, 8, or 9 after the optional country code / leading 0.
const INDIAN_MOBILE_REGEX = /^(?:\+91|91|0)?[6-9]\d{9}$/;

// Common free/personal email providers — not accepted as a work email.
const BLOCKED_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "rediffmail.com",
  "zoho.com",
];

function isCompanyEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) {
    return false;
  }
  return !BLOCKED_EMAIL_DOMAINS.includes(domain);
}

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is too short").max(120),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .refine(isCompanyEmail, {
      message: "Please use your company email — personal addresses (Gmail, Yahoo, etc.) aren't accepted",
    }),
  mobile: z
    .string()
    .trim()
    .regex(INDIAN_MOBILE_REGEX, "Enter a valid Indian mobile number"),
  linkedinUrl: z
    .string()
    .trim()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  designation: z.string().trim().min(2, "Designation is required").max(120),
  company: z.string().trim().min(2, "Company name is required").max(120),
  industry: z.string().trim().min(2, "Industry is required").max(120),
  
  // OPTIONAL / DEFAULTS: Allows empty string "" so it won't block validation
  companySize: z.string().trim().max(50).optional().or(z.literal("")),
  
  city: z.string().trim().min(2, "City is required").max(100),
  involvementType: z.enum(involvementTypeValues, {
    message: "Please select how you'd like to be involved",
  }),
  
  // REMOVED: consent checkbox requirement
});

export type RegisterInput = z.infer<typeof registerSchema>;