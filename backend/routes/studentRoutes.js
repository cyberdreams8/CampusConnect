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


// Route to add a new student
router.post('/', async (req, res) => {
    const { Uid, First_Name, Middle_Name, Last_Name, DOB, Gender, Branch, Graduation_Year, CGPA, Email, Contact_Number } = req.body;

    // Validation for required fields
    if (!Uid || !First_Name || !Last_Name || !DOB || !Gender || !Branch || !Graduation_Year || !CGPA || !Email || !Contact_Number) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

// SQL query to insert the new student
const query = `
        INSERT INTO Student (Uid, First_Name, Middle_Name, Last_Name, DOB, Gender, Branch, Graduation_Year, CGPA, Email, Contact_Number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

try {
        // Execute the query
        await db.query(query, [Uid, First_Name, Middle_Name, Last_Name, DOB, Gender, Branch, Graduation_Year, CGPA, Email, Contact_Number]);
        res.status(201).json({ message: 'Student added successfully!' });
    } catch (err) {
        console.error('Error adding student:', err.message);
        res.status(500).json({ error: 'An error occurred while adding the student.' });
    }
});
// You can add more routes for adding, updating, and deleting students as needed

module.exports = router;

