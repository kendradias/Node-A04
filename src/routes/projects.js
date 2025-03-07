const express = require('express');
const router = express.Router();
const { renderJson, renderPage } = require('../utils/renderHelpers');
const Project = require('../models/projects');

// Projects listing route
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        
        if (req.query.format === 'json') {
            return renderJson(res, projects);
        }
        
        renderPage(res, 'projects', { 
            title: 'Projects', 
            projects 
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('404', { 
            title: 'Server Error' 
        });
    }
});

// Projects search route
router.get('/search', async (req, res) => {
    try {
        const query = req.query.query || '';
        let results;
        
        if (query) {
            // Use MongoDB text search
            results = await Project.find({ 
                $text: { $search: query } 
            });
            
            // If no results found with text search, try a more flexible approach
            if (results.length === 0) {
                const regex = new RegExp(query, 'i');
                results = await Project.find({
                    $or: [
                        { title: regex },
                        { summary: regex },
                        { description: regex }
                    ]
                });
            }
        } else {
            results = await Project.find();
        }
        
        if (req.query.format === 'json') {
            return renderJson(res, {
                searchTerm: query,
                results
            });
        }
        
        renderPage(res, 'projects', { 
            title: 'Search Results', 
            projects: results 
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('404', { 
            title: 'Server Error' 
        });
    }
});

// Individual project details route
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        if (req.query.format === 'json') {
            return renderJson(res, project);
        }
        
        renderPage(res, 'project-details', { 
            title: project.title, 
            project 
        });
    } catch (err) {
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
        console.error(err);
        res.status(500).render('404', { 
            title: 'Server Error' 
        });
    }
});

module.exports = router;