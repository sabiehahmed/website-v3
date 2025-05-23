import Image from 'next/image'; // Using Next/Image for feature image
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { config } from '@/lib/config'; // Import config
import SocialShareButtons from '@/components/social-share-buttons'; // Import new component
import CopyLinkButton from '@/components/copy-link-button'; // Import new component

// BlogPostMetadata is implicitly typed by getPostData, so direct import might not be needed unless used elsewhere

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const post = await getPostData(params.slug);

  if (!post) {
    // This can be handled by Next.js's notFound function if preferred
    return <div className="max-w-3xl mx-auto p-4 md:p-8 text-center">Blog post not found.</div>;
  }

  const postUrl = `${config.metadata.metadataBase}/blog/${post.slug}`;

  return (
    <article className="max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">{post.title}</h1>
      <div className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
        {post.author && <span>By {post.author} | </span>}
        <span>Published on {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-xl">
        <Image
          src={post.featureImage || "/images/placeholder-image.png"} // Fallback image
          alt={post.title}
          layout="fill"
          objectFit="cover"
          priority 
        />
      </div>
      
      {/* Removed prose-lg for more granular control if needed, relying on .markdown-content from globals.css */}
      <div className="bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-lg shadow-md markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700 flex flex-col items-center gap-6">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Share this post:</p>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3">
          <SocialShareButtons title={post.title} url={postUrl} />
          <CopyLinkButton url={postUrl} />
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
