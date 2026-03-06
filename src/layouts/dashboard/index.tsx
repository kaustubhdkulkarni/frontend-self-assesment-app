import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import { menuItems } from "./sidebar/use-menu-items";
import Header from "./header";
import { useState } from "react";

// ─────────────────────────────────────────────
// DASHBOARD LAYOUT
//
// Wraps every dashboard page with:
//   ┌─────────┬──────────────────────────┐
//   │         │  Header (title changes)  │
//   │ Sidebar │──────────────────────────│
//   │         │  <Outlet /> (page here)  │
//   └─────────┴──────────────────────────┘
//
// Title in Header is auto-derived from the
// current route by matching against menuItems.
// You never need to pass a title manually.
//
// To add a new page to the dashboard:
//   1. Create the page in src/pages/
//   2. Add its path to ROUTE_PATHS in constants/enums.js
//   3. Add a nav entry in sidebar/use-menu-items.ts
//   4. Add the <Route> in routes/private.route.tsx
// ─────────────────────────────────────────────


export default function DashboardLayout() {
  const { pathname } = useLocation();

  // Mobile: sidebar closed by default; Desktop: open by default
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derive page title from current route
  const currentItem = menuItems.find((item) => item.path === pathname);
  const pageTitle = currentItem?.label ?? "Dashboard";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-muted">

      {/* ─── MOBILE BACKDROP ── Visible only on mobile when sidebar is open Clicking it closes the sidebar.*/}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ─── SIDEBAR ───Mobile  : fixed overlay, slides in/out Desktop : static, always visible */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30
          lg:static lg:z-auto lg:flex lg:flex-shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ─── MAIN CONTENT ─────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-background">
        {/* Header — hamburger button lives here */}
        <Header
          title={pageTitle}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Page content scrollable area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}