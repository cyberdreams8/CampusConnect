const express = require('express');
const router = express.Router();
const db = require('../config/db');

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
            res.status(200).json({ success: true, message: 'Login successful', user: results[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

module.exports = router;
