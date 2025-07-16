# /blog-deploy

*Deployment and GitHub integration command for the Astro blog system.*

## Usage
- `/blog-deploy [deployment task]` - Handle deployment-related tasks
- `/blog-deploy setup` - Configure GitHub integration and webhooks
- `/blog-deploy` - Check deployment status and configuration

## Purpose
Manages the two-repository GitHub integration system, webhook configuration, and GitHub Pages deployment for the Astro blog.

## Execution

User request: "$ARGUMENTS"

### Step 1: Deployment Architecture Analysis
Analyze the current deployment setup:

**Repository Configuration:**
- Verify `blog-code` repository (this repo) configuration
- Check `blog-content` repository integration
- Review GitHub Pages settings
- Assess custom domain configuration

**Build and Deploy Pipeline:**
- Check Astro build configuration
- Review GitHub Actions workflow (if present)
- Verify webhook configuration
- Analyze content fetching mechanism

**Integration Points:**
- GitHub API access and rate limits
- Webhook endpoint configuration
- Static site generation process
- Custom domain and HTTPS setup

### Step 2: Deployment Task Analysis
Based on the request, focus on specific deployment aspects:

**For webhook setup:**
- Configure GitHub webhook for content repository
- Set up endpoint to trigger rebuilds
- Test webhook delivery and processing
- Handle webhook security (secrets, validation)

**For GitHub Pages configuration:**
- Configure repository Pages settings
- Set up custom domain with HTTPS
- Verify build and deployment process
- Check DNS configuration

**For content integration:**
- Configure GitHub API access
- Set up content fetching during build
- Test content synchronization
- Verify rate limit handling

**For deployment optimization:**
- Optimize build performance
- Configure caching strategies
- Set up deployment notifications
- Monitor deployment success rates

### Step 3: Configuration Verification
Check essential deployment configurations:

**GitHub Repository Settings:**
```bash
# Verify repository configuration
gh repo view --json name,visibility,defaultBranch,hasPages
gh api repos/:owner/:repo/pages --jq '.source'
```

**Astro Configuration:**
```javascript
// astro.config.mjs - verify site URL and output
export default defineConfig({
  site: 'https://yourdomain.com',
  output: 'static',
  // GitHub Pages configuration
});
```

**Content Fetching Configuration:**
- GitHub token setup (environment variables)
- API endpoint configuration
- Rate limit handling
- Error fallback strategies

### Step 4: Deployment Workflow
Provide deployment process guidance:

**Standard Deployment Flow:**
1. Content updated in `blog-content` repository
2. Webhook triggers rebuild of `blog-code` repository
3. Astro fetches content via GitHub API during build
4. Static site generates with updated content
5. GitHub Pages deploys updated site
6. Custom domain serves updated content

**Manual Deployment:**
```bash
# Build and deploy manually
yarn build
gh-pages -d dist  # If using gh-pages package

# Or trigger GitHub Actions
gh workflow run pages-build-deployment
```

## GitHub Integration Setup

### Webhook Configuration
**Content Repository Webhook:**
- URL: `https://api.github.com/repos/owner/blog-code/dispatches`
- Events: `push` to main branch
- Secret: Configured webhook secret
- Content type: `application/json`

**Webhook Payload:**
```json
{
  "event_type": "content_updated",
  "client_payload": {
    "repository": "blog-content",
    "ref": "refs/heads/main"
  }
}
```

### GitHub Actions Workflow
```yaml
name: Deploy Blog
on:
  repository_dispatch:
    types: [content_updated]
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: yarn install
      - run: yarn build
      - uses: actions/deploy-pages@v3
```

### Environment Variables
```bash
# Required for content fetching
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
CONTENT_REPO_OWNER=username
CONTENT_REPO_NAME=blog-content
```

## Deployment Monitoring

### Key Metrics to Monitor
- Build success rate and duration
- Content sync reliability
- GitHub API rate limit usage
- Page load performance
- Webhook delivery success

### Troubleshooting Common Issues
**Build Failures:**
- Check GitHub API rate limits
- Verify content repository access
- Review Astro configuration
- Check dependency versions

**Content Sync Issues:**
- Verify webhook configuration
- Check GitHub token permissions
- Test API endpoint accessibility
- Review content format validation

**Deployment Problems:**
- Check GitHub Pages settings
- Verify custom domain configuration
- Review DNS settings
- Test HTTPS certificate

## Performance Optimization

### Build Optimization
- Implement incremental builds
- Optimize asset processing
- Cache dependencies effectively
- Minimize build time

### Content Delivery
- Optimize static assets
- Implement proper caching headers
- Use CDN capabilities
- Monitor Core Web Vitals

### GitHub API Efficiency
- Implement smart content diffing
- Use conditional requests (ETags)
- Batch API calls when possible
- Monitor rate limit usage

## Security Considerations

### Webhook Security
- Validate webhook signatures
- Use secure webhook secrets
- Implement request validation
- Monitor webhook activity

### API Access
- Use minimal required permissions
- Secure token storage
- Implement access logging
- Regular token rotation

### Content Validation
- Sanitize content during build
- Validate frontmatter schema
- Check for malicious content
- Implement content moderation

Ready to handle deployment task: $ARGUMENTS