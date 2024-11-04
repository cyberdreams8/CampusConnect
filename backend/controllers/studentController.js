const db = require('../config/db');

exports.getAllStudents = async (req, res) => {
    try {
        const [students] = await db.query('SELECT * FROM Student');
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Database error occurred' });
    }
};
