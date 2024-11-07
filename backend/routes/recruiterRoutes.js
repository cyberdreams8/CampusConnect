const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Ensure the database connection is available
const recruiterController = require('../controllers/recruiterController');

// Route using the controller function for getting all recruiters
router.get('/recruiters', recruiterController.getAllRecruiters);


// Route to get all recruiters
router.get('/', async (req, res) => {
    try {
        constant[recruiters] =await db.query('SELECT * FROM recruiters');
        res.json(recruiters);
    } catch (error) {
        console.error('Error fetching recruiters:', error);
        res.status(500).json({ error: 'Database error' });
    }
});


// Route to add a recruiter
router.post('/', async (req, res) => {
    const { Recruiter_id, Company_Name, Contact_No, Company_Email, Company_Location } = req.body;

    // Validate input
    if (!Recruiter_id || !Company_Name || !Contact_No || !Company_Email || !Company_Location) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // SQL query to insert a new recruiter
    const query = 'INSERT INTO recruiters (Recruiter_id, Company_Name, Contact_No, Company_Email, Company_Location) VALUES (?, ?, ?, ?, ?)';

    try {
        await db.query(query, [Recruiter_id, Company_Name, Contact_No, Company_Email, Company_Location]);
        res.status(201).json({ message: 'Recruiter added successfully', recruiterId: result.insertId });
    } catch (err) {
        console.error('Error adding recruiter:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
