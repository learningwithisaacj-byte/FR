// /lib/schemas/status.ts

import { z } from "zod";

export const statusValues = ["PENDING", "CONFIRMED", "CANCELLED"] as const;

export const statusUpdateSchema = z.object({
  status: z.enum(statusValues),
});

export type StatusUpdateInput = z.infer<typeof statusUpdateSchema>;