import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

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

  constructor() {
    const token = import.meta.env.GITHUB_TOKEN;
    const owner = import.meta.env.CONTENT_REPO_OWNER;
    const repo = import.meta.env.CONTENT_REPO_NAME;

    if (!token || !owner || !repo) {
      throw new Error(
        'Missing required environment variables: GITHUB_TOKEN, CONTENT_REPO_OWNER, CONTENT_REPO_NAME'
      );
    }

    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
  }

  /**
   * Fetch all blog posts from the GitHub repository
   */
  async fetchAllPosts(): Promise<GitHubPost[]> {
    try {
      console.log(`Fetching posts from ${this.owner}/${this.repo}`);
      
      // Get all files from the posts directory
      const { data: contents } = await this.octokit.rest.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: 'posts',
      });

      if (!Array.isArray(contents)) {
        throw new Error('Posts directory not found or is not a directory');
      }

      // Filter for markdown files
      const markdownFiles = contents.filter(
        (file) => file.type === 'file' && file.name.endsWith('.md')
      );

      console.log(`Found ${markdownFiles.length} markdown files`);

      // Fetch content for each file
      const posts = await Promise.all(
        markdownFiles.map(async (file) => {
          try {
            const { data: fileContent } = await this.octokit.rest.repos.getContent({
              owner: this.owner,
              repo: this.repo,
              path: file.path,
            });

            if ('content' in fileContent && fileContent.content) {
              // Decode base64 content
              const content = Buffer.from(fileContent.content, 'base64').toString('utf-8');
              
              // Parse frontmatter
              const { data, content: markdownContent } = matter(content);
              
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

              return post;
            }
            throw new Error(`Could not read content for ${file.name}`);
          } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
            return null;
          }
        })
      );

      // Filter out failed posts and sort by date
      const validPosts = posts.filter((post): post is GitHubPost => post !== null);
      
      return validPosts.sort((a, b) => 
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      );

    } catch (error) {
      console.error('Error fetching posts from GitHub:', error);
      // Return empty array instead of throwing to allow graceful fallback
      return [];
    }
  }

  /**
   * Fetch a single post by slug
   */
  async fetchPost(slug: string): Promise<GitHubPost | null> {
    try {
      const { data: fileContent } = await this.octokit.rest.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: `posts/${slug}.md`,
      });

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
   * Check if the GitHub integration is properly configured
   */
  static isConfigured(): boolean {
    return Boolean(
      import.meta.env.GITHUB_TOKEN &&
      import.meta.env.CONTENT_REPO_OWNER &&
      import.meta.env.CONTENT_REPO_NAME
    );
  }
}