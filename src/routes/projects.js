const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/projectController');
const upload = require('../../config/multer');

// Get all projects
router.get('/', projectController.getAllProjects);

// Search projects
router.get('/search', projectController.searchProjects);

// Show form to create a new project
router.get('/create', projectController.showCreateProjectForm);

// Create a new project
router.post('/', upload.single('screenshot'), projectController.createProject);

// Show form to edit a project
router.get('/:id/edit', projectController.showEditProjectForm);

// Update a project
router.post('/:id/update', upload.single('screenshot'), projectController.updateProject);

// Show delete confirmation page
router.get('/:id/delete', projectController.showDeleteConfirmation);

// Delete a project
router.post('/:id/delete', projectController.deleteProject);

// Get project by ID (should be last to avoid conflicts with other routes)
router.get('/:id', projectController.getProjectById);

module.exports = router;