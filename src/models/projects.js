const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    tech: {
        type: [String],
        required: true
    },
    screenshot: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to update the updatedAt field
ProjectSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Create a text index for search functionality
ProjectSchema.index({
    title: 'text',
    summary: 'text',
    description: 'text'
});

module.exports = mongoose.model('Project', ProjectSchema);