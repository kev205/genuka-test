export interface TaskStatus {
  // pour eviter les differences genre All, all, Open, open, etc...
  id: string; // status id. ex: open
  label: string; // status label. ex: Open
}

export interface Task {
  id: string;
  title: string;
  project: any;
  startAt?: string;
  endAt?: string;
  users?: any[];
  status: TaskStatus;
  completed?: boolean;
}
