const db = require('../config/db');

exports.getAllRecruiters = async (req, res) => {
    try {
        const [recruiters] = await db.query('SELECT * FROM recruiters');
        res.json(recruiters);
    } catch (error) {
        console.error('Error fetching recruiters:', error);
        res.status(500).json({ error: 'Database error' });
    }
};
