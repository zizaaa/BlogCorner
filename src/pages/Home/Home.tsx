import { useInfiniteQuery } from "@tanstack/react-query";
import { BlogCard, cookieStore, LoadingBlogCard, serverURL } from "../../components/links";
import axios from "axios";
import { Blog } from "../../types/Data";
import { Toaster } from "react-hot-toast";

function Home() {
    const { getToken } = cookieStore();
    
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['blogs'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(`${serverURL}/api/blogs/get/blogs`, {
                params: { page: pageParam, limit: 100 },
            });

            //get token
            getToken();
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            // Determine if there is a next page
            if (lastPage.length === 100) {
                return allPages.length + 1; // next page number
            } else {
                return undefined; // no more pages
            }
        },
        initialPageParam: 1, // Start with page 1
    });

    return (
        <section className="p-2 w-full flex flex-col gap-2">
            <Toaster/>
            {
                isLoading ?
                (
                    <LoadingBlogCard/>
                ):(
                    data?.pages.map((page) =>
                        page.map((blog: Blog) => (
                            <BlogCard 
                                blog = {blog}
                                key={blog.id}
                            />
                        ))
                    )
                )
            }
            {hasNextPage && (
                <div className="w-full flex items-center justify-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className="flex items-center justify-center text-center px-3 py-2 rounded-full drop-shadow-lg text-sm font-medium bg-darkCyan text-white"
                    >
                        {isFetchingNextPage ? "Loading more..." : "Load more..."}
                    </button>
                </div>
            )}
        </section>
    );
}

export default Home;