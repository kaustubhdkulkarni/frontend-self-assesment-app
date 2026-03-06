// ─────────────────────────────────────────────
// FILE: src/components/search-filter-bar.tsx
//
// Reusable search input + dropdown filter bar.
// Used in User Management, Custom Roles, etc.
//
// USAGE:
//   <SearchFilterBar
//     search={search}
//     onSearchChange={setSearch}
//     filters={[
//       {
//         value: roleFilter,
//         onChange: setRoleFilter,
//         placeholder: "Filter by role",
//         options: [
//           { value: "all", label: "All Roles" },
//           ...PRIMARY_ROLE_OPTIONS,
//         ],
//       },
//     ]}
//   />
// ─────────────────────────────────────────────

import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: FilterOption[];
  width?: string; // e.g. "sm:w-40"
}

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
}

export default function SearchFilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {/* Search input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-9 h-9 w-full sm:w-64 text-sm"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dynamic filter dropdowns */}
      {filters.map((filter, idx) => (
        <Select key={idx} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className={`h-9 text-sm w-full ${filter.width ?? "sm:w-44"}`}>
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}