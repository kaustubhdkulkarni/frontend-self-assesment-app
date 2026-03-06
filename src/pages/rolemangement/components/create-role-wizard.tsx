
import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import WizardStepper        from "./wizard-stepper";
import Step1DefineRole      from "./step1-define-role";
import Step2SelectEmployees from "./step2-select-employees";
import Step3SetPermissions  from "./step3-set-permissions";

import type { PermissionKey }       from "@/constants/enum";
import { ROLE_MESSAGES }            from "@/constants/messages";
import type { CustomRoleFormData } from "../types";

// ── Empty form ───────────────────────────────

const EMPTY: CustomRoleFormData = {
  roleName: "",
  assignedEmployeeIds: [],
  permissions: [],
};

// ── Props ────────────────────────────────────

interface Props {
  open: boolean;
  existingRoleNames: string[];       // for uniqueness check
  onClose: () => void;
  onSubmit: (data: CustomRoleFormData) => void;
}

// ── Component ────────────────────────────────

export default function CreateRoleWizard({
  open,
  existingRoleNames,
  onClose,
  onSubmit,
}: Props) {
  const [step,   setStep]   = useState(1);
  const [form,   setForm]   = useState<CustomRoleFormData>(EMPTY);
  const [errors, setErrors] = useState({ step1: "", step2: "", step3: "" });

  function resetAndClose() {
    setStep(1);
    setForm(EMPTY);
    setErrors({ step1: "", step2: "", step3: "" });
    onClose();
  }

  // ── Step validation ────────────────────────

  function validateStep1(): boolean {
    if (!form.roleName.trim()) {
      setErrors((e) => ({ ...e, step1: ROLE_MESSAGES.STEP1_INCOMPLETE }));
      return false;
    }
    const isDuplicate = existingRoleNames
      .map((n) => n.toLowerCase())
      .includes(form.roleName.trim().toLowerCase());
    if (isDuplicate) {
      setErrors((e) => ({ ...e, step1: ROLE_MESSAGES.ROLE_EXISTS(form.roleName.trim()) }));
      return false;
    }
    setErrors((e) => ({ ...e, step1: "" }));
    return true;
  }

  function validateStep2(): boolean {
    if (form.assignedEmployeeIds.length === 0) {
      setErrors((e) => ({ ...e, step2: ROLE_MESSAGES.STEP2_INCOMPLETE }));
      return false;
    }
    setErrors((e) => ({ ...e, step2: "" }));
    return true;
  }

  function validateStep3(): boolean {
    if (form.permissions.length === 0) {
      setErrors((e) => ({ ...e, step3: ROLE_MESSAGES.STEP3_INCOMPLETE }));
      return false;
    }
    setErrors((e) => ({ ...e, step3: "" }));
    return true;
  }

  // ── Navigation ─────────────────────────────

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleAssign() {
    if (validateStep1() && validateStep2() && validateStep3()) {
      onSubmit(form);
      resetAndClose();
    }
  }

  // ── Step label map ─────────────────────────

  const STEP_LABELS: Record<number, string> = {
    1: "Define Role",
    2: "Select Employees",
    3: "Set Permissions",
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Role — 3-Step Wizard</DialogTitle>
          <DialogDescription>
            Follow the steps to define a custom role and assign it to employees
          </DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <div className="py-2">
          <WizardStepper currentStep={step} />
        </div>

        {/* Step content */}
        <div className="min-h-[280px]">
          {step === 1 && (
            <Step1DefineRole
              roleName={form.roleName}
              onChange={(v) => setForm((f) => ({ ...f, roleName: v }))}
              error={errors.step1}
            />
          )}
          {step === 2 && (
            <Step2SelectEmployees
              selected={form.assignedEmployeeIds}
              onChange={(ids) => setForm((f) => ({ ...f, assignedEmployeeIds: ids }))}
              error={errors.step2}
            />
          )}
          {step === 3 && (
            <Step3SetPermissions
              selected={form.permissions as PermissionKey[]}
              onChange={(perms) => setForm((f) => ({ ...f, permissions: perms }))}
              error={errors.step3}
            />
          )}
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="outline" onClick={step === 1 ? resetAndClose : handleBack}>
            {step === 1 ? "Cancel" : (
              <span className="flex items-center gap-1">
                <ChevronLeftIcon className="w-4 h-4" /> Back
              </span>
            )}
          </Button>

          <div className="flex items-center gap-2">
            {/* Step counter */}
            <span className="text-xs text-muted-foreground">
              Step {step} of 3 — {STEP_LABELS[step]}
            </span>

            {step < 3 ? (
              <Button onClick={handleNext} className="gap-1">
                Next <ChevronRightIcon className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleAssign}
                disabled={form.permissions.length === 0}
              >
                Assign Role
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}