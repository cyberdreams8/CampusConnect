const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const db = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes')
const jobSearchRoutes = require('./routes/jobSearchRoutes');
const loginRoutes = require('./routes/loginRoutes');
const recruiterProfileRoute = require('./routes/recruiterProfileRoute');
const studentProfileRoute = require('./routes/studentProfileRoute');
const authRoutes = require('./routes/authRoutes');
const viewApplicationRoutes = require('./routes/viewApplicationRoutes');

const { isAuthenticated } = require('./middleware/authMiddleware'); // Import middleware

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production'
    }
}));

// Register routes
app.use('/api/students', studentRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/jobs', jobSearchRoutes);
app.use('/api/login', loginRoutes);
app.use('/api', authRoutes);
app.use('/api/recruiter', recruiterProfileRoute);
app.use('/api/students', studentProfileRoute);
app.use('/api/applications', viewApplicationRoutes);


// Static HTML file route
app.get('/view-students', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/TPO-dashboard/view-student.html'));
});

// Protected route example
app.get('/api/protected', isAuthenticated, (req, res) => {
    res.json({ message: `Welcome, ${req.session.user.username}!`, role: req.session.user.role });
});

// Testing route to fetch all users
app.get('/users', (req, res) => {
    const query = 'SELECT username, role FROM Users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.status(200).json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
