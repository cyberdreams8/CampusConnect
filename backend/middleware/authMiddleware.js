// backend/middleware/authMiddleware.js
function isAuthenticated(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access - No session or user not logged in' });
    }
    next();
}

function isRecruiter(req, res, next) {
    if (req.session.user.role !== 'recruiter') {
        return res.status(403).json({ success: false, message: 'Forbidden - User is not a recruiter' });
    }
    next();
}

module.exports = { isAuthenticated, isRecruiter };
