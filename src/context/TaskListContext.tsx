"use client";

import { tasks } from "@/__mock__/tasks";
import { statuses } from "@/lib/constants";
import { Task } from "@/lib/models";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type HeaderCount = Record<
  string,
  {
    total: number;
    items: Task[];
  }
>;

interface TaskListContextType {
  items: HeaderCount;
  activeHeader?: string;
  setActiveHeader?: Dispatch<SetStateAction<string>>;
  markAsCompleted?: ((id: string) => void) | undefined;
}

export const TaskListContext = createContext<TaskListContextType>({
  items: {},
});

export function useTaskList() {
  const value = useContext(TaskListContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useTaskList must be wrapped in a <TaskListProvider />");
    }
  }

  return value;
}

export function TaskListProvider({ children }: PropsWithChildren) {
  const [activeHeader, setActiveHeader] = useState("all");
  const [source, setSource] = useState(tasks);
  const [items, setItems] = useState<HeaderCount>({});

  useEffect(() => {
    const polling = setInterval(() => {
      /* we can make a polling to get new data */
      setSource(tasks); // similutate an api fetch
    }, 300000); // every 5 minutes

    return () => clearInterval(polling);
  }, []);

  useEffect(() => {
    const data = statuses
      .map((status) => {
        const list = source.filter((task) => task.status.id === status.id);
        return {
          id: status.id,
          total: list.length,
          items: list,
        };
      })
      .reduce((acc, item) => {
        if (!acc[item.id]) acc[item.id] = { ...item };
        return acc;
      }, {} as HeaderCount);
    data["all"] = { total: source.length, items: source };
    setItems(data);
  }, [source]);

  const markAsCompleted = useCallback(
    (id: string) => {
      const tmp = [...source];
      const index = tmp.findIndex((task) => task.id === id);
      if (index > -1) {
        tmp[index] = {
          ...tmp[index],
          completed: !tmp[index].completed,
        };
      }
      setSource(tmp);
    },
    [source]
  );

  const contextValue = useMemo(() => ({ items }), [items]);

  return (
    <TaskListContext.Provider
      value={{
        ...contextValue,
        activeHeader,
        setActiveHeader,
        markAsCompleted,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
}
