// ─────────────────────────────────────────────
// FILE: src/components/page-header.tsx
//
// Reusable page-level header.
// Use on every dashboard page for consistency.
//
// USAGE:
//   <PageHeader
//     title="User Management"
//     subtitle="Manage system users, roles, and permissions"
//   >
//     <Button>Add User</Button>    ← slots into the right side
//   </PageHeader>
// ─────────────────────────────────────────────

import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  // Buttons / actions rendered on the right
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}