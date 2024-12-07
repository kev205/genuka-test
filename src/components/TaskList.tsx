"use client";

import { useTaskList } from "@/context/TaskListContext";
import TaskCard from "./TaskCard";
import { memo, startTransition, useCallback, useEffect, useState } from "react";
import TaskListHeader from "./TaskListHeader";
import { Reorder } from "framer-motion";
import { Task } from "@/lib/models";

function TaskList() {
  const { items, activeHeader, reOrder } = useTaskList();

  const [list, setList] = useState<Task[]>([]);

  useEffect(() => {
    setList(items[activeHeader ?? "all"]?.items ?? []);
  }, [items, activeHeader]);

  const onReorder = useCallback(
    (newList: Task[]) => {
      startTransition(() => {
        reOrder?.(newList, activeHeader);
      });
    },
    [activeHeader]
  );

  return (
    <div>
      <TaskListHeader />
      <Reorder.Group values={list} onReorder={onReorder} axis="y">
        {list?.map((task, index) => (
          <Reorder.Item value={task} key={task.id}>
            <TaskCard item={task} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default memo(TaskList);
