import { useNavigate, useParams } from 'react-router-dom'
import {
    FaTwitter,
    FaSquareThreads, 
    FaLink,
} from '../../components/icons'
import { BlogLayout, serverURL } from '../../components/links'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function ViewBlog() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data,isLoading } = useQuery({
        queryKey:['singleBlog'],
        queryFn: async()=>{
            try {
                const { data } = await axios.get(`${serverURL}/api/blogs/get/single/blog/${id}`)
                console.log(data)
                return data
            } catch (error) {
                navigate('/')
                return;
            }
        }
    })

    if (isLoading || !data) {
        return null; // Return null while loading or navigating
    }
    
    const newData = {
        cover: data.cover_img,
        title:data.title,
        content:data.content,
        timestamp:data.created_at
    }
    return (
        <section className="flex">
            <article className='flex-1 p-5'>
                <BlogLayout
                    data = {newData}
                    loading = {isLoading}
                    preview = {false}
                />
            </article>
            <aside className="w-80 p-5">
                <div className='border-[1px] border-gray-200 rounded-md p-5 mb-5 dark:border-gray-600'>
                    <h1 className='text-xl font-medium dark:text-white'>Share</h1>
                    <div className='flex flex-row flex-wrap items-center gap-5 mt-5'>
                        <button className='text-2xl rounded-full border-[1px] p-2 border-gray-300 text-gray-500 hover:border-darkCyan hover:text-darkCyan'>
                            <FaTwitter/>
                        </button>
                        <button className='text-2xl rounded-full border-[1px] p-2 border-gray-300 text-gray-500 hover:border-darkCyan hover:text-darkCyan'>
                            <FaSquareThreads/>
                        </button>
                        <button className='text-2xl rounded-full border-[1px] p-2 border-gray-300 text-gray-500 hover:border-darkCyan hover:text-darkCyan'>
                            <FaLink/>
                        </button>
                    </div>
                </div>
                <div className='border-[1px] border-gray-200 rounded-md p-5 mb-5 dark:border-gray-600'>
                    <h1 className='text-xl font-medium dark:text-white'>Popular blogs</h1>
                    <div className='flex flex-col gap-3 mt-5'>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                    </div>
                </div>
            </aside>
        </section>
    )
}

export default ViewBlog