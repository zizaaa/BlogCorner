import { useParams } from 'react-router-dom'
import { BlogCard, cookieStore, fetchSingleUser, LoadingBlogCard, ProfileComponent, serverURL } from '../../components/links';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Blog } from '../../types/Data';

function VisitProfile() {
    const { id } = useParams();
    const { token,getToken } = cookieStore();

    const { data:userData, isLoading:userDataLoading } = fetchSingleUser(id as string)

    const {
        data:blogs,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading:blogLoading
    } = useInfiniteQuery({
        queryKey: ['blogs',token, id],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(`${serverURL}/api/blogs/get/blogs/by/owner?page=${pageParam}&limit=${5}&userId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            // Determine if there is a next page
            if (lastPage?.length === 5) {
                return allPages?.length + 1; // next page number
            } else {
                return undefined; // no more pages
            }
        },
        initialPageParam: 1, // Start with page 1
    });

    useEffect(()=>{
        getToken();
    },[])

    return (
        <section className='p-2'>
            <Toaster/>
            <div>
                <ProfileComponent
                    data = {userData}
                    type = 'visitor'
                    isLoading = {userDataLoading}
                />
            </div>
            <div className='flex flex-col gap-2 mt-5 w-full'>
                <h1 className='text-darkCyan text-2xl font-medium'>
                    Blogs
                </h1>
                {
                    blogLoading ?
                    (
                        <LoadingBlogCard/>
                    ):(
                        blogs?.pages.map((page) =>
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
            </div>
        </section>
    )
}

export default VisitProfile