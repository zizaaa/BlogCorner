import React from "react";
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";
import { FaArrowDownLong, FaArrowUpLong, FaLink, FaRegBookmark } from "../icons";
import { BlogCardProps } from "../../types/Props";
import { cookieStore, errorToast, serverURL,successToast,timeAgo } from "../links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const { token } = cookieStore();
    const navigate = useNavigate();

    if (!blog) {
        return null;
    }
    
    const upVote = useMutation({
        mutationFn: async(): Promise<void>=>{
            try {
                await axios.post(`${serverURL}/api/blogs/upvote/blog`,{blogId:blog.id},{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                return
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error.response)
                    if(error.response?.data === 'Unauthorized'){
                        errorToast("Please log in");
                    }else{
                        errorToast(error.response?.data.message);
                    }
                    return;
                }else{
                    errorToast('Something went wrong.');
                    return
                }
            }
        }
    })
    const downVote = useMutation({
        mutationFn: async(): Promise<void>=>{
            try {
                await axios.post(`${serverURL}/api/blogs/downvote/blog`,{blogId:blog.id},{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                return
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error.response)
                    if(error.response?.data === 'Unauthorized'){
                        errorToast("Please log in");
                    }else{
                        errorToast(error.response?.data.message);
                    }
                    return;
                }else{
                    errorToast('Something went wrong.');
                    return
                }
            }
        }
    })

    // Extract text content from parsed HTML and truncate
    const getTextContent = (element: React.ReactNode): string => {
        if (typeof element === 'string') {
            return element;
        }
        // Convert React element(s) to string
        const text = element?.toString() || '';
        return text;
    };

    // Get text content from the parsed content
    const textContent = getTextContent(blog.content);

    // Truncate text content
    const truncatedContent = textContent.length > 300 ? `${textContent.slice(0, 300)}...` : textContent;

    // Function to navigate to the full blog post
    const handleReadMore = () => {
        navigate(`/blog/${blog.id}`);
    };

    return (
        <section
            className="border-[1px] p-3 rounded-sm transition-all duration-100 hover:drop-shadow-md bg-semiWhite dark:bg-semiBlack dark:border-semiBlack"
        >
            <div className="flex flex-row justify-between dark:text-grayishWhite">
                <h1 className="text-2xl">
                    {blog.title}
                </h1>
                <span className="text-sm font-thin w-28 text-end">
                    {timeAgo(blog.created_at)}
                </span>
            </div>
            <div className="flex flex-row w-full gap-4 mt-3">
                <div className="w-28 h-28">
                    <img
                        src={`${serverURL}/${blog.cover_img}`}
                        alt={blog.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                </div>
                <div className="flex-1">
                    {parse(truncatedContent)}
                    {textContent.length > 300 && (
                        <span
                            className="text-darkCyan cursor-pointer ml-1"
                            onClick={handleReadMore}
                        >
                            read more
                        </span>
                    )}
                </div>
            </div>
            <div className="flex flex-row p-2 gap-5 text-darkishGray mt-5 cursor-default">
                <div className="flex items-center gap-2">
                    <button onClick={()=>{upVote.mutate()}} className="p-2 rounded-full text-xl transition-all duration-200 text-white bg-darkCyan hover:text-white hover:bg-darkCyan hover:drop-shadow-lg">
                        <FaArrowUpLong />
                    </button>
                    <span className="text-sm dark:text-grayishWhite">1.2k</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={()=>{downVote.mutate()}} className="p-2 rounded-full text-xl transition-all duration-200 dark:text-grayishWhite hover:text-white hover:bg-darkCyan hover:drop-shadow-lg">
                        <FaArrowDownLong />
                    </button>
                    <span className="text-sm dark:text-grayishWhite">1.2k</span>
                </div>
                <div className="flex items-center cursor-pointer">
                    <button className="p-2 text-xl dark:text-grayishWhite">
                        <FaLink />
                    </button>
                    <p className="text-sm dark:text-grayishWhite">Link</p>
                </div>
                <div className="flex items-center cursor-pointer">
                    <button className="p-2 text-xl dark:text-grayishWhite">
                        <FaRegBookmark />
                    </button>
                    <p className="text-sm dark:text-grayishWhite">Bookmark</p>
                </div>
            </div>
        </section>
    );
};

export default BlogCard;