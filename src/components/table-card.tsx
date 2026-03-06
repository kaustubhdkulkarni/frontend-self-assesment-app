// ─────────────────────────────────────────────
// FILE: src/components/table-card.tsx
//
// Card wrapper used around every DataTable.
// Provides: title + count, description,
// optional search/filter area, and a footer.
//
// USAGE:
//   <TableCard
//     title="All Users"
//     description="Search and manage all system users"
//     count={filteredUsers.length}
//     searchArea={<SearchFilterBar ... />}
//     footer={`Showing ${filtered} of ${total} users`}
//   >
//     <DataTable ... />
//   </TableCard>
// ─────────────────────────────────────────────

import type { ReactNode } from "react";

interface TableCardProps {
  title: string;
  description?: string;
  count?: number;
  searchArea?: ReactNode;
  footer?: string;
  children: ReactNode;
  className?: string;
}

export default function TableCard({
  title,
  description,
  count,
  searchArea,
  footer,
  children,
  className = "",
}: TableCardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {title}
            {count !== undefined && (
              <span className="ml-1.5 text-muted-foreground font-normal">
                ({count})
              </span>
            )}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {searchArea && <div>{searchArea}</div>}
      </div>

      {/* Content */}
      {children}

      {/* Footer */}
      {footer && (
        <div className="px-4 py-3 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground">{footer}</p>
        </div>
      )}
    </div>
  );
}