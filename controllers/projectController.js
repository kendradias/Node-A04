const Project = require('../src/models/projects');
const fs = require('fs');
const path = require('path');

/**
 * Get all projects
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        
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
 * Show form to create a new project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.showCreateProjectForm = (req, res) => {
    try {
        res.render('project-form', { 
            title: 'Add New Project',
            project: null,
            formAction: '/projects',
            formMethod: 'POST'
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
 * Create a new project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createProject = async (req, res) => {
    try {
        const { title, summary, description } = req.body;
        let tech = req.body.tech;
        
        // Convert tech to array if it's a single string
        if (typeof tech === 'string') {
            tech = tech.split(',').map(item => item.trim());
        }
        
        // Create new project object
        const newProject = new Project({
            title,
            summary,
            description,
            tech,
            screenshot: `/uploads/${req.file.filename}`  // Store the path of the uploaded file
        });
        
        // Save to MongoDB
        await newProject.save();
        
        if (req.query.format === 'json') {
            return res.status(201).json({
                success: true,
                project: newProject
            });
        }
        
        res.redirect(`/projects/${newProject._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { 
            title: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? {} : err
        });
    }
};

/**
 * Show form to edit an existing project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.showEditProjectForm = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        res.render('project-form', { 
            title: `Edit ${project.title}`,
            project,
            formAction: `/projects/${project._id}/update`,
            formMethod: 'POST'
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
 * Update an existing project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateProject = async (req, res) => {
    try {
        const { title, summary, description } = req.body;
        let tech = req.body.tech;
        
        // Convert tech to array if it's a single string
        if (typeof tech === 'string') {
            tech = tech.split(',').map(item => item.trim());
        }
        
        // Get the existing project to check for image changes
        const existingProject = await Project.findById(req.params.id);
        
        if (!existingProject) {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        // Prepare update object
        const updateData = {
            title,
            summary,
            description,
            tech,
            updatedAt: new Date()
        };
        
        // If a new file was uploaded, update the screenshot
        if (req.file) {
            updateData.screenshot = `/uploads/${req.file.filename}`;
            
            // Delete the old image if it exists and is in the uploads folder
            if (existingProject.screenshot && existingProject.screenshot.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '../public', existingProject.screenshot);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }
        
        // Update the project
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );
        
        if (req.query.format === 'json') {
            return res.status(200).json({
                success: true,
                project: updatedProject
            });
        }
        
        res.redirect(`/projects/${updatedProject._id}`);
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
 * Confirm deletion of a project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.showDeleteConfirmation = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        res.render('project-delete', { 
            title: `Delete ${project.title}`,
            project
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
 * Delete a project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        // Delete the image file if it exists and is in the uploads folder
        if (project.screenshot && project.screenshot.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '../public', project.screenshot);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        // Delete the project from the database
        await Project.findByIdAndDelete(req.params.id);
        
        if (req.query.format === 'json') {
            return res.status(200).json({
                success: true,
                message: 'Project deleted successfully'
            });
        }
        
        res.redirect('/projects');
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
            // Use MongoDB text search
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