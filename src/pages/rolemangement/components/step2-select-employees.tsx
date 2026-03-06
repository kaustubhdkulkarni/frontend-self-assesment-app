// ─────────────────────────────────────────────
// FILE: src/pages/custom-roles/components/step2-select-employees.tsx
//
// Wizard Step 2: Multi-select searchable employee list.
// Shows employee name, ID, and their default role.
// Excludes super_admin employees by spec.
// ─────────────────────────────────────────────

import { useState } from "react";
import { SearchIcon, CheckIcon, XIcon, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import RoleBadge from "@/components/role-badge";
import { ASSIGNABLE_EMPLOYEES } from "@/mockdata/users";
import type { PrimaryRole } from "@/constants/enum";

interface EmployeeOption {
  id: string;
  empId: string;
  fullName: string;
  primaryRole: PrimaryRole;
  customRole: string | null;
}

interface Props {
  selected: string[]; // array of employee ids
  onChange: (ids: string[]) => void;
  error: string;
}

export default function Step2SelectEmployees({
  selected,
  onChange,
  error,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = ASSIGNABLE_EMPLOYEES.filter((e) => {
    const q = search.toLowerCase();
    return (
      !q ||
      e.fullName.toLowerCase().includes(q) ||
      e.empId.toLowerCase().includes(q)
    );
  });

  function toggle(id: string) {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  }

  const selectedEmployees = (ASSIGNABLE_EMPLOYEES as EmployeeOption[]).filter(
    (e) => selected.includes(e.id),
  );

  return (
    <div className="space-y-4">
      {/* Selected chips */}
      {selectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedEmployees.map((e) => (
            <span
              key={e.id}
              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
            >
              {e.fullName}
              <button
                onClick={() => toggle(e.id)}
                className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
              >
                <XIcon className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or employee ID..."
          className="pl-9 h-9 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Employee list */}
      <div className="border border-border rounded-lg overflow-hidden max-h-64 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No employees found
          </div>
        ) : (
          filtered.map((emp) => {
            const isSelected = selected.includes(emp.id);
            return (
              <button
                key={emp.id}
                onClick={() => toggle(emp.id)}
                className={[
                  "w-full flex items-center gap-3 px-3 py-3 text-left transition-colors border-b border-border last:border-0",
                  isSelected
                    ? "bg-primary/5 hover:bg-primary/10"
                    : "hover:bg-muted/40",
                ].join(" ")}
              >
                {/* Checkbox indicator */}
                <div
                  className={[
                    "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors",
                    isSelected ? "bg-primary border-primary" : "border-border",
                  ].join(" ")}
                >
                  {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                </div>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 text-primary" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {emp.fullName}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {emp.empId}
                  </p>
                </div>

                {/* Role */}
                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  <RoleBadge role={emp.primaryRole} />
                  {emp.customRole && (
                    <span className="text-xs text-muted-foreground">
                      {emp.customRole}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {selected.length === 0
          ? "Select one or more employees to assign this role"
          : `${selected.length} employee${selected.length > 1 ? "s" : ""} selected`}
      </p>
    </div>
  );
}
