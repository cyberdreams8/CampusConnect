// backend/controllers/recruiterController.js
const db = require('../config/db');

const getRecruiterDetails = async (req, res) => {
    // Check if the user is authenticated and has the recruiter role
    if (!req.session.user || req.session.user.role !== 'recruiter') {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const username = req.session.user.username;

    try {
        // SQL query to retrieve recruiter information based on username
        const query = `SELECT * FROM Recruiter WHERE username = ?`;
        const [results] = await db.query(query, [username]);

        if (results.length > 0) {
            res.status(200).json({ success: true, recruiter: results[0] });
        } else {
            res.status(404).json({ success: false, message: 'Recruiter not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

module.exports = {
    getRecruiterDetails
};
