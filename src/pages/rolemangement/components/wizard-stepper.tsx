// ─────────────────────────────────────────────
// FILE: src/pages/custom-roles/components/wizard-stepper.tsx
//
// Visual step indicator for the 3-step wizard.
// ─────────────────────────────────────────────

import { CheckIcon } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: "Define Role" },
  { number: 2, label: "Select Employees" },
  { number: 3, label: "Set Permissions" },
];

interface Props {
  currentStep: number; // 1, 2, or 3
}

export default function WizardStepper({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between w-full">
      {STEPS.map((step, idx) => {
        const isDone    = step.number < currentStep;
        const isActive  = step.number === currentStep;
        const isPending = step.number > currentStep;

        return (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                  isDone   ? "bg-primary border-primary text-primary-foreground"   : "",
                  isActive ? "bg-background border-primary text-primary"           : "",
                  isPending? "bg-background border-border text-muted-foreground"   : "",
                ].join(" ")}
              >
                {isDone ? <CheckIcon className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={[
                  "text-xs text-center leading-tight",
                  isActive  ? "font-semibold text-primary"          : "",
                  isDone    ? "text-primary/80"                      : "",
                  isPending ? "text-muted-foreground"                : "",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {idx < STEPS.length - 1 && (
              <div
                className={[
                  "flex-1 h-0.5 mx-2 mb-5 transition-colors",
                  step.number < currentStep ? "bg-primary" : "bg-border",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}