import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  // Récupérer les tâches au chargement
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  // Ajouter une nouvelle tâche
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    try {
      const response = await axios.post<Task>('http://localhost:5000/api/tasks', { name: newTaskName });
      setTasks([...tasks, response.data]);
      setNewTaskName('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
  };

  // Supprimer une tâche
  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  // Bascule le statut de la tâche (complété ou non)
  const toggleTaskStatus = async (id: number, completed: boolean) => {
    try {
      const response = await axios.patch<Task>(`http://localhost:5000/api/tasks/${id}/status`, { completed });
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: response.data.completed } : task)));
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };
  

  // Mettre à jour le nom de la tâche
  const updateTask = async (id: number) => {
    try {
      const updatedTask = { id, name: editedTaskName || tasks.find((t) => t.id === id)?.name, completed: false };
      const response = await axios.put<Task>(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
      setEditingTaskId(null);
      setEditedTaskName('');
    } catch (error) {
      console.error('Erreur lors de la modification de la tâche:', error);
    }
  };

  // Filtrage des tâches (en fonction du statut)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Liste des tâches</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button type="submit">Ajouter</button>
      </form>

      <select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'pending')}>
        <option value="all">Toutes</option>
        <option value="completed">Terminées</option>
        <option value="pending">En attente</option>
      </select>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ color: task.completed ? 'green' : 'red' }}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
                <button onClick={() => updateTask(task.id)}>Sauvegarder</button>
                <button onClick={() => setEditingTaskId(null)}>Annuler</button>
              </>
            ) : (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskStatus(task.id, !task.completed)}
                  />
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.name}
                  </span>
                </label>
                <button onClick={() => setEditingTaskId(task.id)}>Modifier</button>
                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
