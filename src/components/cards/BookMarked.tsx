import React from 'react'
import parse from 'html-react-parser';

import { BookMarkProps } from '../../types/Props'
import { bookMarked, serverURL, useBookmark } from '../links'
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from '../../components/icons'

const BookMarked:React.FC<BookMarkProps> = (props) => {
    const navigate = useNavigate();

    const { data:isBookMarked, isError } = bookMarked(props.data.id);

    const bookMark = useBookmark();

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
    const textContent = getTextContent(props.data.content);

    // Truncate text content
    const truncatedContent = textContent.length > 300 ? `${textContent.slice(0, 300)}...` : textContent;

    // Function to navigate to the full blog post
    const handleReadMore = () => {
        navigate(`/blog/${props.data.id}`);
    };

    const handleUnSaved = () =>{
        bookMark.mutate(props.data.id,{
            onSuccess:()=>{props.refetch()}
        })
    }
    return (
        <section
            className="border-[1px] p-3 rounded-sm transition-all duration-100 hover:drop-shadow-md bg-semiWhite dark:bg-semiBlack dark:border-semiBlack"
        >
            <div className="flex flex-row justify-between max-[500px]:flex-col dark:text-grayishWhite">
                <h1 className="text-2xl">
                    {props.data.title}
                </h1>
                <div>
                    <button onClick={handleUnSaved} className="group p-2 text-xl flex items-center gap-2 text-darkishGray max-[500px]:my-3">
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
            <div onClick={handleReadMore} className="flex flex-row w-full gap-4 mt-3 max-[500px]:flex-col cursor-pointer">
                <div className="w-28 h-28 max-[500px]:w-full max-[500px]:h-40">
                    <img
                        src={`${serverURL}/${props.data.cover_img}`}
                        alt={props.data.title}
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
        </section>
    )
}

export default BookMarked