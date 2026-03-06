// ─────────────────────────────────────────────
// FILE: src/pages/user-management/types.ts
// ─────────────────────────────────────────────

import type { PrimaryRole } from "@/constants/enum";

export interface User {
  id: string;
  empId: string;
  fullName: string;
  mobile: string;
  email: string;
  primaryRole: PrimaryRole;
  customRole: string | null;
  designation: string;
  reportingSupervisor: string | null;
  reportingManager: string | null;
  roleLockStatus: "locked" | "not_locked";
}

export type UserFormData = Omit<User, "id">;