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
  markAsCompleted?: (id: string) => void;
  reOrder?: (list: Task[], tab?: string) => void;
  showAddTask?: boolean;
  setShowAddTask?: Dispatch<SetStateAction<boolean>>;
}

const storage = localStorage; // storage class

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
  const [source, setSource] = useState<Task[]>([]);
  const [items, setItems] = useState<HeaderCount>({});
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const tasksStr = storage.getItem("tasks");
    if (tasksStr) {
      const savedTasks: Task[] = JSON.parse(tasksStr);
      setSource(savedTasks);
    } else {
      setSource(tasks);
      storage.setItem("tasks", JSON.stringify(tasks));
    }
  }, []);

  /** order elements following orders id */
  const orderElementsWith = (elements: Task[], orders?: string[]) => {
    if (!orders || !orders.length) return elements;

    // Create a mapping from id to index
    const orderMap = new Map(orders.map((id, index) => [id, index]));

    // Sort using the mapping
    return elements.sort(
      (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0)
    );
  };

  useEffect(() => {
    const orders = JSON.parse(storage.getItem("orders") ?? JSON.stringify({}));
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

    // order
    if (orders) {
      Object.keys(data).forEach((key) => {
        data[key] = {
          ...data[key],
          items: orderElementsWith(data[key].items, orders[key]),
        };
      });
    }

    data["all"] = { total: source.length, items: source }; // add tata for `all` filter
    setItems(data);
    storage.setItem("tasks", JSON.stringify(source)); // save new data in storage
  }, [source]);

  // reorder list
  const reOrder = useCallback(
    (list: Task[], tab: string = "all") => {
      if (tab === "all") {
        setSource(list);
        storage.setItem("tasks", JSON.stringify(list));
      } else {
        setItems({ ...items, [tab]: { total: list.length, items: list } });
        // save new order for this list/tab
        const oldOrder = JSON.parse(
          storage.getItem("orders") ?? JSON.stringify({})
        );
        storage.setItem(
          "orders",
          JSON.stringify({
            ...oldOrder,
            [tab]: list.map((item) => item.id),
          })
        );
      }
    },
    [items]
  );

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
        reOrder,
        showAddTask,
        setShowAddTask,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
}
