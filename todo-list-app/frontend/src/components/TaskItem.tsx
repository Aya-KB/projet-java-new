// src/components/TaskItem.tsx

import React, { useState } from 'react';
import { TaskProps } from '../types/taskTypes';

const TaskItem: React.FC<TaskProps> = ({ task, toggleTask, removeTask, updateTask }) => {
  const [newName, setNewName] = useState(task.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleUpdateTask = () => {
    updateTask(task.id, newName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)} // Change the task status
        />
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          style={{
            marginLeft: '10px',
            textDecoration: task.completed ? 'line-through' : 'none',
            width: '200px',
          }}
        />
        <button onClick={handleUpdateTask} style={{ marginLeft: '10px' }}>
          Mettre à jour
        </button>
        <button onClick={() => removeTask(task.id)} style={{ marginLeft: '10px' }}>
          Supprimer
        </button>
      </div>

      {/* Afficher le statut en dessous de chaque tâche */}
      <p style={{ marginTop: '5px', fontStyle: 'italic', color: task.completed ? 'green' : 'red' }}>
        {task.completed ? 'Statut: Terminé' : 'Statut: En attente'}
      </p>
    </div>
  );
};

export default TaskItem;
