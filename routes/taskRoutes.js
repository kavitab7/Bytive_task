const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Create a new task
router.post('/tasks', authMiddleware, createTask)

//Fetch all tasks
router.get('/tasks', authMiddleware, getAllTasks)

//Fetch a task by its ID
router.get('/tasks/:id', authMiddleware, getTaskById)

//Update the task status
router.put('/tasks/:id', authMiddleware, updateTaskStatus)

//Delete a task by its ID
router.delete('/tasks/:id', authMiddleware, deleteTask)

module.exports = router;
