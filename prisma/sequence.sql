-- /prisma/sequence.sql
-- Sequence used to generate human-readable participant codes (FR2030-001, FR2030-002, ...).
-- Prisma doesn't manage sequences declaratively, so this is applied as a manual migration step.

CREATE SEQUENCE IF NOT EXISTS participant_code_seq START 1;