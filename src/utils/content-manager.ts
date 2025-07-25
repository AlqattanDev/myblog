import { getCollection, type CollectionEntry } from 'astro:content';
import { GitHubContentFetcher, type GitHubPost } from './github-content.js';
import { marked } from 'marked';

export type BlogPost = CollectionEntry<'blog'> | {
  id: string;
  slug: string;
  body: string;
  collection: 'blog';
  data: {
    title: string;
    description: string;
    date: Date;
    updatedDate?: Date;
    slug?: string;
    draft?: boolean;
    tags?: string[];
    heroImage?: string;
    author?: string;
  };
  render: () => Promise<{ Content: any }>;
};

export class ContentManager {
  private githubFetcher: GitHubContentFetcher | null = null;

  constructor() {
    // Only initialize GitHub fetcher if properly configured
    if (GitHubContentFetcher.isConfigured()) {
      try {
        this.githubFetcher = new GitHubContentFetcher();
        console.log('[ContentManager] ✅ GitHub integration enabled');
      } catch (error) {
        console.warn('[ContentManager] ⚠️ GitHub content fetcher initialization failed:', error);
        this.githubFetcher = null;
      }
    } else {
      console.log('[ContentManager] ℹ️ GitHub integration disabled (missing environment variables)');
    }
  }

  /**
   * Get all blog posts from both local content collections and GitHub
   */
  async getAllPosts(): Promise<BlogPost[]> {
    console.log('[ContentManager] 🚀 Starting content aggregation...');
    
    const localPosts = await this.getLocalPosts();
    const githubPosts = await this.getGitHubPosts();

    console.log(`[ContentManager] 📁 Found ${localPosts.length} local posts`);
    console.log(`[ContentManager] 📡 Found ${githubPosts.length} GitHub posts`);

    // Combine and deduplicate posts (local takes precedence)
    const allPosts = [...localPosts];
    const localSlugs = new Set(localPosts.map(post => post.slug));

    let addedGitHubPosts = 0;
    let skippedGitHubPosts = 0;

    // Add GitHub posts that don't exist locally
    for (const githubPost of githubPosts) {
      if (!localSlugs.has(githubPost.slug)) {
        allPosts.push(this.convertGitHubPost(githubPost));
        addedGitHubPosts++;
      } else {
        skippedGitHubPosts++;
      }
    }

    console.log(`[ContentManager] 🔄 Content merge: ${addedGitHubPosts} GitHub posts added, ${skippedGitHubPosts} skipped (local override)`);

    // Sort by date (newest first) and filter out drafts
    const publishedPosts = allPosts.filter(post => !post.data.draft);
    const draftCount = allPosts.length - publishedPosts.length;
    
    console.log(`[ContentManager] 📝 Filtered ${draftCount} draft posts, ${publishedPosts.length} published posts remaining`);

    const sortedPosts = publishedPosts.sort((a, b) => 
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

    console.log(`[ContentManager] ✅ Content aggregation complete: returning ${sortedPosts.length} posts`);
    return sortedPosts;
  }

  /**
   * Get a single post by slug from local or GitHub sources
   */
  async getPost(slug: string): Promise<BlogPost | null> {
    // Try local first
    const localPost = await this.getLocalPost(slug);
    if (localPost) {
      return localPost;
    }

    // Fallback to GitHub
    const githubPost = await this.getGitHubPost(slug);
    if (githubPost) {
      return this.convertGitHubPost(githubPost);
    }

    return null;
  }

  /**
   * Get all posts from local content collections
   */
  private async getLocalPosts(): Promise<CollectionEntry<'blog'>[]> {
    try {
      return await getCollection('blog');
    } catch (error) {
      console.warn('Error fetching local posts:', error);
      return [];
    }
  }

  /**
   * Get a single local post by slug
   */
  private async getLocalPost(slug: string): Promise<CollectionEntry<'blog'> | null> {
    try {
      const posts = await getCollection('blog');
      return posts.find(post => post.slug === slug) || null;
    } catch (error) {
      console.warn('Error fetching local post:', error);
      return null;
    }
  }

  /**
   * Get all posts from GitHub
   */
  private async getGitHubPosts(): Promise<GitHubPost[]> {
    if (!this.githubFetcher) {
      console.log('[ContentManager] ℹ️ GitHub fetcher not available, skipping GitHub posts');
      return [];
    }

    try {
      console.log('[ContentManager] 📡 Fetching posts from GitHub...');
      const posts = await this.githubFetcher.fetchAllPosts();
      console.log(`[ContentManager] ✅ Successfully fetched ${posts.length} posts from GitHub`);
      return posts;
    } catch (error) {
      console.warn('[ContentManager] ⚠️ Error fetching GitHub posts:', error);
      return [];
    }
  }

  /**
   * Get a single GitHub post by slug
   */
  private async getGitHubPost(slug: string): Promise<GitHubPost | null> {
    if (!this.githubFetcher) {
      return null;
    }

    try {
      return await this.githubFetcher.fetchPost(slug);
    } catch (error) {
      console.warn('Error fetching GitHub post:', error);
      return null;
    }
  }

  /**
   * Convert GitHub post to Astro collection entry format
   */
  private convertGitHubPost(githubPost: GitHubPost): BlogPost {
    return {
      id: githubPost.slug,
      slug: githubPost.slug,
      body: githubPost.content,
      collection: 'blog',
      data: {
        title: githubPost.data.title,
        description: githubPost.data.description,
        date: githubPost.data.date,
        updatedDate: githubPost.data.updatedDate,
        slug: githubPost.data.slug,
        draft: githubPost.data.draft || false,
        tags: githubPost.data.tags || [],
        heroImage: githubPost.data.heroImage,
        author: githubPost.data.author || 'Ali Alqattan',
      },
      render: async () => {
        // GitHub posts will be handled differently in pages
        throw new Error('GitHub posts should not use render() - use body content directly');
      },
    };
  }

  /**
   * Check if GitHub integration is available
   */
  isGitHubEnabled(): boolean {
    return this.githubFetcher !== null;
  }

  /**
   * Get content source information for debugging
   */
  getContentSources(): { local: boolean; github: boolean } {
    return {
      local: true, // Always available
      github: this.isGitHubEnabled(),
    };
  }
}