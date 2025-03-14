# Portfolio Project with Full CRUD Operations

A Node.js-based portfolio application that showcases projects with full CRUD operations, image uploads, and responsive design.

## Features

- **Full CRUD Operations for Projects**
  - Create: Add new projects with details and screenshots
  - Read: Display project listings and detailed views
  - Update: Edit existing project information
  - Delete: Remove projects from the database

- **Image Uploads**
  - Upload project screenshots using Multer
  - Images stored in the public/uploads directory
  - Automatic handling of file naming and storage

- **Database Integration**
  - MongoDB Atlas cloud database
  - Mongoose ORM for schema modeling and validation
  - Full-text search capabilities

- **Responsive Design**
  - Mobile-first approach using custom CSS
  - Beautiful purple-themed design

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account

### Installation Steps

1. **Clone the repository**
   ```
   git clone <https://github.com/kendradias/Node-A04.git>
   cd portfolio-project
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=3000
     NODE_ENV=development
     MONGODB_URI=mongodb+srv://kendradias:portfolio123@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
     ```
   - Replace the MongoDB URI with the one provided below if needed

4. **Seed the database (if you want to)**
   npm run seed


5. **Start the server**
   npm run dev

6. **Access the application**
   - Open your browser and go to: `http://localhost:3000`

## MongoDB Atlas Configuration

This application is configured to use MongoDB Atlas as its database. The following details are important for the grading process:

### MongoDB Atlas URI
```
mongodb+srv://kendradias:portfolio123@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Network Access Confirmation
- **Network access has been enabled from anywhere (0.0.0.0/0)** for the duration of the grading period.

### Connection Instructions
1. The MongoDB Atlas URI is already included in the `.env` file template above.
2. No additional configuration is needed to connect to the database.
3. The database includes two sample projects if you use the seed script.

## Usage

- **View Projects**: Browse all projects on the projects page
- **Create a Project**: Click "Add New Project" to create a new project
- **Edit a Project**: Click the "Edit" button on any project
- **Delete a Project**: Click the "Delete" button and confirm deletion
- **Search**: Use the search form to find projects by keywords

## Technologies Used

- Node.js
- Express.js
- MongoDB/Mongoose
- EJS Templating
- Multer (File handling)
- dotenv (Environment variables)