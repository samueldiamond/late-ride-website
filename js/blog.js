// Blog functionality

// Get current view from URL
function getCurrentView() {
    const path = window.location.hash.substring(1);
    if (path.startsWith('post/')) {
        return { view: 'post', id: path.split('/')[1] };
    }
    return { view: 'index' };
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// Get excerpt from content
function getExcerpt(content, maxLength = 200) {
    const plainText = content.replace(/#{1,3}\s/g, '').replace(/\n\n+/g, ' ');
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
}

// Render index page
function renderIndex() {
    document.getElementById('site-title').textContent = 'all writing';
    
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const entriesHtml = sortedPosts.map(post => `
        <a href="#post/${post.id}" class="entry">
            <div class="entry-date">${formatDate(post.date)}</div>
            <div class="entry-title">${post.title}</div>
            <div class="entry-excerpt">${getExcerpt(post.content)}</div>
        </a>
    `).join('');
    
    document.getElementById('entries-container').innerHTML = entriesHtml;
}

// Render individual post
function renderPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) {
        document.getElementById('entries-container').innerHTML = '<p>Post not found.</p>';
        return;
    }
    
    document.getElementById('site-title').innerHTML = `<a href="#" class="back-link">← all writing</a>`;
    
    // Simple markdown-like parsing
    const content = post.content
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.)/g, '<p>$1')
        .replace(/(.)$/g, '$1</p>');
    
    const postHtml = `
        <div class="post-header">
            <div class="post-date">${formatDate(post.date)}</div>
            <h1 class="post-title">${post.title}</h1>
        </div>
        <div class="post-content">
            ${content}
        </div>
    `;
    
    document.getElementById('entries-container').innerHTML = postHtml;
}

// Simple router
function router() {
    const { view, id } = getCurrentView();
    
    if (view === 'post') {
        renderPost(id);
    } else {
        renderIndex();
    }
}

// Handle navigation
window.addEventListener('hashchange', router);

// Initial render
document.addEventListener('DOMContentLoaded', router);