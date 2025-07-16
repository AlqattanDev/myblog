#!/usr/bin/env node

/**
 * Script to set up a webhook in the content repository that triggers
 * a rebuild of the blog when content is updated.
 * 
 * Usage: node scripts/setup-webhook.js
 * 
 * Required environment variables:
 * - GITHUB_TOKEN: Personal access token with repo permissions
 * - CONTENT_REPO_OWNER: Owner of the content repository
 * - CONTENT_REPO_NAME: Name of the content repository
 * - BLOG_REPO_OWNER: Owner of the blog repository (this repo)
 * - BLOG_REPO_NAME: Name of the blog repository (this repo)
 */

import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';

// Load environment variables
config();

const requiredEnvVars = [
  'GITHUB_TOKEN',
  'CONTENT_REPO_OWNER', 
  'CONTENT_REPO_NAME',
  'BLOG_REPO_OWNER',
  'BLOG_REPO_NAME'
];

// Check required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function setupWebhook() {
  try {
    console.log('🔗 Setting up webhook for content repository...');
    
    const contentOwner = process.env.CONTENT_REPO_OWNER;
    const contentRepo = process.env.CONTENT_REPO_NAME;
    const blogOwner = process.env.BLOG_REPO_OWNER;
    const blogRepo = process.env.BLOG_REPO_NAME;

    // Create webhook in content repository
    const webhook = await octokit.rest.repos.createWebhook({
      owner: contentOwner,
      repo: contentRepo,
      name: 'repository_dispatch',
      config: {
        url: `https://api.github.com/repos/${blogOwner}/${blogRepo}/dispatches`,
        content_type: 'json',
        secret: process.env.WEBHOOK_SECRET || 'default-secret-change-me',
      },
      events: ['push', 'pull_request'],
      active: true,
    });

    console.log('✅ Webhook created successfully!');
    console.log(`   Webhook ID: ${webhook.data.id}`);
    console.log(`   Webhook URL: ${webhook.data.config.url}`);
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Add the following secrets to your blog repository:');
    console.log(`   - CONTENT_GITHUB_TOKEN: Your GitHub personal access token`);
    console.log(`   - CONTENT_REPO_OWNER: ${contentOwner}`);
    console.log(`   - CONTENT_REPO_NAME: ${contentRepo}`);
    console.log('2. Push content to your content repository to trigger a build');
    console.log('3. Your blog will automatically rebuild when content changes!');

  } catch (error) {
    console.error('❌ Error setting up webhook:', error.message);
    
    if (error.status === 422) {
      console.log('💡 This might mean the webhook already exists.');
      console.log('   Check your repository webhook settings.');
    }
    
    process.exit(1);
  }
}

// Run the setup
setupWebhook();