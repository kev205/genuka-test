"use client";

import { useTaskList } from "@/context/TaskListContext";
import TaskCard from "./TaskCard";
import { memo, startTransition, useCallback } from "react";
import TaskListHeader from "./TaskListHeader";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function TaskList() {
  const { items, activeHeader } = useTaskList();

  const onDragEnd = useCallback(
    (result: any) => {
      const sourceTId = result.draggeableId;
      const designationId =
        items[activeHeader ?? "all"]?.items[result.destination.index].id;
      // startTransition(() => {});
      console.log(result);
    },
    [items]
  );

  return (
    <div>
      <TaskListHeader />
      <DragDropContext onDragEnd={console.log}>
        <Droppable droppableId="tasks">
          {({ innerRef, droppableProps }) => (
            <ul ref={innerRef} {...droppableProps}>
              {items[activeHeader ?? "all"]?.items?.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <TaskCard
                      ref={provided.innerRef}
                      item={task}
                      {...provided.draggableProps}
                    />
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default memo(TaskList);
