const Project = require('../src/models/projects');

/**
 * Get home page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getHomePage = async (req, res) => {
    try {
        // Get up to 3 featured projects
        const projects = await Project.find().limit(3);
        
        if (req.query.format === 'json') {
            return res.status(200).json({ 
                message: "Welcome to My Node.js Portfolio!",
                featuredProjects: projects
            });
        }
        
        res.render('index', { 
            title: 'Welcome to My Node.js Portfolio', 
            projects: projects 
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { 
            title: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? {} : err
        });
    }
};