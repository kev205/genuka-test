import { statuses } from "@/lib/constants";

const usersPool = ["kevin", "ulrich", "junior", "lel", "lol", "lal", "lil"];

export const tasks = Array.from({ length: 10 }, (_, index) => {
  const id = (index + 1).toString();
  return {
    id,
    title: `Task ${id}`,
    project: { title: `Project ${Math.ceil((index + 1) / 2)}` },
    startAt: `${(8 + index) % 12 || 12}:00 ${index % 2 === 0 ? "AM" : "PM"}`,
    endAt: `${(9 + index) % 12 || 12}:30 ${index % 2 === 0 ? "AM" : "PM"}`,
    checked: index % 2 === 0,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    users: usersPool.slice(0, (index % usersPool.length) + 2),
  };
});
