const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contactController');

// Get contact page
router.get('/', contactController.getContactPage);

// Submit contact form
router.post('/', contactController.submitContactForm);

module.exports = router;