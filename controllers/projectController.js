const Project = require('../models/Project');

/**
 * Get all projects
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        
        if (req.query.format === 'json') {
            return res.status(200).json(projects);
        }
        
        res.render('projects', { 
            title: 'Projects', 
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

/**
 * Get project by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        if (req.query.format === 'json') {
            return res.status(200).json(project);
        }
        
        res.render('project-details', { 
            title: project.title, 
            project: project 
        });
    } catch (err) {
        console.error(err);
        
        if (err.kind === 'ObjectId') {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        res.status(500).render('error', { 
            title: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? {} : err
        });
    }
};

/**
 * Search projects by query
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.searchProjects = async (req, res) => {
    try {
        const query = req.query.query || '';
        
        let projects;
        if (query) {
            // Use MongoDB text search for better results
            projects = await Project.find({ 
                $text: { $search: query } 
            });
            
            // If no results found with text search, try a more flexible approach
            if (projects.length === 0) {
                const regex = new RegExp(query, 'i');
                projects = await Project.find({
                    $or: [
                        { title: regex },
                        { summary: regex },
                        { description: regex }
                    ]
                });
            }
        } else {
            projects = await Project.find();
        }
        
        if (req.query.format === 'json') {
            return res.status(200).json({
                searchTerm: query,
                results: projects
            });
        }
        
        res.render('projects', { 
            title: 'Search Results', 
            projects: projects,
            searchTerm: query
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { 
            title: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? {} : err
        });
    }
};