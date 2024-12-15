const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes')
const morgan = require('morgan')

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Project is running...');
});

// Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
