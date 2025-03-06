const express = require('express');
const router = express.Router();
const { renderJson, renderPage } = require('../utils/renderHelpers');

// Contact page route
router.get('/', (req, res) => {
    renderPage(res, 'contact', { title: 'Contact' });
});

// Contact form submission route
router.post('/', (req, res) => {
    // Log form submission details
    console.log('Contact Form Submission:', req.body);

    if (req.query.format === 'json') {
        return renderJson(res, {
            success: true,
            message: "Thank you for reaching out!"
        });
    }

    renderPage(res, 'thank-you', { title: 'Thank You' });
});

module.exports = router;