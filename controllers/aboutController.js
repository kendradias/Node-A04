/**
 * Get about page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAboutPage = (req, res) => {
    try {
        // Prepare the about data
        const aboutData = {
            name: "Kendra Dias",
            bio: "Hello, I'm Kendra. I specialize in web development and backend programming! In my spare time I am an avid foodie, I love creating in any capacity, I've recently taken up sewing and garment construction and I love writing songs as well!"
        };
        
        if (req.query.format === 'json') {
            return res.status(200).json(aboutData);
        }
        
        res.render('about', { 
            title: 'About Me',
            aboutData: aboutData
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { 
            title: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? {} : err
        });
    }
};