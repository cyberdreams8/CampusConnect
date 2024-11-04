// backend/app.js

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db'); // Ensure db is imported for query execution
const studentRoutes = require('./routes/studentRoutes');
const jobSearchRoutes = require('./routes/jobSearchRoutes'); // Import job search routes

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the public directory

// Register routes
app.use('/api/students', studentRoutes); // Register students route
app.use('/api/jobs', jobSearchRoutes); // Register job search route

// Route for view-students.html
app.get('/view-students', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/TPO-dashboard/view-student.html'));
});

// New login route for handling user login based on role
app.post('/api/login', async (req, res) => {
    const { role, username, password } = req.body;

    if (!role || !username || !password) {
        return res.status(400).json({ error: 'Role, Username, and Password are required' });
    }

    // SQL query to check credentials based on role
    let query = '';
    if (role === 'student') {
        query = 'SELECT Username, Role FROM Students WHERE Username = ? AND Password = ?';
    } else if (role === 'recruiter') {
        query = 'SELECT Username, Role FROM Recruiters WHERE Username = ? AND Password = ?';
    } else if (role === 'tpo-admin') {
        query = 'SELECT Username, Role FROM TpoAdmins WHERE Username = ? AND Password = ?';
    } else {
        return res.status(400).json({ error: 'Invalid role specified' });
    }

    try {
        const [results] = await db.query(query, [username, password]);

        if (results.length > 0) {
            // User found, login successful
            res.status(200).json({ message: 'Login successful', user: results[0] });
        } else {
            // No matching user found
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Testing route to fetch all users (for demonstration purposes)
app.get('/users', (req, res) => {
    const query = 'SELECT Username, Role FROM Users'; // Adjust query as needed
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

