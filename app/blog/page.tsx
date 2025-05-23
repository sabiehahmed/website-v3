import Link from 'next/link';
import Image from 'next/image'; // Import Image for potential future use, but will use <img> for now as per instructions
// Removed BlogPostMetadata import as it's inferred from getSortedPostsData
import { getSortedPostsData } from '@/lib/blog'; // Import the new function

const BlogPage = () => {
  const posts = getSortedPostsData(); // Fetch actual blog post data

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} passHref legacyBehavior>
            <a className="block bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out border border-gray-200 dark:border-zinc-700 flex flex-col min-h-[380px] group">
              <div className="relative w-full h-48">
                <Image
                  src={post.featureImage || "/images/placeholder-image.png"} // Fallback image
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 group-hover:opacity-90"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {post.author && `By ${post.author} - `}{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-gray-700 dark:text-gray-300 flex-grow text-base leading-relaxed">{post.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
