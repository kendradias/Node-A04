// Sample project data model
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

// Methods for interacting with projects
module.exports = {
    // Get all projects
    getAllProjects() {
        return projects;
    },

    // Find project by ID
    getProjectById(id) {
        return projects.find(p => p.id === parseInt(id));
    },

    // Search projects
    searchProjects(query) {
        const lowercaseQuery = query.toLowerCase();
        return projects.filter(project => 
            project.title.toLowerCase().includes(lowercaseQuery) ||
            project.summary.toLowerCase().includes(lowercaseQuery) ||
            project.description.toLowerCase().includes(lowercaseQuery)
        );
    }
};