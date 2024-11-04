const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db'); // Ensure db is imported for query execution
const studentRoutes = require('./routes/studentRoutes');
const jobSearchRoutes = require('./routes/jobSearchRoutes'); // Import job search routes
const loginRoutes = require('./routes/loginRoutes'); // Import the login routes

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the public directory

// Register routes
app.use('/api/students', studentRoutes); // Register students route
app.use('/api/jobs', jobSearchRoutes); // Register job search route
app.use('/api/login', loginRoutes); // Register the login route

// Route for view-students.html
app.get('/view-students', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/TPO-dashboard/view-student.html'));
});

// Testing route to fetch all users (for demonstration purposes)
app.get('/users', (req, res) => {
    const query = 'SELECT username, role FROM Users'; // Adjust query as needed
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.status(200).json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
