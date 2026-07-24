// /types/participant.ts

export type RegistrationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type InvolvementType =
  | "KEYNOTE_SPEAKER"
  | "PANELIST"
  | "OBSERVER"
  | "SPONSOR";

export interface Participant {
  id: string;
  participantCode: string;
  fullName: string;
  email: string;
  mobile: string;
  linkedinUrl: string | null;
  designation: string;
  company: string;
  industry: string;
  companySize: string;
  city: string;
  involvementType: InvolvementType;
  consent: boolean;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardCounts {
  total: number;
  today: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ParticipantsResponse {
  participants: Participant[];
  pagination: Pagination;
}