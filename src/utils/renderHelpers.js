// Utility functions for rendering responses

// Render JSON response
const renderJson = (res, data, statusCode = 200) => {
    return res.status(statusCode).json(data);
};

// Render EJS page
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