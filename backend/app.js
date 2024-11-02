// backend/app.js

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');
const jobSearchRoutes = require('./routes/jobSearchRoutes'); // Add this line to import jobSearch routes

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Register routes
app.use('/api/students', studentRoutes); // Ensure students route is prefixed properly
app.use('/api/jobs', jobSearchRoutes); // Add this line to register job search routes

app.get('/users', (req, res) => {
    const query = 'SELECT Username, Role FROM Users'; // Adjust query as needed
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.status(200).json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

