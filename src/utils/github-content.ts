import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Rate limiting configuration for GitHub API
 */
interface RateLimitConfig {
  maxRequestsPerHour: number;
  maxConcurrentRequests: number;
  retryDelay: number;
  maxRetries: number;
}

/**
 * Cached content entry with metadata
 */
interface CachedContent {
  sha: string;
  content: string;
  frontmatter: any;
  cachedAt: number;
  size: number;
}

/**
 * Cache configuration
 */
interface CacheConfig {
  enabled: boolean;
  directory: string;
  maxAge: number; // milliseconds
  maxSize: number; // bytes
}

/**
 * Content cache manager for GitHub API responses
 */
class ContentCache {
  private config: CacheConfig;
  private cacheDir: string;

  constructor(config: CacheConfig) {
    this.config = config;
    this.cacheDir = config.directory;
  }

  /**
   * Initialize cache directory
   */
  async init(): Promise<void> {
    if (!this.config.enabled) return;
    
    try {
      if (!existsSync(this.cacheDir)) {
        await mkdir(this.cacheDir, { recursive: true });
      }
    } catch (error) {
      console.warn('⚠️ Could not initialize cache directory:', error);
      this.config.enabled = false;
    }
  }

  /**
   * Get cache file path for a given SHA
   */
  private getCacheFilePath(sha: string): string {
    return join(this.cacheDir, `${sha}.json`);
  }

  /**
   * Check if content is cached and valid
   */
  async isCached(sha: string): Promise<boolean> {
    if (!this.config.enabled) return false;
    
    try {
      const cacheFile = this.getCacheFilePath(sha);
      if (!existsSync(cacheFile)) return false;
      
      const cached = await this.get(sha);
      if (!cached) return false;
      
      // Check if cache is expired
      const age = Date.now() - cached.cachedAt;
      if (age > this.config.maxAge) {
        await this.delete(sha);
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn(`⚠️ Cache check failed for ${sha}:`, error);
      return false;
    }
  }

  /**
   * Get cached content by SHA
   */
  async get(sha: string): Promise<CachedContent | null> {
    if (!this.config.enabled) return null;
    
    try {
      const cacheFile = this.getCacheFilePath(sha);
      if (!existsSync(cacheFile)) return null;
      
      const data = await readFile(cacheFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.warn(`⚠️ Failed to read cache for ${sha}:`, error);
      return null;
    }
  }

  /**
   * Store content in cache
   */
  async set(sha: string, content: string, frontmatter: any): Promise<void> {
    if (!this.config.enabled) return;
    
    try {
      const size = Buffer.byteLength(content, 'utf-8');
      
      // Check size limit
      if (size > this.config.maxSize) {
        console.warn(`⚠️ Content too large to cache (${size} bytes), skipping`);
        return;
      }
      
      const cached: CachedContent = {
        sha,
        content,
        frontmatter,
        cachedAt: Date.now(),
        size,
      };
      
      const cacheFile = this.getCacheFilePath(sha);
      await writeFile(cacheFile, JSON.stringify(cached), 'utf-8');
      
      console.log(`💾 Cached content for ${sha} (${size} bytes)`);
    } catch (error) {
      console.warn(`⚠️ Failed to cache content for ${sha}:`, error);
    }
  }

  /**
   * Delete cached content
   */
  async delete(sha: string): Promise<void> {
    if (!this.config.enabled) return;
    
    try {
      const cacheFile = this.getCacheFilePath(sha);
      if (existsSync(cacheFile)) {
        const fs = await import('fs/promises');
        await fs.unlink(cacheFile);
      }
    } catch (error) {
      console.warn(`⚠️ Failed to delete cache for ${sha}:`, error);
    }
  }

  /**
   * Clear all cached content
   */
  async clear(): Promise<void> {
    if (!this.config.enabled) return;
    
    try {
      const fs = await import('fs/promises');
      const files = await fs.readdir(this.cacheDir);
      
      await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(file => fs.unlink(join(this.cacheDir, file)))
      );
      
      console.log('🗑️ Cleared content cache');
    } catch (error) {
      console.warn('⚠️ Failed to clear cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{ files: number; totalSize: number; enabled: boolean }> {
    if (!this.config.enabled) {
      return { files: 0, totalSize: 0, enabled: false };
    }
    
    try {
      const fs = await import('fs/promises');
      const files = await fs.readdir(this.cacheDir);
      const cacheFiles = files.filter(file => file.endsWith('.json'));
      
      let totalSize = 0;
      for (const file of cacheFiles) {
        const stat = await fs.stat(join(this.cacheDir, file));
        totalSize += stat.size;
      }
      
      return { files: cacheFiles.length, totalSize, enabled: true };
    } catch (error) {
      return { files: 0, totalSize: 0, enabled: false };
    }
  }
}

/**
 * Rate limiter class to control GitHub API request rate
 */
class RateLimiter {
  private requests: number[] = [];
  private config: RateLimitConfig;
  private activeRequests = 0;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Wait if necessary to respect rate limits
   */
  async waitForRateLimit(): Promise<void> {
    // Wait if too many concurrent requests
    while (this.activeRequests >= this.config.maxConcurrentRequests) {
      await this.sleep(100);
    }

    // Clean old requests (older than 1 hour)
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    this.requests = this.requests.filter(timestamp => timestamp > oneHourAgo);

    // Wait if hourly limit would be exceeded
    if (this.requests.length >= this.config.maxRequestsPerHour) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = (oldestRequest + 60 * 60 * 1000) - Date.now();
      if (waitTime > 0) {
        console.log(`⏳ Rate limit reached, waiting ${Math.ceil(waitTime / 1000)}s...`);
        await this.sleep(waitTime);
      }
    }

    // Record this request
    this.requests.push(Date.now());
    this.activeRequests++;
  }

  /**
   * Mark request as completed
   */
  markRequestComplete(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
  }

  /**
   * Get current rate limit status
   */
  getStatus() {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recentRequests = this.requests.filter(timestamp => timestamp > oneHourAgo);
    return {
      requestsInLastHour: recentRequests.length,
      maxRequestsPerHour: this.config.maxRequestsPerHour,
      activeRequests: this.activeRequests,
      maxConcurrentRequests: this.config.maxConcurrentRequests,
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export interface GitHubPost {
  slug: string;
  content: string;
  data: {
    title: string;
    description: string;
    date: Date;
    updatedDate?: Date;
    tags?: string[];
    draft?: boolean;
    author?: string;
    heroImage?: string;
  };
}

export class GitHubContentFetcher {
  private octokit: Octokit;
  private owner: string;
  private repo: string;
  private rateLimiter: RateLimiter;
  private cache: ContentCache;

  constructor() {
    const token = process.env.CONTENT_API_TOKEN;
    const owner = process.env.CONTENT_REPO_OWNER;
    const repo = process.env.CONTENT_REPO_NAME;

    if (!token || !owner || !repo) {
      throw new Error(
        'Missing required environment variables: CONTENT_API_TOKEN, CONTENT_REPO_OWNER, CONTENT_REPO_NAME'
      );
    }

    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
    
    console.log(`[GitHubContentFetcher] ✅ Initialized successfully for ${owner}/${repo}`);
    
    // Configure rate limiter for GitHub API (conservative limits)
    this.rateLimiter = new RateLimiter({
      maxRequestsPerHour: 4500, // 90% of GitHub's 5000/hour limit for safety
      maxConcurrentRequests: 10, // Limit concurrent requests
      retryDelay: 1000, // 1 second initial retry delay
      maxRetries: 3, // Maximum retry attempts
    });

    // Configure content cache
    this.cache = new ContentCache({
      enabled: process.env.CONTENT_CACHE_ENABLED !== 'false', // Enable by default, disable with env var
      directory: '.github-content-cache',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      maxSize: 10 * 1024 * 1024, // 10MB per file
    });
  }

  /**
   * Initialize the fetcher (sets up cache)
   */
  async init(): Promise<void> {
    await this.cache.init();
    
    const cacheStats = await this.cache.getStats();
    if (cacheStats.enabled) {
      console.log(`💾 Content cache initialized: ${cacheStats.files} files, ${Math.round(cacheStats.totalSize / 1024)}KB`);
    } else {
      console.log('🚫 Content cache disabled');
    }
  }

  /**
   * Make a rate-limited API call with comprehensive retry logic
   */
  private async makeRateLimitedRequest<T>(
    apiCall: () => Promise<T>,
    retryCount = 0
  ): Promise<T> {
    await this.rateLimiter.waitForRateLimit();
    
    try {
      const result = await apiCall();
      this.rateLimiter.markRequestComplete();
      return result;
    } catch (error: any) {
      this.rateLimiter.markRequestComplete();
      
      // Determine if this error is retryable
      const isRetryable = this.isRetryableError(error);
      
      if (isRetryable && retryCount < this.rateLimiter['config'].maxRetries) {
        const delay = this.calculateBackoffDelay(error, retryCount);
        const errorType = this.getErrorType(error);
        
        console.log(`🔄 ${errorType}, retrying in ${delay}ms (attempt ${retryCount + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.makeRateLimitedRequest(apiCall, retryCount + 1);
      }
      
      // Log non-retryable or max-retries-reached errors
      if (retryCount >= this.rateLimiter['config'].maxRetries) {
        console.error(`❌ Max retries reached for ${this.getErrorType(error)}`);
      }
      
      throw error;
    }
  }

  /**
   * Determine if an error is retryable
   */
  private isRetryableError(error: any): boolean {
    // Rate limit errors (403 with rate limit message)
    if (error.status === 403 && error.message?.includes('rate limit')) {
      return true;
    }
    
    // GitHub server errors (5xx)
    if (error.status >= 500 && error.status < 600) {
      return true;
    }
    
    // Network errors (no status code)
    if (!error.status && (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT')) {
      return true;
    }
    
    // GitHub abuse detection (retry after)
    if (error.status === 403 && error.headers?.['retry-after']) {
      return true;
    }
    
    // Temporary GitHub issues (502, 503, 504)
    if ([502, 503, 504].includes(error.status)) {
      return true;
    }
    
    return false;
  }

  /**
   * Calculate backoff delay based on error type
   */
  private calculateBackoffDelay(error: any, retryCount: number): number {
    const baseDelay = this.rateLimiter['config'].retryDelay;
    
    // Use retry-after header if available
    if (error.headers?.['retry-after']) {
      const retryAfter = parseInt(error.headers['retry-after']);
      return retryAfter * 1000; // Convert to milliseconds
    }
    
    // Rate limit errors - longer delays
    if (error.status === 403 && error.message?.includes('rate limit')) {
      return baseDelay * Math.pow(3, retryCount); // More aggressive backoff for rate limits
    }
    
    // Server errors - exponential backoff
    if (error.status >= 500) {
      return baseDelay * Math.pow(2, retryCount);
    }
    
    // Network errors - moderate backoff
    if (!error.status) {
      return baseDelay * Math.pow(1.5, retryCount);
    }
    
    // Default exponential backoff
    return baseDelay * Math.pow(2, retryCount);
  }

  /**
   * Get human-readable error type for logging
   */
  private getErrorType(error: any): string {
    if (error.status === 403 && error.message?.includes('rate limit')) {
      return 'Rate limit exceeded';
    }
    
    if (error.status >= 500) {
      return `GitHub server error (${error.status})`;
    }
    
    if (!error.status) {
      return `Network error (${error.code || 'unknown'})`;
    }
    
    if (error.status === 403 && error.headers?.['retry-after']) {
      return 'GitHub abuse detection';
    }
    
    if ([502, 503, 504].includes(error.status)) {
      return `GitHub service unavailable (${error.status})`;
    }
    
    return `API error (${error.status})`;
  }

  /**
   * Fetch all blog posts from the GitHub repository
   */
  async fetchAllPosts(): Promise<GitHubPost[]> {
    try {
      console.log(`[GitHubContentFetcher] 🚀 Starting to fetch posts from ${this.owner}/${this.repo}`);
      
      // Initialize cache if not already done
      await this.init();
      
      // Log initial rate limit status
      const initialStatus = this.rateLimiter.getStatus();
      console.log(`[GitHubContentFetcher] 📊 Rate limit status: ${initialStatus.requestsInLastHour}/${initialStatus.maxRequestsPerHour} requests used`);
      
      // Get all files from the posts directory (rate-limited)
      console.log(`[GitHubContentFetcher] 📂 Fetching posts directory contents...`);
      const { data: contents } = await this.makeRateLimitedRequest(() =>
        this.octokit.rest.repos.getContent({
          owner: this.owner,
          repo: this.repo,
          path: 'posts',
        })
      );

      if (!Array.isArray(contents)) {
        console.error(`[GitHubContentFetcher] ❌ Posts directory not found or is not a directory`);
        throw new Error('Posts directory not found or is not a directory');
      }

      // Filter for markdown files
      const markdownFiles = contents.filter(
        (file) => file.type === 'file' && file.name.endsWith('.md')
      );

      console.log(`[GitHubContentFetcher] 📄 Found ${markdownFiles.length} markdown files in repository`);
      
      if (markdownFiles.length === 0) {
        console.warn(`[GitHubContentFetcher] ⚠️ Warning: No markdown files found in posts directory. This might be unexpected.`);
        return [];
      }

      // Check cache status and plan fetching strategy
      const cacheResults = await Promise.all(
        markdownFiles.map(async (file) => ({
          file,
          cached: await this.cache.isCached(file.sha!),
        }))
      );

      const cachedFiles = cacheResults.filter(r => r.cached);
      const uncachedFiles = cacheResults.filter(r => !r.cached);

      console.log(`[GitHubContentFetcher] 💾 Cache analysis: ${cachedFiles.length} files cached, ${uncachedFiles.length} need fetching from API`);
      
      if (cachedFiles.length > 0) {
        console.log(`[GitHubContentFetcher] 💾 Cache HIT for files: ${cachedFiles.map(f => f.file.name).join(', ')}`);
      }
      if (uncachedFiles.length > 0) {
        console.log(`[GitHubContentFetcher] 📡 Cache MISS for files: ${uncachedFiles.map(f => f.file.name).join(', ')}`);
      }

      // Fetch content for each file, using cache when available
      const posts: (GitHubPost | null)[] = [];
      
      // Process cached files first (fast)
      console.log(`[GitHubContentFetcher] 💾 Processing ${cachedFiles.length} cached files...`);
      for (const { file } of cachedFiles) {
        const processedPost = await this.processFileFromCache(file);
        posts.push(processedPost);
      }

      // Process uncached files (requires API calls)
      console.log(`[GitHubContentFetcher] 📡 Processing ${uncachedFiles.length} uncached files via API...`);
      for (let i = 0; i < uncachedFiles.length; i++) {
        const { file } = uncachedFiles[i];
        console.log(`[GitHubContentFetcher] 📄 Fetching ${file.name} (${i + 1}/${uncachedFiles.length})`);
        
        const processedPost = await this.processFileFromAPI(file);
        posts.push(processedPost);
      }

      // Filter out failed posts and sort by date
      const validPosts = posts.filter((post): post is GitHubPost => post !== null);
      const failedCount = posts.length - validPosts.length;
      
      console.log(`[GitHubContentFetcher] ✅ Processing complete: ${validPosts.length} posts successfully processed`);
      if (failedCount > 0) {
        console.warn(`[GitHubContentFetcher] ⚠️ ${failedCount} files failed to process (see individual errors above)`);
      }
      
      // Log final status
      const finalStatus = this.rateLimiter.getStatus();
      const finalCacheStats = await this.cache.getStats();
      console.log(`[GitHubContentFetcher] 📊 Final rate limit status: ${finalStatus.requestsInLastHour}/${finalStatus.maxRequestsPerHour} requests used`);
      console.log(`[GitHubContentFetcher] 💾 Final cache status: ${finalCacheStats.files} files, ${Math.round(finalCacheStats.totalSize / 1024)}KB`);
      
      const sortedPosts = validPosts.sort((a, b) => 
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      );
      
      console.log(`[GitHubContentFetcher] 🎉 Returning ${sortedPosts.length} posts sorted by date`);
      return sortedPosts;

    } catch (error) {
      console.error('[GitHubContentFetcher] ❌ FATAL: Failed to fetch posts from GitHub:', error);
      // Return empty array instead of throwing to allow graceful fallback
      return [];
    }
  }

  /**
   * Fetch a single post by slug
   */
  async fetchPost(slug: string): Promise<GitHubPost | null> {
    try {
      const { data: fileContent } = await this.makeRateLimitedRequest(() =>
        this.octokit.rest.repos.getContent({
          owner: this.owner,
          repo: this.repo,
          path: `posts/${slug}.md`,
        })
      );

      if ('content' in fileContent && fileContent.content) {
        const content = Buffer.from(fileContent.content, 'base64').toString('utf-8');
        const { data, content: markdownContent } = matter(content);

        return {
          slug,
          content: markdownContent,
          data: {
            title: data.title || 'Untitled',
            description: data.description || '',
            date: data.date ? new Date(data.date) : new Date(),
            updatedDate: data.updatedDate ? new Date(data.updatedDate) : undefined,
            tags: Array.isArray(data.tags) ? data.tags : [],
            draft: Boolean(data.draft),
            author: data.author || 'Ali Alqattan',
            heroImage: data.heroImage || undefined,
          },
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching post ${slug}:`, error);
      return null;
    }
  }

  /**
   * Process a file from cache with error handling
   */
  private async processFileFromCache(file: any): Promise<GitHubPost | null> {
    try {
      const cached = await this.cache.get(file.sha!);
      if (!cached) {
        console.warn(`[GitHubContentFetcher] ⚠️ Cache miss for ${file.name} (expected cache hit)`);
        return null;
      }
      
      const slug = file.name.replace(/\.md$/, '');
      const post: GitHubPost = {
        slug,
        content: cached.content,
        data: {
          title: cached.frontmatter.title || 'Untitled',
          description: cached.frontmatter.description || '',
          date: cached.frontmatter.date ? new Date(cached.frontmatter.date) : new Date(),
          updatedDate: cached.frontmatter.updatedDate ? new Date(cached.frontmatter.updatedDate) : undefined,
          tags: Array.isArray(cached.frontmatter.tags) ? cached.frontmatter.tags : [],
          draft: Boolean(cached.frontmatter.draft),
          author: cached.frontmatter.author || 'Ali Alqattan',
          heroImage: cached.frontmatter.heroImage || undefined,
        },
      };
      
      console.log(`[GitHubContentFetcher] ✅ Loaded ${file.name} from cache`);
      return post;
    } catch (error) {
      console.error(`[GitHubContentFetcher] ❌ Failed to process cached file ${file.name}:`, error);
      return null;
    }
  }

  /**
   * Process a file from GitHub API with error handling
   */
  private async processFileFromAPI(file: any): Promise<GitHubPost | null> {
    try {
      const { data: fileContent } = await this.makeRateLimitedRequest(() =>
        this.octokit.rest.repos.getContent({
          owner: this.owner,
          repo: this.repo,
          path: file.path,
        })
      );

      if (!('content' in fileContent) || !fileContent.content) {
        console.error(`[GitHubContentFetcher] ❌ No content found for ${file.name}`);
        return null;
      }

      // Decode base64 content
      const content = Buffer.from(fileContent.content, 'base64').toString('utf-8');
      
      // Parse frontmatter
      const { data, content: markdownContent } = matter(content);
      
      // Cache the content for future use
      await this.cache.set(file.sha!, markdownContent, data);
      
      // Generate slug from filename
      const slug = file.name.replace(/\.md$/, '');

      // Validate and transform frontmatter
      const post: GitHubPost = {
        slug,
        content: markdownContent,
        data: {
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date ? new Date(data.date) : new Date(),
          updatedDate: data.updatedDate ? new Date(data.updatedDate) : undefined,
          tags: Array.isArray(data.tags) ? data.tags : [],
          draft: Boolean(data.draft),
          author: data.author || 'Ali Alqattan',
          heroImage: data.heroImage || undefined,
        },
      };

      console.log(`[GitHubContentFetcher] ✅ Processed ${file.name} from API (${Math.round(content.length/1024)}KB)`);
      return post;
      
    } catch (error) {
      console.error(`[GitHubContentFetcher] ❌ Failed to process file ${file.name} from API:`, error);
      return null;
    }
  }

  /**
   * Get current rate limit status for monitoring
   */
  getRateLimitStatus() {
    return this.rateLimiter.getStatus();
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    return this.cache.getStats();
  }

  /**
   * Clear the content cache
   */
  async clearCache(): Promise<void> {
    await this.cache.clear();
  }

  /**
   * Check if content caching is enabled
   */
  isCacheEnabled(): boolean {
    return this.cache['config'].enabled;
  }

  /**
   * Check if the GitHub integration is properly configured
   */
  static isConfigured(): boolean {
    return Boolean(
      process.env.CONTENT_API_TOKEN &&
      process.env.CONTENT_REPO_OWNER &&
      process.env.CONTENT_REPO_NAME
    );
  }
}