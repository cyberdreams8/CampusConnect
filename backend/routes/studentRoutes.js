// backend/routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust the path based on your structure
const studentController = require('../controllers/studentController');

// Route using the controller function for getting all students
router.get('/students', studentController.getAllStudents);

// Route to directly fetch all students without controller, with minimal fields
router.get('/', async (req, res) => {
    try {
        const [students] = await db.query(
            'SELECT Uid, First_Name, Middle_Name, Last_Name, Branch, Graduation_Year, CGPA, Email FROM Student'
        );
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// You can add more routes for adding, updating, and deleting students as needed

module.exports = router;

