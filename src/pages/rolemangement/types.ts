// ─────────────────────────────────────────────
// FILE: src/pages/custom-roles/types.ts
// ─────────────────────────────────────────────

import type { PrimaryRole, PermissionKey } from "@/constants/enum";

export interface AssignedEmployee {
  id: string;
  empId: string;
  fullName: string;
  primaryRole: PrimaryRole;
}

export interface CustomRole {
  id: string;
  roleName: string;
  assignedEmployees: AssignedEmployee[];
  permissions: PermissionKey[];
  createdBy: string;
  createdAt: string; // ISO date string
}

// Wizard form state — built up across 3 steps
export interface CustomRoleFormData {
  roleName: string;
  assignedEmployeeIds: string[];
  permissions: PermissionKey[];
}