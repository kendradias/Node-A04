const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Sample project data
const projects = [
  {
    id: 1,
    title: "Hungry Hero",
    summary: "A fast-paced maze adventure game inspired by classic arcade titles",
    description: "Hungry Hero is an exciting browser-based game that combines classic maze-running mechanics with modern web technologies. Players navigate through dynamic mazes while collecting power-ups and avoiding enemies. The game features smooth animations, responsive controls, and progressive difficulty levels that keep players engaged. I implemented collision detection, enemy AI pathfinding, and a scoring system that tracks high scores across gaming sessions.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS"],
    screenshot: "/images/hungryhero.png"
  },
  {
    id: 2,
    title: "SquishMart",
    summary: "A full-stack e-commerce solution with secure payment processing and email notifications",
    description: "This comprehensive e-commerce platform provides a seamless shopping experience with secure PayPal integration for payments. Built on ASP.NET Core MVC, the system features a robust product catalog, shopping cart functionality, and order management. Security is enhanced through reCAPTCHA integration for form submissions and account creation. The platform includes automated email notifications via SendGrid for order confirmations, shipping updates, and password resets. Key features include inventory management, user authentication with role-based access, dynamic product filtering, and a responsive admin dashboard for sales analytics.",
    tech: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "JavaScript", "PayPal API", "SendGrid", "reCAPTCHA", "Bootstrap", "Razor Pages"],
    screenshot: "/images/squishmart.png"
  }
];

// HTML Template function
const createHtmlTemplate = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - My Portfolio</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <header>
        <h1 class="site-title">My Portfolio</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>
    <main>
        ${content}
    </main>
    <footer>
        <p>&copy; 2025 Kendra Dias</p>
    </footer>
</body>
</html>
`;

// Routes
app.get('/', (req, res) => {
  if (req.query.format === 'json') {
    return res.json({ message: "Welcome to My Node.js Portfolio!" });
    }

  const content = `
    <h1>Welcome to My Node.js Portfolio</h1>
    <p>Welcome to my professional portfolio showcasing my work in web development and software engineering.</p>`;
  
  res.send(createHtmlTemplate('Home', content));
});

app.get('/about', (req, res) => {
  if (req.query.format === 'json') {
    return res.json({
      name: "Your Name",
      bio: "Web developer specializing in backend engineering."
    });
    }

  const content = `
    <h1>About Me</h1>
    <p>Hello, I'm Kendra. I specialize in web development and backend programming! In my spare time I am an avid foodie, I love creating in any capacity, I've recently taken up sewing and garment construction and I love writing songs as well! </p>
  `;

  res.send(createHtmlTemplate('About', content));
});

app.get('/projects', (req, res) => {
  if (req.query.format === 'json') {
    return res.json(projects);
    }

    const projectCards = projects.map(project => `
        <article class="project-card">
            <h2>${project.title}</h2>
            <img src="${project.screenshot}" alt="${project.title} screenshot" onerror="this.style.display='none'">
            <p>${project.summary}</p>
            <ul>
            ${project.tech.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
            <a href="/projects/${project.id}">View Details</a>
        </article>
    `).join('');

    const content = `
        <h1>My Projects</h1>
        <form action="/projects/search" method="GET" class="search-form">
        <input type="text" name="query" placeholder="Search projects...">
        <button type="submit">Search</button>
        </form>
        <div class="project-grid">
        ${projectCards}
        </div>`;

    res.send(createHtmlTemplate('Projects', content));
});

app.get('/projects/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = projects.filter(project => 
    project.title.toLowerCase().includes(query) ||
    project.summary.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query)
    );

  if (req.query.format === 'json') {
    return res.json({
      searchTerm: query,
      results
    }); 
    }

  const resultCards = results.map(project => `
    <article class="project-card">
      <h2>${project.title}</h2>
      <img src="${project.screenshot}" alt="${project.title} screenshot">
      <p>${project.summary}</p>
      <ul>
        ${project.tech.map(tech => `<li>${tech}</li>`).join('')}
      </ul>
      <a href="/projects/${project.id}">View Details</a>
    </article>
  `).join('');

  const content = `
    <h1>Search Results</h1>
    <p>Results for: "${query}"</p>
    <div class="project-grid">
      ${resultCards}
    </div>`;

  res.send(createHtmlTemplate('Search Results', content));
});

app.get('/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));

  if (!project) {
    return res.status(404).send(createHtmlTemplate('Not Found', '<h1>Project Not Found</h1>'));
  }

  if (req.query.format === 'json') {
    return res.json(project);
  }

  const content = 
    `<h1>${project.title}</h1>
    <img src="${project.screenshot}" alt="${project.title} screenshot" class="project-image">
    <div class="project-details">
      <h2>Technology Stack</h2>
      <ul>
        ${project.tech.map(tech => `<li>${tech}</li>`).join('')}
      </ul>
      <h2>Description</h2>
      <p>${project.description}</p>
    </div>`;

  res.send(createHtmlTemplate(project.title, content));
});

app.get('/contact', (req, res) => {
  const content = `
    <h1>Contact Me</h1>
    <form action="/contact" method="POST" class="contact-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>`;

  res.send(createHtmlTemplate('Contact', content));
});

app.post('/contact', (req, res) => {
  console.log('Contact Form Submission:', req.body);

  if (req.query.format === 'json') {
    return res.json({
      success: true,
      message: "Thank you for reaching out!"
    });
  }

  const content = `
    <h1>Thank you for reaching out!</h1>
    <p>I'll get back to you soon.</p>`;

  res.send(createHtmlTemplate('Thank You', content));
});

// 404 Handler
app.use((req, res) => {
  if (req.query.format === 'json') {
    return res.status(404).json({
      error: "Page not found"
    });
  }

  const content = `
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/" class="button">Return Home</a>`;

  res.status(404).send(createHtmlTemplate('Not Found', content));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});