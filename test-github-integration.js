#!/usr/bin/env node

/**
 * Test script to verify GitHub integration is working
 * This simulates what happens during the Astro build process
 */

import { config } from 'dotenv';
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

// Load environment variables from .env
config();

async function testGitHubIntegration() {
  console.log('🧪 Testing GitHub Integration...\n');

  // Check if environment is configured
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.CONTENT_REPO_OWNER;
  const repo = process.env.CONTENT_REPO_NAME;

  if (!token || !owner || !repo) {
    console.log('❌ GitHub integration not configured');
    console.log('   Missing environment variables:');
    console.log(`   - GITHUB_TOKEN: ${token ? '✅ Set' : '❌ Missing'}`);
    console.log(`   - CONTENT_REPO_OWNER: ${owner ? '✅ Set' : '❌ Missing'}`);
    console.log(`   - CONTENT_REPO_NAME: ${repo ? '✅ Set' : '❌ Missing'}`);
    return;
  }

  console.log('✅ GitHub integration is configured');
  console.log(`   Repository: ${owner}/${repo}`);
  console.log(`   Token: ${token ? `${token.substring(0, 20)}...` : 'Missing'}\n`);

  try {
    const octokit = new Octokit({ auth: token });
    
    // First test - check if we can access the repository
    console.log('🔍 Testing repository access...');
    const { data: repoInfo } = await octokit.rest.repos.get({
      owner,
      repo,
    });
    console.log(`✅ Repository found: ${repoInfo.full_name}`);
    console.log(`   Private: ${repoInfo.private ? 'Yes' : 'No'}`);
    console.log(`   Default branch: ${repoInfo.default_branch}\n`);

    // Second test - check posts directory
    console.log('📁 Checking posts directory...');
    const { data: contents } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: 'posts',
    });

    if (!Array.isArray(contents)) {
      console.log('❌ Posts directory is not a directory');
      return;
    }

    const markdownFiles = contents.filter(
      (file) => file.type === 'file' && file.name.endsWith('.md')
    );

    console.log(`✅ Found ${markdownFiles.length} markdown files in posts/`);
    markdownFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.name}`);
    });
    console.log();

    // Third test - fetch and parse content
    if (markdownFiles.length > 0) {
      console.log('📄 Testing content fetching and parsing...');
      
      const testFile = markdownFiles[0];
      const { data: fileContent } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: testFile.path,
      });

      if ('content' in fileContent && fileContent.content) {
        const content = Buffer.from(fileContent.content, 'base64').toString('utf-8');
        const { data: frontmatter, content: markdownContent } = matter(content);
        
        console.log(`✅ Successfully parsed: ${testFile.name}`);
        console.log(`   Title: ${frontmatter.title || 'No title'}`);
        console.log(`   Date: ${frontmatter.date || 'No date'}`);
        console.log(`   Tags: ${frontmatter.tags?.join(', ') || 'No tags'}`);
        console.log(`   Content length: ${markdownContent.length} characters`);
        console.log(`   Draft: ${frontmatter.draft ? 'Yes' : 'No'}`);
      }
    }

    console.log('\n🎉 All GitHub integration tests passed!');
    console.log('   Your blog is ready to fetch content from GitHub.');

  } catch (error) {
    console.error('❌ GitHub integration test failed:');
    console.error('   Error:', error.message);
    
    if (error.status === 401) {
      console.log('\n💡 This looks like an authentication error.');
      console.log('   Please check that your GITHUB_TOKEN is valid and has the correct permissions.');
    } else if (error.status === 404) {
      console.log('\n💡 This looks like a repository not found error.');
      console.log('   Please check that CONTENT_REPO_OWNER and CONTENT_REPO_NAME are correct.');
      console.log('   Make sure the repository exists and the token has access to it.');
    } else if (error.status === 403) {
      console.log('\n💡 This looks like a permissions error.');
      console.log('   Your token might not have the required repository permissions.');
    }
  }
}

// Run the test
testGitHubIntegration().catch(console.error);