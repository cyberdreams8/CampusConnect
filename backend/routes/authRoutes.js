// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();


const { isAuthenticated, isRecruiter, isStudent, isAdmin } = require('../middleware/authMiddleware');

// Route for recruiter-only actions
router.get('/recruiter/dashboard', isAuthenticated, isRecruiter, (req, res) => {
    res.send('Welcome to the recruiter dashboard');
});

// Route for student-only actions
router.get('/student/dashboard', isAuthenticated, isStudent, (req, res) => {
    res.send('Welcome to the student dashboard');
});

// Route for admin-only actions
router.get('/admin/dashboard', isAuthenticated, isAdmin, (req, res) => {
    res.send('Welcome to the admin dashboard');
});



router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});

module.exports = router;
