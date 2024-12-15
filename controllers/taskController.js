const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body

        const newTask = new Task({
            title,
            description,
            status,
            user: req.user.userId, // Link the task to the authenticated user
        })

        await newTask.save()

        res.status(201).json({ success: true, task: newTask })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating task', error: err.message })
    }
}

// Get all tasks for the loggedin user
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId })
        res.status(200).json({ success: true, tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching tasks', error: err.message })
    }
}

// Get a task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' })
        }
        res.status(200).json({ success: true, task })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching task', error: err.message })
    }
}

// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' })
        }

        res.status(200).json({ success: true, task })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating task', error: err.message })
    }
}

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId })
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' })
        }
        res.status(200).json({ success: true, message: 'Task deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting task', error: err.message })
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskStatus,
    deleteTask,
};
