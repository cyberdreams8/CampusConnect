const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { isAuthenticated, isRecruiter } = require('../middleware/authMiddleware'); // Import middleware

router.get('/', (req, res) => {
    res.json({ message: "Student routes" });
});

// Route to get recruiter details
router.get('/profile', isAuthenticated, isRecruiter, async (req, res) => {
    const username = req.session.user.username;
    console.log("Fetching recruiter profile for username:", username);

    try {
        const query = `
            SELECT Recruiters.Recruiter_id, Recruiters.Company_Name, Recruiters.Contact_No, 
                   Recruiters.Company_Email, Recruiters.Company_Location
            FROM Users
            JOIN Recruiters ON Users.Recruiter_id = Recruiters.Recruiter_id
            WHERE Users.username = ?
        `;
        
        console.log("Executing query to fetch recruiter profile:", query);
        const [results] = await db.query(query, [username]);

        if (results.length > 0) {
            console.log("Recruiter profile found:", results[0]);
            res.status(200).json({ success: true, recruiter: results[0] });
        } else {
            console.warn("No recruiter found for username:", username);
            res.status(404).json({ success: false, message: 'Recruiter not found' });
        }
    } catch (err) {
        console.error("Error fetching recruiter data:", err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

// PUT endpoint to update recruiter information
router.put('/profile', isAuthenticated, isRecruiter, async (req, res) => {
    console.log("PUT request received for /api/recruiter/profile");

    const { recruiterId, companyName, contactNo, companyEmail, companyLocation } = req.body;

    console.log("Request body:", { recruiterId, companyName, contactNo, companyEmail, companyLocation });

    // Default companyEmail to an empty string if it's not provided
    const email = companyEmail || "";

    try {
        console.log("Email before query:", email);

        const query = `
            UPDATE Recruiters 
            SET Company_Name = ?, Contact_No = ?, Company_Email = ?, Company_Location = ? 
            WHERE Recruiter_id = ?
        `;
        
        console.log("Executing query:", query);
        const [result] = await db.query(query, [companyName, contactNo, email, companyLocation, recruiterId]);
        console.log("Result from the query:", result);

        if (result.affectedRows > 0) {
            console.log("Recruiter details updated successfully for Recruiter_id:", recruiterId);
            res.status(200).json({ success: true, message: 'Recruiter details updated successfully' });
        } else {
            console.warn("No recruiter found with the provided Recruiter_id or no changes were made:", recruiterId);
            res.status(404).json({ success: false, message: 'Recruiter not found or no changes made' });
        }
    } catch (error) {
        console.error("Error updating recruiter data:", error.message);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
