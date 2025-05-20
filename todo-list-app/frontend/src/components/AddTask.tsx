import React, { useState } from 'react';
import { Task } from '../types/taskTypes';

interface AddTaskProps {
  addTask: (task: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState<string>('');

  const handleAddClick = () => {
    if (taskName.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };

    addTask(newTask);
    setTaskName('');
  };

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Ajouter une nouvelle tâche"
      />
      <button onClick={handleAddClick}>Ajouter</button>
    </div>
  );
};

export default AddTask;
