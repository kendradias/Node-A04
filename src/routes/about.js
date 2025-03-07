const express = require('express');
const router = express.Router();
const aboutController = require('../../controllers/aboutController');

// About route
router.get('/', aboutController.getAboutPage);

module.exports = router;