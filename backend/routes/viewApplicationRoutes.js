// backend/routes/viewApplicationsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { isAuthenticated, isStudent } = require('../middleware/authMiddleware');

// Route to fetch applications for the logged-in student with specific details
router.get('/', isAuthenticated, isStudent, async (req, res) => {
    try {
        const username = req.session.user.username;

        // Step 1: Get student ID (Uid) using the username
        const studentIdQuery = `SELECT Uid FROM Users WHERE username = ?`;
        const [[{ Uid: studentId }]] = await db.query(studentIdQuery, [username]);

        if (!studentId) {
            return res.status(404).json({ success: false, message: 'Student ID not found for the user' });
        }

        // Step 2: Fetch application data with job details using JOIN
        const applicationsQuery = `
            SELECT 
                Applications.Application_id, 
                Vacancies.Job_Title, 
                Vacancies.Base_Package, 
                Applications.Status, 
                Applications.Deadline AS Date_of_Application
            FROM 
                Applications
            JOIN 
                Vacancies ON Applications.Vacancy_id = Vacancies.Vacancy_id
            WHERE 
                Applications.Student_id = ?
        `;
        
        const [applications] = await db.query(applicationsQuery, [studentId]);

        // Respond with applications
        res.status(200).json({ success: true, applications });
    } catch (err) {
        console.error('Error fetching applications:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

module.exports = router;
