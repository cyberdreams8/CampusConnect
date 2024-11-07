// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

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
