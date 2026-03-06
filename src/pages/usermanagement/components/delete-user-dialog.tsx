// ─────────────────────────────────────────────
// FILE: src/pages/user-management/components/delete-user-dialog.tsx
//
// Confirmation dialog before deleting a user.
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
import { USER_MESSAGES } from "@/constants/messages";
import type { User } from "../types";

interface Props {
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteUserDialog({ user, onConfirm, onCancel }: Props) {
  return (
    <AlertDialog open={!!user} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{USER_MESSAGES.DELETE_CONFIRM_TITLE}</AlertDialogTitle>
          <AlertDialogDescription>
            {user ? USER_MESSAGES.DELETE_CONFIRM_DESC(user.fullName) : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}