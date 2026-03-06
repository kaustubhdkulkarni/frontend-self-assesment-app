// ─────────────────────────────────────────────
// FILE: src/pages/custom-roles/components/delete-role-dialog.tsx
// ─────────────────────────────────────────────

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ROLE_MESSAGES } from "@/constants/messages";
import type { CustomRole } from "../types";

interface Props {
  role: CustomRole | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteRoleDialog({ role, onConfirm, onCancel }: Props) {
  return (
    <AlertDialog open={!!role} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ROLE_MESSAGES.DELETE_CONFIRM_TITLE}</AlertDialogTitle>
          <AlertDialogDescription>
            {role ? ROLE_MESSAGES.DELETE_CONFIRM_DESC(role.roleName) : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Delete Role
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}