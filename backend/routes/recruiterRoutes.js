const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Ensure the database connection is properly set up

// Route to get all recruiters
router.get('/', async (req, res) => {
    try {
        const [recruiters] = await db.query('SELECT * FROM recruiters');
        res.json(recruiters);
    } catch (error) {
        console.error('Error fetching recruiters:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Route to add a recruiter
router.post('/', async (req, res) => {
    const { recruiterId,companyName, contactNumber, companyEmail, companyLocation } = req.body;

    // Validate input
    if (!recruiterId||!companyName || !contactNumber || !companyEmail || !companyLocation) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO recruiters (Recruiter_id, Company_Name, Contact_No, Company_Email, Company_Location) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [recruiterId,companyName, contactNumber, companyEmail, companyLocation]);
        res.status(201).json({ message: 'Recruiter added successfully', recruiterId: result.insertId });
    } catch (err) {
        console.error('Error adding recruiter:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});


module.exports = router;
