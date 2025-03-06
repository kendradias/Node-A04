const express = require('express');
const router = express.Router();
const { renderJson, renderPage } = require('../utils/renderHelpers');
const Projects = require('../models/projects');

// Projects listing route
router.get('/', (req, res) => {
    const projects = Projects.getAllProjects();
    
    if (req.query.format === 'json') {
        return renderJson(res, projects);
    }
    
    renderPage(res, 'projects', { 
        title: 'Projects', 
        projects 
    });
});

// Projects search route
router.get('/search', (req, res) => {
    const query = req.query.query || '';
    const results = Projects.searchProjects(query);
    
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
});

// Individual project details route
router.get('/:id', (req, res) => {
    const project = Projects.getProjectById(req.params.id);
    
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
});

module.exports = router;