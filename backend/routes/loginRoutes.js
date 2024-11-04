const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Handle login and set session variables on successful login
router.post('/', async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ success: false, message: 'Role, Username, and Password are required' });
    }

    try {
        const query = `
            SELECT * FROM Users 
            WHERE username = ? AND password = ? AND role = ?
        `;
        const [results] = await db.query(query, [username, password, role]);

        if (results.length > 0) {
            // Store user info in session
            req.session.user = {
                username: results[0].username,
                role: results[0].role
            };

            // Determine redirect URL based on the user's role
            let redirectUrl;
            if (role === 'recruiter') {
                redirectUrl = '/pages/Recruiter-dashboard/home.html';
            } else if (role === 'student') {
                redirectUrl = '/pages/Student-dashboard/home.html';
            } else if (role === 'tpo-admin') {
                redirectUrl = '/pages/TPO-dashboard/home.html';
            } else {
                return res.status(400).json({ success: false, message: 'Invalid role specified' });
            }

            // Respond with user info and redirect URL
            res.status(200).json({ success: true, message: 'Login successful', user: req.session.user, redirectUrl });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

// Logout endpoint to clear the session
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});

module.exports = router;
