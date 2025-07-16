#!/bin/bash

# Setup script for blog-content repository with jj
# Run this from the blog-content directory

set -e

echo "🚀 Setting up blog-content repository with jj..."

# Initialize jj if not already done
if [ ! -d ".jj" ]; then
    echo "📁 Initializing jj repository..."
    jj git init --git-repo=.
fi

# Create directory structure
echo "📂 Creating directory structure..."
mkdir -p posts assets/images

# Copy content files from the main blog repo
echo "📝 Copying sample content..."
cp ../myblog/temp-blog-content/posts/*.md posts/
cp ../myblog/temp-blog-content/README.md .

# Add all files
echo "➕ Adding files to jj..."
jj file add .

# Create initial commit
echo "💾 Creating initial commit..."
jj commit -m "Initial blog content

- Add hello-github.md with GitHub integration demo
- Add github-workflow-guide.md with workflow documentation
- Add README.md with repository documentation
- Set up basic directory structure for posts and assets"

# Push to GitHub
echo "🔄 Pushing to GitHub..."
jj git push

echo "✅ Blog content repository setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Check your GitHub repository at: https://github.com/AlqattanDev/blog-content"
echo "2. Run 'yarn build' in your blog repository to test the integration"
echo "3. The blog should now fetch and display content from GitHub!"
echo ""
echo "🎉 Your two-repository blog system is ready!"