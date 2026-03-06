import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { menuItems } from "./use-menu-items";
import logo from "@/assets/logo.jpeg";


interface SidebarProps {
  onClose?: () => void;
}

// ─────────────────────────────────────────────
// SIDEBAR — MOBILE FIRST
//
// Mobile  (< lg):
//   Full-height panel, w-64, with X close button
//   in the top-right corner.
//
// Desktop (lg+):
//   Static sidebar, collapse toggle (<</>>) button
//   on the right edge shrinks it to icon-only (w-16).
//
// Nav items come from use-menu-items.ts only.
// ─────────────────────────────────────────────

export default function Sidebar({ onClose }: SidebarProps) {
  // Desktop-only collapse state (has no effect on mobile)
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`relative flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* ── Logo / Brand row ── */}
      <div className="flex items-center gap-3 px-3 py-3 border-b border-sidebar-border min-h-14 md:min-h-16">
        {collapsed ? (
          /* Collapsed: small square thumbnail */
          <div className="shrink-0 w-8 h-8 rounded-md overflow-hidden bg-secondary flex items-center justify-center mx-auto">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          /* Expanded: full logo image + optional X on mobile */
          <>
            <div className="flex-1 min-w-0 flex items-center">
              <img
                src={logo}
                alt="KD Aher Building Systems"
                className="h-9 md:h-10 w-auto max-w-full object-contain"
              />
            </div>

            {/* X close button — mobile only */}
            {onClose && (
              <button
                onClick={onClose}
                className="shrink-0 lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                aria-label="Close sidebar"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={onClose} // auto-close sidebar on mobile when nav item tapped
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* ── Desktop collapse toggle ── Hidden on mobile (lg:flex), sits on right edge.Collapses sidebar to icon-only (w-16 / w-64).
      ── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRightIcon className="w-3 h-3" />
        ) : (
          <ChevronLeftIcon className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
}
