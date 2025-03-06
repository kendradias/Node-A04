const express = require('express');
const router = express.Router();
const { renderJson, renderPage } = require('../utils/renderHelpers');
const Projects = require('../models/projects'); // Add this import

// Home route
router.get('/', (req, res) => {
    const projects = Projects.getAllProjects();
    
    if (req.query.format === 'json') {
        return renderJson(res, { 
            message: "Welcome to My Node.js Portfolio!",
            featuredProjects: projects
        });
    }
    renderPage(res, 'index', { 
        title: 'Home', 
        projects: projects 
    });
});

module.exports = router;