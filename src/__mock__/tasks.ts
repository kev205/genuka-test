import { statuses } from "@/lib/constants";
import { Task } from "@/lib/models";

const usersPool = [
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-6.jpg",
  "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-14.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-1.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-9.jpg",
  "https://www.icon0.com/free/static2/preview2/stock-photo-avatar-male-in-glasses-people-icon-character-cartoon-33223.jpg",
  "https://i1.sndcdn.com/artworks-000486414654-mt7qdt-t500x500.jpg",
];

export const tasks: Task[] = Array.from({ length: 35 }, (_, index) => {
  const id = (index + 1).toString();
  return {
    id,
    title: `Task ${id}`,
    project: { title: `Project ${Math.ceil((index + 1) / 2)}` },
    startAt: `${(8 + index) % 12 || 12}:00 ${index % 2 === 0 ? "AM" : "PM"}`,
    endAt: `${(9 + index) % 12 || 12}:30 ${index % 2 === 0 ? "AM" : "PM"}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    users: usersPool.slice(0, (index % usersPool.length) + 2),
    completed: index % 2 === 0,
  };
});
