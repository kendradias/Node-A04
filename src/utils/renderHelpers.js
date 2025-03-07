/**
 * Utility functions for rendering responses
 */

/**
 * Render JSON response
 * @param {Object} res - Express response object
 * @param {Object} data - Data to be returned as JSON
 * @param {Number} statusCode - HTTP status code
 */
const renderJson = (res, data, statusCode = 200) => {
    return res.status(statusCode).json(data);
};

/**
 * Render EJS page
 * @param {Object} res - Express response object
 * @param {String} template - Template name
 * @param {Object} data - Data to be passed to the template
 */
const renderPage = (res, template, data = {}) => {
    // Don't override the layout system properties
    return res.render(template, {
        ...data,
        title: data.title || 'My Portfolio'
    });
};

module.exports = {
    renderJson,
    renderPage
};