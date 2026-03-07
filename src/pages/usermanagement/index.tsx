// ─────────────────────────────────────────────
// FILE: src/pages/user-management/index.tsx
//
// User Management page.
// This file only orchestrates state + renders
// sub-components. Business logic lives in hooks,
// UI lives in ./components/
//
// FOLDER STRUCTURE:
//   user-management/
//   ├── index.tsx                  ← YOU ARE HERE
//   ├── types.ts                   ← User type
//   └── components/
//       ├── user-view-modal.tsx    ← Eye icon modal
//       ├── user-form-modal.tsx    ← Add/Edit form
//       └── delete-user-dialog.tsx ← Delete confirm
// ─────────────────────────────────────────────

import { useState, useMemo } from "react";
import {
  EyeIcon,
  PencilIcon,
  Trash2Icon,
  PlusIcon,
  UploadIcon,
  RefreshCwIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Common components
import PageHeader from "@/components/page-header";
import TableCard from "@/components/table-card";
import DataTable from "@/components/data-table";
import SearchFilterBar from "@/components/search-filter-bar";
import RoleBadge from "@/components/role-badge";

import type { ColumnDef, RowAction } from "@/types/table";

// Page-specific components
import UserViewModal from "./components/user-view-modal";
import UserFormModal from "./components/user-form-modal";
import DeleteUserDialog from "./components/delete-user-dialog";

// Data & types
import type { User, UserFormData } from "./types";
import { MOCK_USERS } from "@/mockdata/users";
import { PRIMARY_ROLE_OPTIONS } from "@/constants/enum";

// ── Empty form ───────────────────────────────

const EMPTY_FORM: UserFormData = {
  empId: "",
  fullName: "",
  mobile: "",
  email: "",
  primaryRole: "user_labor",
  customRole: null,
  designation: "",
  reportingSupervisor: null,
  reportingManager: null,
  roleLockStatus: "not_locked",
};

// ── Column definitions ───────────────────────

const USER_COLUMNS: ColumnDef<User>[] = [
  {
    key: "empId",
    header: "Emp ID",
    width: "w-28",
    render: (u) => (
      <span className="text-xs font-semibold text-foreground">{u.empId}</span>
    ),
  },
  {
    key: "fullName",
    header: "Name",
    render: (u) => (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="font-medium text-foreground text-sm">
          {u.fullName}
        </span>
      </div>
    ),
  },
  {
    key: "mobile",
    header: "Mobile",
    hideBelow: "lg",
    render: (u) => (
      <span className=" text-xs text-muted-foreground">{u.mobile}</span>
    ),
  },
  {
    key: "email",
    header: "Email",
    hideBelow: "lg",
    render: (u) => (
      <span className="text-xs text-muted-foreground">{u.email}</span>
    ),
  },
  {
    key: "primaryRole",
    header: "Primary Role",
    render: (u) => <RoleBadge role={u.primaryRole} />,
  },
];

// ── Page ─────────────────────────────────────

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  // Search & filter
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modal states
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form
  const [form, setForm] = useState<UserFormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof User, string>>
  >({});

  // Filtered data
  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchSearch =
        !q ||
        u.fullName.toLowerCase().includes(q) ||
        u.empId.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.mobile.includes(q);
      const matchRole = roleFilter === "all" || u.primaryRole === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  // ── Handlers ──────────────────────────────

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormErrors({});
    setIsAddOpen(true);
  }

  function openEdit(user: User) {
    setForm({ ...user });
    setFormErrors({});
    setEditUser(user);
  }

  function validateForm(): boolean {
    const e: Partial<Record<keyof User, string>> = {};
    if (!form.empId.trim()) e.empId = "Employee ID is required.";
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.designation.trim()) e.designation = "Designation is required.";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSaveAdd() {
    if (!validateForm()) return;
    setUsers((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    setIsAddOpen(false);
  }

  function handleSaveEdit() {
    if (!validateForm() || !editUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUser.id ? { ...form, id: editUser.id } : u,
      ),
    );
    setEditUser(null);
  }

  function handleDelete() {
    if (!deleteUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);
  }

  // ── Row actions ────────────────────────────

  const rowActions: RowAction<User>[] = [
    {
      icon: <EyeIcon className="w-4 h-4" />,
      label: "View",
      onClick: setViewUser,
    },
    {
      icon: <PencilIcon className="w-4 h-4" />,
      label: "Edit",
      onClick: openEdit,
    },
    {
      icon: <Trash2Icon className="w-4 h-4" />,
      label: "Delete",
      onClick: setDeleteUser,
      danger: true,
    },
  ];

  // ── Render ─────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageHeader
        title="All Users"
        subtitle="Manage system users, roles, and permissions"
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => alert("Sync — connect to API")}
        >
          <RefreshCwIcon className="w-4 h-4" /> True-in Sync
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => alert("Import — connect to file upload")}
        >
          <UploadIcon className="w-4 h-4" /> Import Data
        </Button>
        <Button size="sm" className="gap-2" onClick={openAdd}>
          <PlusIcon className="w-4 h-4" /> Add User
        </Button>
      </PageHeader>

      {/* Table card */}
      <TableCard
        title="All Users"
        description="Search and manage all system users"
        count={filteredUsers.length}
        footer={`Showing ${filteredUsers.length} of ${users.length} users`}
        searchArea={
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by name, ID, email..."
            filters={[
              {
                value: roleFilter,
                onChange: setRoleFilter,
                placeholder: "Filter by role",
                options: [
                  { value: "all", label: "All Roles" },
                  ...PRIMARY_ROLE_OPTIONS,
                ],
              },
            ]}
          />
        }
      >
        <DataTable
          columns={USER_COLUMNS}
          data={filteredUsers}
          actions={rowActions}
          emptyMessage="No users found. Try adjusting your search or filters."
        />
      </TableCard>

      {/* Modals */}
      <UserViewModal user={viewUser} onClose={() => setViewUser(null)} />
      <UserFormModal
        open={isAddOpen || !!editUser}
        mode={isAddOpen ? "add" : "edit"}
        form={form}
        errors={formErrors}
        onChange={(field, value) =>
          setForm((prev) => ({ ...prev, [field]: value }))
        }
        onClose={() => {
          setIsAddOpen(false);
          setEditUser(null);
        }}
        onSubmit={isAddOpen ? handleSaveAdd : handleSaveEdit}
      />
      <DeleteUserDialog
        user={deleteUser}
        onConfirm={handleDelete}
        onCancel={() => setDeleteUser(null)}
      />
    </div>
  );
}
