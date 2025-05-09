const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

const tasks = []; 

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API!'); 
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) return res.status(400).json({ message: 'Task name is required' });

    const newTask = { id: tasks.length + 1, taskName };
    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
});
