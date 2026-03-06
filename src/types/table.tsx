// ─────────────────────────────────────────────
// FILE: src/types/table.ts
//
// Shared type definitions for the reusable
// DataTable component. Import these wherever
// you define column configs for any table.
// ─────────────────────────────────────────────

import type { ReactNode } from "react";

// How one column is defined
export interface ColumnDef<T> {
  // Unique key matching a field in T (or any string for computed cols)
  key: string;
  // Column header label
  header: string;
  // Custom cell renderer — receives the row data
  // If omitted, falls back to String(row[key])
  render?: (row: T) => ReactNode;
  // Optional width class, e.g. "w-32" or "min-w-[120px]"
  width?: string;
  // Align header + cell content
  align?: "left" | "center" | "right";
  // Hide this column below a breakpoint
  hideBelow?: "sm" | "md" | "lg";
}

// What the action buttons column renders
export interface RowAction<T> {
  icon: ReactNode;
  label: string;
  onClick: (row: T) => void;
  // If true, hover turns red
  danger?: boolean;
  // Conditionally show/hide per row
  hidden?: (row: T) => boolean;
}

// DataTable component props
export interface DataTableProps<T extends { id: string }> {
  // The full column definitions
  columns: ColumnDef<T>[];
  // The filtered/sorted data to display
  data: T[];
  // Action buttons in the last column (optional)
  actions?: RowAction<T>[];
  // Shown when data is empty
  emptyMessage?: string;
  // Extra CSS on the wrapper
  className?: string;
}