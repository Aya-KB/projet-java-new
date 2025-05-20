const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Chemin vers le fichier JSON pour stocker les tâches
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Fonction pour charger les tâches depuis le fichier JSON
const loadTasks = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // Si le fichier n'existe pas, on retourne un tableau vide
    return [];
  }
};

// Fonction pour sauvegarder les tâches dans le fichier JSON
const saveTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2)); // Sauvegarde les tâches avec une indentation
};

// Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// Récupérer une tâche par son ID
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tâche introuvable' });
  }
});

// Ajouter une tâche
app.post('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// Mettre à jour une tâche 
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  const tasks = loadTasks();
  const index = tasks.findIndex((task) => task.id === parseInt(id));

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasks(tasks);
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Tâche introuvable' });
  }
});

// Supprimer une tâche 

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = loadTasks();
  const index = tasks.findIndex((task) => task.id === parseInt(id));

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Tâche introuvable' });
  }
});  

// Modifier le statut d'une tâche
app.patch('/api/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.completed = completed;
    saveTasks(tasks);
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tâche introuvable' });
  }
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
