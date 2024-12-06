import { tasks } from "@/__mock__/tasks";
import TaskCard from "./TaskCard";
import { statuses } from "@/lib/constants";
import { classNames } from "@/lib/classUtil";

export default function TaskList() {
  return (
    <div>
      <div className="flex items-center justify-between">
        {["All", ...statuses].map((status) => (
          <button
            key={status}
            className={classNames(
              "flex-1 flex items-center justify-center text-sm font-medium text-gray-300 hover:text-customBlue focus:text-customBlue gap-2",
                status === "All" && "border-r-2 border-gray-300"
            )}
          >
            <span>{status}</span>
            <span className="flex items-center justify-center text-sm font-medium text-white bg-gray-300 hover:bg-customBlue focus:bg-customBlue relative h-8 w-8 rounded-full border-2">
              {status === "All" ? 10 : 5}
            </span>
          </button>
        ))}
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} item={task} />
      ))}
    </div>
  );
}
