const fs = require('fs');
const path = require('path');

const files = [
    'about.html',
    'contact.html',
    'join.html',
    'team.html',
    '404.html',
    'wip.html'
];

const faviconLink = '    <link rel="icon" type="image/png" href="icon.png">\n';

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if favicon already exists
        if (content.includes('rel="icon"')) {
            // Update existing favicon
            content = content.replace(/<link[^>]*rel=["']icon["'][^>]*>/, faviconLink.trim());
        } else {
            // Add favicon after title tag
            content = content.replace(/(<title>[^<]*<\/title>)/, `$1\n${faviconLink}`);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated favicon in ${file}`);
    } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
    }
});

console.log('\n🎉 Favicon update complete!');
