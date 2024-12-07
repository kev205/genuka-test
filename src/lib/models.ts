export interface TaskStatus {
  // pour eviter les differences genre All, all, Open, open, etc...
  id: string; // status id. ex: open
  label: string; // status label. ex: Open
}

interface Project {
  title: string;
}

export interface Task {
  id: string;
  title: string;
  project: Project;
  startAt?: string;
  endAt?: string;
  users?: string[];
  status: TaskStatus;
  completed?: boolean;
}
