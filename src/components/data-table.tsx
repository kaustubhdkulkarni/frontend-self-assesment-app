// ─────────────────────────────────────────────
// FILE: src/components/data-table.tsx
//
// REUSABLE DataTable — works for ANY page.
// Pass `columns`, `data`, and optional `actions`.
//
// HOW TO USE:
//   import DataTable from "@/components/data-table";
//   import type { ColumnDef, RowAction } from "@/types/table";
//
//   const columns: ColumnDef<User>[] = [
//     { key: "empId",    header: "Emp ID", width: "w-28" },
//     { key: "fullName", header: "Name",   render: (u) => <span>{u.fullName}</span> },
//   ];
//
//   const actions: RowAction<User>[] = [
//     { icon: <EyeIcon />, label: "View", onClick: (u) => openView(u) },
//   ];
//
//   <DataTable columns={columns} data={filteredUsers} actions={actions} />
//
// Mobile: renders stacked cards automatically using columns[0] as title
// Desktop: renders a proper <table>
// ─────────────────────────────────────────────

import { Users } from "lucide-react";
import type { DataTableProps } from "@/types/table";

const HIDE_CLASSES = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

const ALIGN_HEADER = {
  left:   "text-left",
  center: "text-center",
  right:  "text-right",
};

const ALIGN_CELL = {
  left:   "text-left",
  center: "text-center",
  right:  "text-right",
};

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  actions = [],
  emptyMessage = "No records found.",
  className = "",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`py-16 flex flex-col items-center gap-3 text-muted-foreground ${className}`}>
        <Users className="w-10 h-10 opacity-25" />
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      {/* ── DESKTOP TABLE ─────────────────────── */}
      <div className={`hidden md:block overflow-x-auto ${className}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    "px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                    ALIGN_HEADER[col.align ?? "left"],
                    col.hideBelow ? HIDE_CLASSES[col.hideBelow] : "",
                    col.width ?? "",
                  ].join(" ")}
                >
                  {col.header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                {columns.map((col) => {
                  const raw = (row as Record<string, unknown>)[col.key];
                  return (
                    <td
                      key={col.key}
                      className={[
                        "px-4 py-3.5",
                        ALIGN_CELL[col.align ?? "left"],
                        col.hideBelow ? HIDE_CLASSES[col.hideBelow] : "",
                      ].join(" ")}
                    >
                      {col.render ? col.render(row) : String(raw ?? "")}
                    </td>
                  );
                })}
                {actions.length > 0 && (
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      {actions
                        .filter((a) => !a.hidden?.(row))
                        .map((action) => (
                          <button
                            key={action.label}
                            title={action.label}
                            onClick={() => action.onClick(row)}
                            className={[
                              "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
                              action.danger
                                ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                            ].join(" ")}
                          >
                            {action.icon}
                          </button>
                        ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARDS ──────────────────────── */}
      <div className="md:hidden divide-y divide-border">
        {data.map((row) => {
          // First 2 columns = title row; rest = details
          const [titleCol, subCol, ...restCols] = columns;
          return (
            <div key={row.id} className="px-4 py-4 space-y-3">
              {/* Title row */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">
                    {titleCol.render
                      ? titleCol.render(row)
                      : String((row as Record<string, unknown>)[titleCol.key] ?? "")}
                  </div>
                  {subCol && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {subCol.render
                        ? subCol.render(row)
                        : String((row as Record<string, unknown>)[subCol.key] ?? "")}
                    </div>
                  )}
                </div>
                {/* Show last column (usually badge/status) on the right */}
                {restCols.length > 0 && (
                  <div className="flex-shrink-0">
                    {(() => {
                      const last = restCols[restCols.length - 1];
                      const raw = (row as Record<string, unknown>)[last.key];
                      return last.render ? last.render(row) : String(raw ?? "");
                    })()}
                  </div>
                )}
              </div>

              {/* Middle columns as key-value pairs */}
              {restCols.slice(0, -1).map((col) => {
                const raw = (row as Record<string, unknown>)[col.key];
                return (
                  <div key={col.key} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{col.header}</span>
                    <span className="text-foreground font-medium">
                      {col.render ? col.render(row) : String(raw ?? "")}
                    </span>
                  </div>
                );
              })}

              {/* Action buttons */}
              {actions.length > 0 && (
                <div className="flex items-center gap-1.5 pt-1">
                  {actions
                    .filter((a) => !a.hidden?.(row))
                    .map((action) => (
                      <button
                        key={action.label}
                        onClick={() => action.onClick(row)}
                        className={[
                          "flex-1 flex items-center justify-center gap-1.5 h-8 px-3 rounded-md border text-xs font-medium transition-colors",
                          action.danger
                            ? "border-destructive/30 text-destructive hover:bg-destructive/10"
                            : "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
                        ].join(" ")}
                      >
                        <span className="w-3.5 h-3.5">{action.icon}</span>
                        {action.label}
                      </button>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}