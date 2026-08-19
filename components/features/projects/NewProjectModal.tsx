"use client";
import { memo, useState } from "react";
import { XIcon, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { teamMembers } from "@/utils/team";
import { cn } from "@/utils/cn";

type NewProjectModalProps = {
  isOpen: boolean;
  close: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const NewProjectModal = ({ close }: NewProjectModalProps) => {
  const [selected, setSelected] = useState<string[]>(["me"]);
  const [priority, setPriority] = useState("medium");

  const toggleMember = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id],
    );

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg rounded-xl border border-border bg-surface shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              New project
            </span>
            <span className="text-sm text-foreground-secondary">
              Set it up and bring your team in.
            </span>
          </div>
          <XIcon
            onClick={close}
            className="size-7 shrink-0 cursor-pointer rounded-md p-1 text-foreground-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-foreground"
          />
        </div>

        <form
          className="flex flex-col gap-5 p-5"
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Project name
            </span>
            <input
              type="text"
              autoFocus
              placeholder="e.g. Billing platform revamp"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Description
            </span>
            <textarea
              placeholder="What is this project about?"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Priority
            </span>
            <div className="flex gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  aria-pressed={priority === option.value}
                  className={cn(
                    "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150",
                    priority === option.value
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border text-foreground-secondary hover:bg-surface-hover",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Team</span>
              <span className="text-xs text-foreground-muted tabular-nums">
                {selected.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((member) => {
                const isSelected = selected.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.id)}
                    aria-pressed={isSelected}
                    title={`${member.name} · ${member.role}`}
                    className={cn(
                      "relative rounded-full ring-2 ring-offset-2 ring-offset-surface transition-all duration-150 focus-visible:outline-none",
                      isSelected
                        ? "ring-primary"
                        : "ring-transparent hover:ring-border",
                    )}
                  >
                    <Avatar name={member.name} size="md" />
                    {isSelected && (
                      <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-foreground-inverse ring-2 ring-surface">
                        <Check className="size-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(NewProjectModal);
