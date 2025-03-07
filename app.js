const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const routes = require('./src/routes');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); 

// Mount all routes
app.use('/', routes);

// 404 Handler (this will be triggered if no route matches)
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Not Found' 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).render('404', { 
      title: 'Server Error',
      message: 'Something went wrong on our end. Please try again later.'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});