import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import { FaBookmark, FaRegBookmark, FaRegEdit } from '../../components/icons';
import { BlogLayoutProps } from '../../types/Props';
import { bookMarked, convertTimestamp, fetchSingleUser, serverURL, useBookmark } from '../links';
import { Link, useNavigate } from 'react-router-dom';

const BlogLayout: React.FC<BlogLayoutProps> = ({ data, loading, preview, id }) => {
    const content = data ? parse(data.content) : null;
    const navigate = useNavigate();

    const blogId = Number(id);

    const { data:isBookMarked, refetch:refetchBookMarked, isError } = bookMarked(blogId);

    const { data:owner, refetch:refetchOwnerData } = fetchSingleUser(data ? data.owner:null)

    const handleNavigate = () =>{
        navigate(`/post/editor/${id}`);
    }

    const bookMark = useBookmark();

    const handleBookMark = () =>{
        bookMark.mutate(blogId,{
            onSuccess:()=>{
                refetchBookMarked();
            }
        })
    }

    useEffect(()=>{
        refetchOwnerData()
    },[data])
    return (
        <div className="p-5">
            <div className='flex flex-row justify-between max-[500px]:flex-col'>
                {loading ? (
                    <div role="status" className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white">
                            {data?.title || 'title here'}
                        </h1>
                        <Link to='' className='text-sm text-gray-500 hover:underline'>{owner?.username}</Link>
                    </div>
                )}
                {!preview && !loading && (
                    <button onClick={handleBookMark} className="group p-2 text-xl flex items-center gap-2 text-darkishGray">
                        {
                            isError ?
                            (
                                <FaRegBookmark />
                            ):(
                                isBookMarked?.saved ?
                                (
                                    <span className="text-darkCyan">
                                        <FaBookmark/>
                                    </span>
                                ):(
                                    <span className="group-hover:text-darkCyan">
                                        <FaRegBookmark />
                                    </span>
                                )
                            )
                        }
                        <p className="text-sm text-darkishGray">
                            Bookmark
                        </p>
                    </button>
                )}
                {
                    preview && !loading &&(
                        <button onClick={handleNavigate} className='flex flex-row items-center justify-center gap-2 rounded-sm p-2 text-gray-400 hover:text-darkCyan'>
                            <span>
                                <FaRegEdit/>
                            </span>
                            Edit
                        </button>
                    )
                }
            </div>
            <div className="my-5">
                {loading ? (
                    <div role="status" className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <span className="text-gray-500 text-sm font-medium">
                        {data?.timestamp ? convertTimestamp(data?.timestamp) : 'Thursday, April 4, 2024'}
                    </span>
                )}
            </div>
            <div>
                {loading ? (
                    <div role="status" className="animate-pulse">
                        <div className="flex items-center justify-center w-full h-[30rem] bg-gray-300 rounded">
                            <svg className="w-full h-32 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className="drop-shadow-md h-[30rem]">
                        {/* data?.cover || `${serverURL}/${data?.cover}` */}
                        <img 
                            src={`${preview ? data?.cover:`${serverURL}/${data?.cover}`}`}
                            className="object-fit w-full h-full rounded-md drop-shadow-md"
                            loading="lazy"
                            alt={data?.title || 'Blog cover image'}
                        />
                    </div>
                )}
                {loading ? (
                    <div role="status" className="mt-10 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className="prose mt-10">
                        {content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogLayout;