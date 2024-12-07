"use client";

import { Task } from "@/lib/models";
import AvatarStack from "./AvatarStack";
import { classNames } from "@/lib/classUtil";
import { useTaskList } from "@/context/TaskListContext";

export default function TaskCard({ item }: { item: Task }) {
  const { markAsCompleted } = useTaskList();

  const toRender = item.users?.slice(0, Math.min(3, item.users.length));
  const remaining = item.users ? item.users.length - 3 : 0;

  const flipCompleted = () => {
    markAsCompleted?.(item.id);
  };

  return (
    <div className="flex flex-col rounded-lg bg-white shadow-sm p-8 my-4">
      <div className="pb-8 m-0 mb-8 border-b border-gray-300 ">
        <div className="flex items-center justify-between p-0">
          <div>
            <h1
              className={classNames(
                "text-2xl font-medium",
                item.completed && "line-through"
              )}
            >
              {item.title}
            </h1>
            <h2 className="text-gray-400 text-lg mt-2">{item.project.title}</h2>
          </div>
          <button
            className={classNames(
              "flex items-center justify-center w-12 h-12 rounded-full",
              item.completed ? "bg-customBlue" : "border border-gray-300"
            )}
            onClick={flipCompleted}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between p-0">
        <div className="sm:flex gap-4">
          <p className="text-gray-700">Today</p>
          <p className="text-gray-400">{`${item.startAt} - ${item.endAt}`}</p>
        </div>
        <AvatarStack items={toRender} remaining={remaining} />
      </div>
    </div>
  );
}
