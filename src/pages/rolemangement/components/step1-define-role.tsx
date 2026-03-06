

import { AlertCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface Props {
  roleName: string;
  onChange: (v: string) => void;
  error: string;
}

export default function Step1DefineRole({ roleName, onChange, error }: Props) {
  return (
    <div className="space-y-5">
      {/* Info banner */}
      <div className="flex items-start gap-3 p-3.5 bg-muted/60 border border-border rounded-lg text-sm text-muted-foreground">
        <AlertCircleIcon className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
        <span>
          All three steps are mandatory. The <strong className="text-foreground">"Assign"</strong> button
          will only enable when all steps are valid.
        </span>
      </div>

      {/* Role name field */}
      <div className="space-y-2">
        <Label htmlFor="roleName" className="text-sm font-medium">
          Role Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="roleName"
          placeholder="e.g. Site Auditor, Quality Inspector"
          value={roleName}
          onChange={(e) => onChange(e.target.value)}
          className={error ? "border-destructive" : ""}
          autoFocus
        />
        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Enter a descriptive name for this custom role
          </p>
        )}
      </div>
    </div>
  );
}