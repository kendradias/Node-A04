const express = require('express');
const router = express.Router();
const { renderJson, renderPage } = require('../utils/renderHelpers');

// About route
router.get('/', (req, res) => {
    if (req.query.format === 'json') {
        return renderJson(res, {
            name: "Kendra Dias",
            bio: "Web developer specializing in backend engineering."
        });
    }
    renderPage(res, 'about', { title: 'About' });
});

module.exports = router;