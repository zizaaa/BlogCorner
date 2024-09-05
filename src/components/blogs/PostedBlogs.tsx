import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { cookieStore, errorToast, serverURL, successToast } from '../links';
import { useNavigate } from 'react-router-dom';

const PostedBlogs: React.FC<{ id: string }> = (props) => {
    const { token } = cookieStore();

    const navigate = useNavigate();

    const limit:number = 10; // Number of items per page
    const [page, setPage] = useState<number>(1); // Current page

    const { data, refetch } = useQuery({
        queryKey: ['postedblogs', page, limit, token],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`${serverURL}/api/blogs/get/all/posted?page=${page}&limit=${limit}&userId=${props.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return data;
            } catch (error) {
                console.error(error)
            }
        }
    });

    const mutation = useMutation({
        mutationFn: async(id:string)=>{
            try {
                const { data } = await axios.delete(`${serverURL}/api/blogs/delete/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })

                //toast
                successToast(`${data.message}`);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if(error.response?.data === 'Unauthorized'){
                        errorToast("Please log in");
                    }else{
                        errorToast(error.response?.data.message);
                    }
                } else {
                    errorToast('Something went wrong.');
                }
            }
        },
        onSuccess:()=>{
            refetch();
        }
    })

    // Calculate total pages
    const totalPages = Math.ceil((data?.total || 0) / limit);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleClearSession = (id:string) =>{
        sessionStorage.clear();
        navigate(`/blog/editor/${id}`)
    }

    return (
        <div>
            <div>
                <h1 className='text-2xl text-darkCyan font-medium'>Blogs</h1>
            </div>
            <div className='w-full'>
                {
                    data?.total <= 0 ?
                    (
                        <div className='w-full p-2 flex items-center justify-center'>
                            <h1 className='text-sm text-gray-500 font-medium'>No blogs</h1>
                        </div>
                    ):(
                        <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Upvote
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Downvote
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.blogs.map((blog: any) => (
                                        <tr key={blog.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {blog.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {blog.upvotes}
                                            </td>
                                            <td className="px-6 py-4">
                                                {blog.downvotes}
                                            </td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <button onClick={()=>{handleClearSession(blog.id)}} className="font-medium text-darkCyan hover:underline">Edit</button>
                                                <button onClick={()=>{mutation.mutate(blog.id)}} className="font-medium text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className='bg-red-30 flex items-center justify-center mt-5'>
                                {/* Pagination */}
                                <div aria-label="Pagination" className="">
                                    <ul className="flex items-center -space-x-px h-8 text-sm">
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(page - 1)}
                                                disabled={page === 1}
                                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                <span className="sr-only">Previous</span>
                                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                </svg>
                                            </button>
                                        </li>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i}>
                                                <button
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={`flex items-center justify-center px-3 h-8 leading-tight ${page === i + 1 ? 'text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(page + 1)}
                                                disabled={page === totalPages}
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                <span className="sr-only">Next</span>
                                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PostedBlogs;