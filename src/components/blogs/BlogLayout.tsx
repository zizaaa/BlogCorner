import React from 'react';
import parse from 'html-react-parser';
import { FaRegBookmark } from '../../components/icons';
import { BlogLayoutProps } from '../../types/Props';
import { convertTimestamp } from '../links';

const BlogLayout: React.FC<BlogLayoutProps> = ({ data, loading, preview }) => {
    const content = data ? parse(data.content) : null;

    return (
        <div className="p-5">
            <div className='flex flex-row items-center justify-between'>
                {loading ? (
                    <div role="status" className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <h1 className="text-3xl font-bold dark:text-white">
                        {data?.title || 'Sample title here'}
                    </h1>
                )}
                {!preview && !loading && (
                    <button className='text-gray-400 text-xl'>
                        <FaRegBookmark />
                    </button>
                )}
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
                        <img 
                            src={data?.cover || "https://www.twintel.net/wp-content/uploads/2023/10/10-25-23.jpg"}
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