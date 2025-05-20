// src/types/taskTypes.ts

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export type TaskProps = {
  task: Task;
  toggleTask: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  updateTask: (taskId: number, newName: string) => void;
};

export type TaskListProps = {
  tasks: Task[];
  toggleTask: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  updateTask: (taskId: number, newName: string) => void;
};
