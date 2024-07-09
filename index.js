const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRouter = require('./routes/notes');
const projectRouter= require('./routes/project');
const dotenv = require('dotenv');
const { verifyToken } = require('./middleware/auth');


dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRouter);
app.use('/api/project',projectRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
