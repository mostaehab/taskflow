"use client";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { teamMembers } from "@/utils/team";

const TaskSchema = z.object({
  taskTitle: z.string().min(2, "Name is too short"),
  taskDescription: z.string().min(10, "Description is too short"),
  status: z.enum(["backlog", "inProgress", "done"]),
  urgency: z.enum(["high", "medium", "low"]),
  assignee: z.string().min(1, "Pick an assignee"),
});

type TaskFormValues = z.infer<typeof TaskSchema>;

const urgencyOptions: { value: TaskFormValues["urgency"]; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statusOptions: { value: TaskFormValues["status"]; label: string }[] = [
  { value: "backlog", label: "Backlog" },
  { value: "inProgress", label: "In Progress" },
  { value: "done", label: "Done" },
];

type AddNewTaskProps = {
  onClose?: () => void;
  onSubmit?: (values: TaskFormValues) => void;
  taskStatus: TaskFormValues["status"];
};

const AddNewTask = ({ onClose, onSubmit, taskStatus }: AddNewTaskProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      taskTitle: "",
      taskDescription: "",
      status: taskStatus,
      urgency: "medium",
      assignee: "me",
    },
  });

  const submit = handleSubmit((values) => {
    onSubmit?.(values);
    onClose?.();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md rounded-xl border border-border bg-surface shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Add New Task
          </span>

          <XIcon
            onClick={onClose}
            className="size-7 cursor-pointer rounded-md p-1 text-foreground-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-foreground"
          />
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5 p-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Title
            </span>
            <input
              type="text"
              autoFocus
              placeholder="e.g. Migrate session storage to Redis"
              aria-invalid={!!errors.taskTitle}
              {...register("taskTitle")}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/30"
            />
            {errors.taskTitle && (
              <span className="mt-1.5 block text-xs font-medium text-danger">
                {errors.taskTitle.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Description
            </span>
            <textarea
              placeholder="e.g. Migrate session storage to Redis"
              aria-invalid={!!errors.taskDescription}
              {...register("taskDescription")}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/30"
            ></textarea>
            {errors.taskDescription && (
              <span className="mt-1.5 block text-xs font-medium text-danger">
                {errors.taskDescription.message}
              </span>
            )}
          </label>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Status
            </span>
            <div className="flex gap-2">
              {statusOptions.map((option) => (
                <label key={option.value} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("status")}
                    className="peer sr-only"
                  />
                  <span className="flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground-secondary transition-colors duration-150 hover:bg-surface-hover peer-checked:border-primary peer-checked:bg-primary-soft peer-checked:text-primary">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Urgency
            </span>
            <div className="flex gap-2">
              {urgencyOptions.map((option) => (
                <label key={option.value} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("urgency")}
                    className="peer sr-only"
                  />
                  <span className="flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground-secondary transition-colors duration-150 hover:bg-surface-hover peer-checked:border-primary peer-checked:bg-primary-soft peer-checked:text-primary">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Assignee
            </span>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((member) => (
                <label
                  key={member.id}
                  className="cursor-pointer"
                  title={`${member.name} · ${member.role}`}
                >
                  <input
                    type="radio"
                    value={member.id}
                    {...register("assignee")}
                    className="peer sr-only"
                  />
                  <span className="block rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-surface transition-all duration-150 peer-checked:ring-primary peer-focus-visible:ring-primary/50">
                    <Avatar name={member.name} size="md" />
                  </span>
                </label>
              ))}
            </div>
            {errors.assignee && (
              <span className="mt-1.5 block text-xs font-medium text-danger">
                {errors.assignee.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AddNewTask);
