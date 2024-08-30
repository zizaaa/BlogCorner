import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { cookieStore, serverURL, timeAgo } from "../links"
import { PopularBlogData } from "../../types/Data";
import { useNavigate } from "react-router-dom";

function PopularBlogs() {
    const { token } = cookieStore();
    const navigate = useNavigate();

    const { data,isLoading } = useQuery({
        queryKey:['popularBlogs'],
        queryFn: async()=>{
            try {
                const { data } = await axios.get<PopularBlogData[]>(`${serverURL}/api/blogs/get/popular`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })

                return data
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <>
            <div className='border-[1px] border-gray-200 rounded-md p-5 mb-5 dark:border-gray-600'>
                <h1 className='text-xl font-medium dark:text-white'>Popular blogs</h1>
                <div className='flex flex-col gap-3 mt-5'>
                    {
                        data && data.length > 0 ?
                        (
                            isLoading ?
                            (
                                <div role="status" className="max-w-sm animate-pulse">
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ):(
                                data.map((popular) => (
                                    <div onClick={()=>{navigate(`/blog/${popular.id}`)}} className='group cursor-pointer' key={popular.id}>
                                        <h1 className='text-gray-600 mb-2 group-hover:text-darkCyan dark:text-gray-300'>
                                            {popular.title}
                                        </h1>
                                        <div className='flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500'>
                                            <span>posted</span>
                                            {timeAgo(popular.created_at)}
                                        </div>
                                    </div>
                                ))
                            )
                        ):(
                            <div>
                                <p className="text-sm font-medium text-gray-500">No popular blogs</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default PopularBlogs