import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
}

/**
 * Gets all blog post slugs.
 * @returns Array of slugs.
 */
export function getAllBlogSlugs(): string[] {
  // Guardrail: Check if directory exists.
  if (!fs.existsSync(BLOG_DIR)) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Blog directory does not exist.");
    }
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  // Guardrail: Filter only markdown files.
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}

/**
 * Gets a single blog post by slug.
 * @param slug - The post slug.
 * @returns The blog post or null if not found.
 */
export function getBlogPost(slug: string): BlogPost | null {
  // Guardrail: Sanitize slug to prevent path traversal.
  const sanitizedSlug = slug.replace(/[^a-z0-9-]/gi, "");

  const filePath = path.resolve(BLOG_DIR, `${sanitizedSlug}.md`);
  const resolvedBlogDir = path.resolve(BLOG_DIR);

  // Guardrail: Verify path is within BLOG_DIR to prevent path traversal.
  if (!filePath.startsWith(resolvedBlogDir)) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Path traversal attempt detected.");
    }
    return null;
  }

  // Guardrail: Check if file exists.
  if (!fs.existsSync(filePath)) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Blog post not found: ${sanitizedSlug}`);
    }
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContents);

  // Extract title from first heading.
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : sanitizedSlug;

  // Extract excerpt from first paragraph.
  const paragraphMatch = content.match(/\n\n([^#\n].+)/);
  const excerpt = paragraphMatch
    ? paragraphMatch[1].substring(0, 200)
    : "";

  return {
    slug: sanitizedSlug,
    title,
    content,
    excerpt,
  };
}

/**
 * Gets all blog posts.
 * @returns Array of blog posts.
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();

  return slugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null);
}
