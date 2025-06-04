// Removed BlogPostMetadata import as it's inferred from getSortedPostsData
import {getSortedPostsData} from '@/lib/blog';
import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";
import {BentoGrid, BentoGridItem} from "@/components/ui/bento-grid";

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
            <BentoGrid className="max-w-4xl mx-auto">
                {posts.map((post, i) => (
                    <BentoGridItem
                        key={i}
                        title={post.title}
                        description={post.excerpt}
                        header={post.featureImage}
                        icon={''}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        url={`blog/${post.slug}`}
                    />
                ))}
            </BentoGrid>
            {/*{posts.map((post) => (*/}


            {/*    <div className="max-w-xs w-full group/card gap-3" key={post.slug}>*/}
            {/*        <Link href={`/blog/${post.slug}`} prefetch>*/}
            {/*            <div*/}
            {/*                className={cn(*/}
            {/*                    ` cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",*/}
            {/*                "bg-[url(${post.featureImage || '/images/placeholder-image.png'})] bg-cover`*/}
            {/*                )}*/}
            {/*            >*/}
            {/*                <div*/}
            {/*                    className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>*/}
            {/*                <div className="flex flex-row items-center space-x-4 z-10">*/}
            {/*                    <img*/}
            {/*                        height="100"*/}
            {/*                        width="100"*/}
            {/*                        alt="Avatar"*/}
            {/*                        src={'/logo-anim.gif'}*/}
            {/*                        className="h-10 w-10 rounded-full border-2 object-cover"*/}
            {/*                    />*/}
            {/*                    <div className="flex flex-col">*/}
            {/*                        <p className="font-normal text-base text-gray-50 relative z-10">*/}
            {/*                            {post.title}*/}
            {/*                        </p>*/}
            {/*                        <p className="text-sm text-gray-400">2 min read</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="text content">*/}
            {/*                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4">*/}
            {/*                        {post.excerpt}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </Link>*/}
            {/*    </div>*/}

            {/*    // <PinContainer*/}
            {/*    //     title={post.title}*/}
            {/*    //     key={post.slug}*/}
            {/*    //     href={`/blog/${post.slug}`}*/}
            {/*    //     className="gap-5"*/}
            {/*    // >*/}
            {/*    //     <div*/}
            {/*    //         className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">*/}
            {/*    //         <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">*/}
            {/*    //             {post.title}*/}
            {/*    //         </h3>*/}
            {/*    //         <div className="text-base !m-0 !p-0 font-normal">*/}
            {/*    //             <span className="text-slate-500 ">*/}
            {/*    //              {post.excerpt}*/}
            {/*    //             </span>*/}
            {/*    //         </div>*/}
            {/*    //         <div*/}
            {/*    //             style={{backgroundImage: `url(${post.featureImage || '/images/placeholder-image.png'})`}}*/}
            {/*    //             className="flex flex-1 w-full rounded-lg mt-4 bg-cover bg-center bg-no-repeat">*/}
            {/*    //         </div>*/}
            {/*    //     </div>*/}
            {/*    // </PinContainer>*/}
            {/*))}*/}
        </div>
    );
};

export default BlogPage;
