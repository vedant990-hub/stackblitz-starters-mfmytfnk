
const mongoose = require('mongoose');
const BlogPost = require('./schema');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

async function testBlogPost() {
    try {
        // Create a new blog post
        const newPost = await BlogPost.create({
            title: 'My First Blog',
            content: 'This is the content of my first blog post. It is over 50 characters long.',
            author: 'JohnDoe',
            tags: ['coding', 'tech'],
        });

        console.log('Blog Post Created:', newPost);

        // Add a comment to the blog post
        newPost.comments.push({
            username: 'JaneDoe',
            message: 'Great post!',
        });

        await newPost.save();
        console.log('Updated Blog Post:', newPost);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
    }
}

testBlogPost();
