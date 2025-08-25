# Simple File-Based Blog

A clean, minimal blog system inspired by [Subpixel Space](https://subpixel.space/entries/), designed for simplicity and ease of use.

## File Structure

```
blog/
├── index.html          # Main HTML file
├── admin.html          # Hidden admin interface
├── css/
│   └── style.css       # All styles
├── js/
│   ├── posts.js        # Blog posts data
│   └── blog.js         # Blog functionality
└── README.md           # This file
```

## Setup

1. Download all the files and maintain the folder structure
2. Open `index.html` in a web browser, or
3. Serve the files through any web server (for better URL handling)

## Adding Posts

### Method 1: Admin Interface (Hidden)
- Go to `admin.html` in your browser
- Fill in title, date, and content
- Click "Generate Code" 
- Copy the generated code and paste it at the beginning of the `blogPosts` array in `js/posts.js`
- Save the file

### Method 2: Edit posts.js (Direct)
1. Open `js/posts.js`
2. Add a new object to the beginning of the `blogPosts` array:

```javascript
{
    id: 'unique-id',
    title: 'Your Post Title', 
    date: '2025-08-25',        // YYYY-MM-DD format
    content: `Your content here...

## Use markdown-style formatting
### Subheadings work too

Regular paragraphs are separated by blank lines.`
},
```

3. Save the file - posts will automatically appear sorted by date

## Content Formatting

- Use `##` for main headings
- Use `###` for subheadings  
- Separate paragraphs with blank lines
- Posts are automatically sorted by date (newest first)

## Hosting

This is a static site that can be hosted anywhere:
- **GitHub Pages**: Just push to a repo and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repo or upload files
- **Any web server**: Upload files via FTP/SFTP

## Features

- ✅ Automatic date sorting
- ✅ Clean, minimal design
- ✅ Responsive layout
- ✅ Simple markdown-style formatting
- ✅ Hidden admin interface
- ✅ No database required
- ✅ Easy to customize
- ✅ Works offline