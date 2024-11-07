const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { isAuthenticated, isStudent } = require('../middleware/authMiddleware');

router.get('/profile', isAuthenticated, isStudent, async (req, res) => {
    const username = req.session.user.username;

    try {
        const query = `
            SELECT Uid, First_Name, Middle_Name, Last_Name, DOB, Gender, Branch, Graduation_Year, CGPA, Email, Contact_Number, Job_Search_Keywords, About_Me
            FROM Student
            WHERE Uid = (SELECT Uid FROM Users WHERE username = ?);
        `;
        const [results] = await db.query(query, [username]);

        if (results.length > 0) {
            res.status(200).json({ success: true, student: results[0] });
        } else {
            res.status(404).json({ success: false, message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.put('/profile', isAuthenticated, isStudent, async (req, res) => {
    const { uid, firstName, middleName, lastName, dob, gender, branch, graduationYear, cgpa, email, contactNumber, jobSearchKeywords, aboutMe } = req.body;

    if (!firstName || !lastName || !dob || !gender || !branch || !graduationYear || !cgpa || !email || !contactNumber) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    try {
        const query = `
            UPDATE Student 
            SET First_Name = ?, Middle_Name = ?, Last_Name = ?, DOB = ?, Gender = ?, Branch = ?, Graduation_Year = ?, CGPA = ?, Email = ?, Contact_Number = ?, Job_Search_Keywords = ?, About_Me = ?
            WHERE Uid = ?;
        `;
        const [result] = await db.query(query, [firstName, middleName, lastName, dob, gender, branch, graduationYear, cgpa, email, contactNumber, jobSearchKeywords, aboutMe, uid]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Student profile not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

module.exports = router;
