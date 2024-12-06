"use client";

import { useTaskList } from "@/context/TaskListContext";
import TaskCard from "./TaskCard";
import { memo } from "react";
import TaskListHeader from "./TaskListHeader";

function TaskList() {
  const { items, activeHeader } = useTaskList();

  return (
    <div>
      <TaskListHeader />
      {items[activeHeader ?? "all"]?.items?.map((task) => (
        <TaskCard key={task.id} item={task} />
      ))}
    </div>
  );
}

export default memo(TaskList);
