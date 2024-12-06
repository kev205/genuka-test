import { TaskStatus } from "./models";

export const statuses: TaskStatus[] = [
  { id: "open", label: "Open" },
  { id: "closed", label: "Closed" },
  { id: "archived", label: "Archived" },
];

export const tabs = [
  {
    id: "messages",
    label: "Messages",
  },
  { id: "today", label: "Today's Task" },
  { id: "activities", label: "Last Activity" },
];
