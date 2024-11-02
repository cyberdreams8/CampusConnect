// backend/routes/jobSearchRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Make sure to import the pool

// GET request for job search
router.get('/', async (req, res) => {
    const { jobTitle, experience, jobType, minCGPA, company } = req.query; // Capture search criteria from query parameters

    // Construct SQL query based on provided filters
    let query = `
        SELECT V.*, R.Company_Name 
        FROM Vacancies V 
        JOIN Recruiters R ON V.Recruiter_id = R.Recruiter_id 
        WHERE 1=1`; // Start with a base query
    const queryParams = [];

    if (jobTitle) {
        query += ` AND V.Job_Title LIKE ?`;
        queryParams.push(`%${jobTitle}%`); // Use wildcard for partial match
    }

    if (experience) {
        query += ` AND V.YoE >= ?`;
        queryParams.push(experience);
    }

    if (jobType) {
        query += ` AND V.JobType = ?`;
        queryParams.push(jobType);
    }

    if (minCGPA) {
        query += ` AND V.MinCGPA >= ?`;
        queryParams.push(minCGPA);
    }

    if (company) {
        query += ` AND R.Company_Name LIKE ?`;
        queryParams.push(`%${company}%`); // Use wildcard for company name search
    }

    try {
        // Execute the query using the pool
        const [results] = await db.query(query, queryParams);
        res.status(200).json(results); // Send the job results back to the client
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // Export the router

