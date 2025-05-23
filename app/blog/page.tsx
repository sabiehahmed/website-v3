import Link from 'next/link';
// Removed BlogPostMetadata import as it's inferred from getSortedPostsData
import {getSortedPostsData} from '@/lib/blog';
import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";
import {PinContainer} from "@/components/ui/3d-pin";

const words = [
    {
        text: "I",
    },
    {
        text: "am",
    },
    {
        text: "still",
    },
    {
        text: "Writing",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "stuff.",
    },
];
const BlogPage = () => {
    const posts = getSortedPostsData(); // Fetch actual blog post data
    if (!posts.length) {
        return (
            <div className="max-w-4xl mx-auto p-4 md:p-8 mt-[100px]">
                <TypewriterEffectSmooth className={'justify-center items-center text-center'} words={words}/>
            </div>
        )
    }
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 mt-[100px]">
            <h1 className="text-4xl font-bold mb-8 text-left top-[-40px]">Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} passHref legacyBehavior>
                        <PinContainer
                            title={post.title}
                            href={`/blog/${post.slug}`}
                        >
                            <div
                                className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                                    {post.title}
                                </h3>
                                <div className="text-base !m-0 !p-0 font-normal">
                                <span className="text-slate-500 ">
                                 {post.excerpt}
                                </span>
                                </div>
                                <div
                                    style={{backgroundImage: `url(${post.featureImage || '/images/placeholder-image.png'})`}}
                                    className="flex flex-1 w-full rounded-lg mt-4 bg-cover bg-center bg-no-repeat">
                                </div>
                            </div>
                        </PinContainer>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
