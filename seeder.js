const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./src/models/projects');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Sample project data
const projectData = [
    {
        title: "Hungry Hero",
        summary: "A fast-paced maze adventure game inspired by classic arcade titles",
        description: "Hungry Hero is an exciting browser-based game that combines classic maze-running mechanics with modern web technologies. Players navigate through dynamic mazes while collecting power-ups and avoiding enemies. The game features smooth animations, responsive controls, and progressive difficulty levels that keep players engaged. I implemented collision detection, enemy AI pathfinding, and a scoring system that tracks high scores across gaming sessions.",
        tech: ["JavaScript", "HTML5 Canvas", "CSS"],
        screenshot: "/images/hungryhero.png"
    },
    {
        title: "SquishMart",
        summary: "A full-stack e-commerce solution with secure payment processing and email notifications",
        description: "This comprehensive e-commerce platform provides a seamless shopping experience with secure PayPal integration for payments. Built on ASP.NET Core MVC, the system features a robust product catalog, shopping cart functionality, and order management. Security is enhanced through reCAPTCHA integration for form submissions and account creation. The platform includes automated email notifications via SendGrid for order confirmations, shipping updates, and password resets. Key features include inventory management, user authentication with role-based access, dynamic product filtering, and a responsive admin dashboard for sales analytics.",
        tech: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "JavaScript", "PayPal API", "SendGrid", "reCAPTCHA", "Bootstrap", "Razor Pages"],
        screenshot: "/images/squishmart.png"
    }
];

// Import data function
const importData = async () => {
    try {
        // Clear existing data
        await Project.deleteMany();
        
        // Insert new data
        await Project.insertMany(projectData);
        
        console.log('Data imported successfully!');
        process.exit(0);
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit(1);
    }
};

// Delete all data function
const destroyData = async () => {
    try {
        await Project.deleteMany();
        
        console.log('Data destroyed successfully!');
        process.exit(0);
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit(1);
    }
};

// Run import or destroy based on command line argument
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}