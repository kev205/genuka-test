"use client";

import { useSearchParams } from "next/navigation";
import ActivityList from "./ActivityList";
import MessageList from "./MessageList";
import TaskList from "./TaskList";
import { useMemo } from "react";

export default function ListContainer() {
  const searchParams = useSearchParams();

  const currentScreen = useMemo(() => {
    const tab = searchParams.get("tab") ?? "today";

    switch (tab) {
      case "messages":
        return <MessageList />;
      case "activities":
        return <ActivityList />;
      default:
        return <TaskList />;
    }
  }, [searchParams]);

  return <div>{currentScreen}</div>;
}
