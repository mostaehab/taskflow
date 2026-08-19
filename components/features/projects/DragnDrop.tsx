"use client";
import { memo, useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import TaskContainer from "./TaskContainer";
import TaskCard from "./TaskCard";
import AddNewTask from "./AddNewTask";
import { useModal } from "@/hooks/useModal";
type Urgency = "high" | "medium" | "low";
type TaskStatus = "backlog" | "inProgress" | "done";

type Task = {
  id: string;
  title: string;
  urgency: Urgency;
  createdAt: string;
  assignee: string;
  comments: number;
};

const initialColumns: Record<string, Task[]> = {
  Backlog: [
    {
      id: "TR-66",
      title: "Remove DEV_AUTH_BYPASS from every non-local environment",
      urgency: "high",
      createdAt: "Mar 5",
      assignee: "Leo Martins",
      comments: 4,
    },
    {
      id: "TR-71",
      title: "Add rate limiting to the public API gateway",
      urgency: "medium",
      createdAt: "Mar 6",
      assignee: "Marcus Lee",
      comments: 1,
    },
    {
      id: "TR-73",
      title: "Document the onboarding flow for new engineers",
      urgency: "low",
      createdAt: "Mar 7",
      assignee: "Sara Osman",
      comments: 0,
    },
  ],
  "In Progress": [
    {
      id: "TR-58",
      title: "Migrate session storage to Redis",
      urgency: "high",
      createdAt: "Mar 2",
      assignee: "Marcus Lee",
      comments: 2,
    },
    {
      id: "TR-62",
      title: "Refactor the project navigation breadcrumb",
      urgency: "medium",
      createdAt: "Mar 4",
      assignee: "Jane Doe",
      comments: 3,
    },
  ],
  Done: [
    {
      id: "TR-49",
      title: "Set up CI pipeline for preview deploys",
      urgency: "medium",
      createdAt: "Feb 27",
      assignee: "David Kim",
      comments: 1,
    },
    {
      id: "TR-51",
      title: "Fix flaky calendar timezone test",
      urgency: "low",
      createdAt: "Feb 28",
      assignee: "Jane Doe",
      comments: 0,
    },
  ],
};

const DragnDrop = () => {
  const [columns, setColumns] = useState(initialColumns);
  const { open: onOpen, close, isOpen } = useModal(false);
  const [currentColumn, setCurrentColumn] = useState<TaskStatus>("backlog");
  const snapshot = useRef(columns);

  const statusByColumn: Record<string, TaskStatus> = {
    Backlog: "backlog",
    "In Progress": "inProgress",
    Done: "done",
  };

  const open = (title: string) => {
    setCurrentColumn(statusByColumn[title]);
    onOpen();
  };

  return (
    <>
      <DragDropProvider
        onDragStart={() => {
          snapshot.current = columns;
        }}
        onDragOver={(event) => setColumns((columns) => move(columns, event))}
        onDragEnd={(event) => {
          if (event.canceled) setColumns(snapshot.current);
        }}
      >
        <div className="flex flex-row gap-4 min-h-0 flex-1 w-full overflow-x-auto p-4">
          {Object.entries(columns).map(([title, tasks]) => (
            <TaskContainer key={title} title={title} onOpen={open}>
              <div className="flex min-h-0 flex-col gap-3 overflow-y-auto">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    urgency={task.urgency}
                    createdAt={task.createdAt}
                    assignee={task.assignee}
                    comments={task.comments}
                    index={index}
                    column={title}
                  />
                ))}
              </div>
            </TaskContainer>
          ))}
        </div>
      </DragDropProvider>
      {isOpen && <AddNewTask onClose={close} taskStatus={currentColumn} />}
    </>
  );
};

export default memo(DragnDrop);
