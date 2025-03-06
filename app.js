const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const morgan = require('morgan');
const Projects = require('./src/models/projects');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // Specify the layout file

const projects = Projects.getAllProjects();

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Home',
        projects: projects
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', { 
        title: 'Projects',
        projects: projects
    });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
      title: 'Contact' 
  });
});

app.post('/contact', (req, res) => {
  console.log('Contact Form Submission:', req.body);

  res.render('thank-you', { 
    title: 'Thank You' 
  });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Not Found' 
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});