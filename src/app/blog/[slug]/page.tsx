import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock, Home } from "lucide-react";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import Logo from "@/components/Logo";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | NGEK TECH",
    };
  }

  return {
    title: `${post.title} | NGEK TECH Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Logo size={32} />
              <span className="text-lg font-bold gradient-text">NGEK TECH</span>
            </Link>
            <Link
              href="/#blog"
              className="flex items-center gap-2 text-[#666] hover:text-[#ff6b00] transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#767676] mb-8">
            <Link href="/" className="hover:text-[#ff6b00] transition-colors">
              <Home size={14} />
            </Link>
            <span>/</span>
            <Link href="/#blog" className="hover:text-[#ff6b00] transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#666]">{post.title}</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[#767676] mb-8">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              8 min read
            </span>
            <span className="px-2 py-1 bg-[#fff5eb] text-[#ff6b00] rounded-full text-xs font-medium">
              Tech Blog
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold gradient-text mb-8">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mt-12 mb-4 border-b border-[#e5e5e5] pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[#333] leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-[#333]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2 text-[#333]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[#333]">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) {
                    return (
                      <code className="block bg-[#1a1a1a] text-[#39ff14] p-4 rounded-xl overflow-x-auto text-sm font-mono my-4">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="bg-[#fff5eb] text-[#ff6b00] px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-[#1a1a1a] text-[#39ff14] p-4 rounded-xl overflow-x-auto text-sm font-mono my-4">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="guardrail py-4 my-6 italic text-[#666]">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[#ff6b00]">{children}</strong>
                ),
                hr: () => <div className="section-divider my-8" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-[#e5e5e5]">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              <ArrowLeft size={18} />
              Back to All Articles
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#767676]">
            &copy; {new Date().getFullYear()} NGEK TECH. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
