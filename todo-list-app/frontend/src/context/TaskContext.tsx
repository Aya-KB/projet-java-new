// src/context/TaskContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '../types/taskTypes';

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (taskId: number) => void;
  updateTask: (taskId: number, newName: string) => void;
  toggleTask: (taskId: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskContextProviderProps = {
  children: ReactNode;
};

export const TaskContextProvider: React.FC<TaskContextProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks((prevTasks) => [...prevTasks, task]);
  const removeTask = (taskId: number) => setTasks((prevTasks) => prevTasks.filter(t => t.id !== taskId));
  const updateTask = (taskId: number, newName: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
  };
  const toggleTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskContextProvider');
  }
  return context;
};
