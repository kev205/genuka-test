export interface Task {
  id: string;
  title: string;
  project: any;
  startAt?: string;
  endAt?: string;
  users?: any[];
  status?: string;
  checked?: boolean;
}
