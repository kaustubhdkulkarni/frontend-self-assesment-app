// ─────────────────────────────────────────────
// FILE: src/mockdata/custom-roles.ts
//
// Dummy data for Custom Roles page.
// Replace with real API calls.
// ─────────────────────────────────────────────

import type { CustomRole } from "@/pages/custom-roles/types";

export const MOCK_CUSTOM_ROLES: CustomRole[] = [
  {
    id: "cr1",
    roleName: "Project Lead",
    assignedEmployees: [
      { id: "2", empId: "MGR001", fullName: "Priya Desai",   primaryRole: "manager" },
    ],
    permissions: [
      "ASSESSMENT_CREATE",
      "DEPT_REVIEW_COMPLETION",
      "DEPT_VIEW_LOG_FORMS",
      "EXPORT_EXCEL",
    ],
    createdBy: "Arjun Sharma",
    createdAt: "2024-10-15",
  },
  {
    id: "cr2",
    roleName: "Safety Officer",
    assignedEmployees: [
      { id: "5", empId: "MGR002", fullName: "Kiran Mehta",   primaryRole: "manager" },
    ],
    permissions: [
      "VIEW_SYSTEM_LOGS",
      "DEPT_VIEW_LOG_FORMS",
      "TEAM_VIEW_LOG_FORMS",
    ],
    createdBy: "Arjun Sharma",
    createdAt: "2024-11-02",
  },
  {
    id: "cr3",
    roleName: "Quality Inspector",
    assignedEmployees: [
      { id: "6", empId: "SUP002", fullName: "Amit Joshi",    primaryRole: "supervisor" },
    ],
    permissions: [
      "TEAM_REVIEW_COMPLETION",
      "TEAM_VIEW_LOG_FORMS",
      "SUBMIT_ASSESSMENT",
    ],
    createdBy: "Arjun Sharma",
    createdAt: "2024-11-20",
  },
];