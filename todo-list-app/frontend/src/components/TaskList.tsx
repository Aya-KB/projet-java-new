// src/components/TaskList.tsx

import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types/taskTypes';

const TaskList: React.FC = () => {
  const { tasks, toggleTask, removeTask, updateTask } = useTasks();
  const [filter, setFilter] = useState<string>('all');

  // Logique de filtrage des tâches
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div>
      <TaskFilter filter={filter} setFilter={setFilter} />
      {filteredTasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
