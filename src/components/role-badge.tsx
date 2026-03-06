import type { PrimaryRole } from "@/constants/enum";
import { PRIMARY_ROLE_LABELS } from "@/constants/enum";

// ─────────────────────────────────────────────
// ROLE BADGE
// Reusable badge showing role with consistent
// color coding across the whole app.
// ─────────────────────────────────────────────

const ROLE_STYLES: Record<PrimaryRole, string> = {
  super_admin: "bg-primary text-primary-foreground",
  manager:     "bg-secondary text-secondary-foreground",
  supervisor:  "bg-accent text-accent-foreground border border-border",
  user_labor:  "bg-muted text-muted-foreground border border-border",
};

interface RoleBadgeProps {
  role: PrimaryRole;
  className?: string;
}

export default function RoleBadge({ role, className = "" }: RoleBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
        ${ROLE_STYLES[role]} ${className}
      `}
    >
      {PRIMARY_ROLE_LABELS[role]}
    </span>
  );
}