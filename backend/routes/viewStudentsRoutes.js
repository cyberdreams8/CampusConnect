const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { isAuthenticated, isRecruiter } = require('../middleware/authMiddleware');

// Fetch applications for the recruiter
router.get('/applications', isAuthenticated, isRecruiter, async (req, res) => {
    const recruiterId = req.session.user ? req.session.user.Recruiter_id : null;
    console.log('Recruiter ID from session:', recruiterId);

    if (!recruiterId) {
        return res.status(400).json({ success: false, message: 'Recruiter not authenticated or missing recruiter ID.' });
    }

    try {
        const applicationsQuery = `
            SELECT 
                Applications.Application_id, 
                Applications.Status,
                Applications.Deadline AS Date_of_Application,
                Student.First_Name, 
                Student.Gender,
                Student.CGPA,
                Vacancies.Job_Title, 
                Vacancies.Base_Package,
                Vacancies.Number_Of_Positions,
                Vacancies.Vacancy_id
            FROM 
                Vacancies
            JOIN 
                Applications ON Vacancies.Vacancy_id = Applications.Vacancy_id
            JOIN 
                Student ON Applications.Student_id = Student.Uid
            WHERE 
                Vacancies.Recruiter_id = ?
        `;
        
        const [applications] = await db.query(applicationsQuery, [recruiterId]);
        console.log('Applications fetched:', applications); // Log the result of the query

        if (applications.length === 0) {
            return res.status(404).json({ success: false, message: 'No applications found for this recruiter.' });
        }

        res.status(200).json({ success: true, applications });
    } catch (err) {
        console.error('Error fetching applications:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

// Update application statuses based on checkbox selection
router.post('/applications/update', isAuthenticated, isRecruiter, async (req, res) => {
    const updates = req.body.updates;  // Array of updates received from the frontend
    const recruiterId = req.session.user ? req.session.user.Recruiter_id : null;

    if (!recruiterId) {
        return res.status(400).json({ success: false, message: 'Recruiter not authenticated or missing recruiter ID.' });
    }

    try {
        // Update each application status in the database
        for (const update of updates) {
            const { applicationId, status, vacancyId, positionsLeft } = update;

            // Ensure there are positions left before updating the status
            if (status === 'Accepted' && positionsLeft <= 0) {
                return res.status(400).json({ success: false, message: `No positions left for Vacancy ID ${vacancyId}.` });
            }

            // Update the application status
            const updateQuery = `
                UPDATE Applications
                SET Status = ?
                WHERE Application_id = ? AND Vacancy_id = ? AND Recruiter_id = ?
            `;
            await db.query(updateQuery, [status, applicationId, vacancyId, recruiterId]);

            // If the application is accepted, decrease positions left
            if (status === 'Accepted') {
                const updateVacancyQuery = `
                    UPDATE Vacancies
                    SET Number_Of_Positions = Number_Of_Positions - 1
                    WHERE Vacancy_id = ? AND Recruiter_id = ?
                `;
                await db.query(updateVacancyQuery, [vacancyId, recruiterId]);
            }
        }

        res.status(200).json({ success: true, message: 'Applications updated successfully.' });
    } catch (err) {
        console.error('Error updating applications:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

module.exports = router;
