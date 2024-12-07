"use client";

import { useTaskList } from "@/context/TaskListContext";
import { classNames } from "@/lib/classUtil";
import { statuses } from "@/lib/constants";
import { memo, useCallback, useTransition } from "react";

function TaskListHeader() {
  const { items, activeHeader, setActiveHeader } = useTaskList();

  const [pending, startTransition] = useTransition();

  const onClick = (id?: string) => {
    // in case of huge tasks list
    startTransition(() => {
      setActiveHeader?.(id as string);
    });
  };

  return (
    <div className="flex items-center justify-between">
      {pending && (
        <div className="flex justify-center items-center py-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {[{ id: "all", label: "All" }, ...statuses].map((status) => (
        <button
          key={status.id}
          className={classNames(
            "group flex-1 flex items-center justify-center text-sm font-medium text-gray-300 gap-2",
            status.id === "all" && "border-r-2 border-gray-300"
          )}
          onClick={() => onClick(status.id)}
          role="tab"
          tabIndex={0}
        >
          <span
            className={classNames(
              "group-hover:text-customBlue group-focus:text-customBlue",
              activeHeader === status.id ? "text-customBlue" : "text-gray-300"
            )}
          >
            {status.label}
          </span>
          {!!items[status.id] && (
            <span
              className={classNames(
                "flex items-center justify-center text-sm font-medium text-white group-hover:bg-customBlue group-focus:bg-customBlue relative h-8 w-8 rounded-full border-2",
                activeHeader === status.id ? "bg-customBlue" : "bg-gray-300"
              )}
            >
              {items[status.id].total}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default memo(TaskListHeader);
