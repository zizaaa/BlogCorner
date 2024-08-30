import React from "react";
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";
import { FaArrowDownLong, FaArrowUpLong, FaBookmark, FaRegBookmark } from "../icons";
import { BlogCardProps } from "../../types/Props";
import { bookMarked, cookieStore, errorToast, serverURL,timeAgo, useBookmark, voteCountQuery, votedQuery } from "../links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const { token } = cookieStore();
    const navigate = useNavigate();

    if (!blog) {
        return null;
    }

    const { 
            data: voteCount, 
            isLoading: isVoteCountLoading, 
            refetch:refetchVoteCount 
        } = voteCountQuery(blog.id)
    
    const { 
            data:isVoted, 
            isError:isVotedError, 
            refetch:refetchIsVoted 
        } = votedQuery(blog.id)

    const { data:isBookMarked, refetch:refetchBookMarked, isError } = bookMarked(blog.id);

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
        },
        onSuccess:()=>{
            refetchVoteCount();
            refetchIsVoted();
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
        },
        onSuccess:()=>{
            refetchVoteCount();
            refetchIsVoted();
        }
    })

    const bookMark = useBookmark();

    const handleBookMark = () =>{
        bookMark.mutate(blog.id,{
            onSuccess:()=>{
                refetchBookMarked();
            }
        })
    }

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
                    <button 
                        onClick={()=>{upVote.mutate()}} 
                        className={`p-2 rounded-full text-xl ${isVotedError ? '':isVoted?.upvoted ? 'text-white bg-darkCyan hover:drop-shadow-lg':'text-darkishGray hover:text-white hover:bg-darkCyan'} transition-all duration-200`}
                    >
                        <FaArrowUpLong />
                    </button>
                    <span className="text-sm text-darkishGray">
                        {
                            !isVoteCountLoading && voteCount ?
                            (
                                voteCount.upVotes
                            ):(
                                '0'
                            )
                        }
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={()=>{downVote.mutate()}} 
                        className={`p-2 rounded-full text-xl ${isVotedError ? '':isVoted?.downvoted ? 'text-white bg-darkCyan hover:drop-shadow-lg':'text-darkishGray hover:text-white hover:bg-darkCyan'} transition-all duration-200`}
                    >
                        <FaArrowDownLong />
                    </button>
                    <span className="text-sm text-darkishGray">
                        {
                            !isVoteCountLoading && voteCount ?
                            (
                                voteCount.downVotes
                            ):(
                                '0'
                            )
                        }
                    </span>
                </div>
                <div>
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
                </div>
            </div>
        </section>
    );
};

export default BlogCard;