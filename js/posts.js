// Blog posts data
// To add a new post, simply add an object to this array
// Posts are automatically sorted by date (newest first)

let blogPosts = [
    {
        id: '1',
        title: 'Welcome to My Blog',
        date: '2025-08-25',
        content: `This is the first post on my new blog. The system is designed to be simple and clean, inspired by minimalist design principles.

## Getting Started

You can add new posts using the admin panel (go to admin.html). Posts are automatically sorted by date, with the newest appearing first.

## Features

This blog system includes:
- Automatic date sorting
- Clean, minimal design
- Simple content management
- Responsive layout

### Technical Details

The blog uses a simple file-based approach where posts are stored as objects and rendered dynamically. This makes it easy to add new content without dealing with complex database systems.

To add a new post manually, just add an object to the blogPosts array in js/posts.js with the following structure:

{
    id: 'unique-id',
    title: 'Your Post Title',
    date: 'YYYY-MM-DD',
    content: 'Your post content with simple markdown...'
}`
    },
    {
        id: '2',
        title: 'On Simplicity',
        date: '2025-08-24',
        content: `There's something to be said for keeping things simple. In a world of increasingly complex systems, sometimes the most elegant solution is the one that does exactly what it needs to do, nothing more.

## Less is More

This philosophy extends to writing, design, and even the tools we use to create. A simple blog that focuses on the words rather than the interface can be more powerful than a complex system with dozens of features you'll never use.

The goal here is to create a space for thoughts and ideas without getting in the way of the actual thinking and writing process.

### Manual Post Management

If you prefer to skip the web interface, you can add posts directly to the posts.js file. Just follow the format of the existing posts and the blog will automatically pick them up and sort them by date.`
    }
];