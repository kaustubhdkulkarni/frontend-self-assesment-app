
import { CheckIcon } from "lucide-react";
import { PERMISSION_GROUPS, type PermissionKey } from "@/constants/enum";

interface Props {
  selected: PermissionKey[];
  onChange: (perms: PermissionKey[]) => void;
  error: string;
}

export default function Step3SetPermissions({ selected, onChange, error }: Props) {
  function togglePermission(key: PermissionKey) {
    onChange(
      selected.includes(key)
        ? selected.filter((p) => p !== key)
        : [...selected, key]
    );
  }

  function toggleGroup(keys: PermissionKey[]) {
    const allSelected = keys.every((k) => selected.includes(k));
    if (allSelected) {
      onChange(selected.filter((p) => !keys.includes(p)));
    } else {
      const newSet = new Set([...selected, ...keys]);
      onChange(Array.from(newSet));
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-xs text-destructive">{error}</p>}

      <p className="text-sm text-muted-foreground">
        Select the permissions to grant with this custom role.
      </p>

      {Object.entries(PERMISSION_GROUPS).map(([groupKey, group]) => {
        const groupPermKeys = group.permissions.map((p) => p.key as PermissionKey);
        const allGroupSelected = groupPermKeys.every((k) => selected.includes(k));
        const someGroupSelected = groupPermKeys.some((k) => selected.includes(k));

        return (
          <div key={groupKey} className="border border-border rounded-lg overflow-hidden">
            {/* Group header — click to select all */}
            <button
              onClick={() => toggleGroup(groupPermKeys)}
              className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{group.label}</p>
                <p className="text-xs text-muted-foreground">{group.description}</p>
              </div>
              {/* Select-all checkbox */}
              <div
                className={[
                  "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors",
                  allGroupSelected
                    ? "bg-primary border-primary"
                    : someGroupSelected
                    ? "bg-primary/30 border-primary"
                    : "border-border",
                ].join(" ")}
              >
                {allGroupSelected && <CheckIcon className="w-3 h-3 text-white" />}
                {someGroupSelected && !allGroupSelected && (
                  <div className="w-2 h-0.5 bg-primary rounded" />
                )}
              </div>
            </button>

            {/* Individual permissions */}
            <div className="divide-y divide-border">
              {group.permissions.map((perm) => {
                const key = perm.key as PermissionKey;
                const isChecked = selected.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => togglePermission(key)}
                    className={[
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      isChecked ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors",
                        isChecked ? "bg-primary border-primary" : "border-border",
                      ].join(" ")}
                    >
                      {isChecked && <CheckIcon className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{perm.label}</p>
                      <p className="text-xs text-muted-foreground font-mono">{perm.key}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <p className="text-xs text-muted-foreground">
        {selected.length === 0
          ? "No permissions selected"
          : `${selected.length} permission${selected.length > 1 ? "s" : ""} selected`}
      </p>
    </div>
  );
}