import { useNavigate } from "react-router-dom"
import { FaArrowDownLong,FaArrowUpLong, FaBookmark, FaLink, FaRegBookmark } from "../icons"

function BlogCard() {
    const navigate = useNavigate();

    return (
        <section onClick={()=>{navigate('/blog/423')}} className="border-[1px] p-3 rounded-sm cursor-pointer transition-all duration-100 hover:drop-shadow-md bg-semiWhite dark:bg-semiBlack dark:border-semiBlack">
            <div className="flex flex-row justify-between dark:text-grayishWhite">
                <h1 className="text-2xl">Lorem ipsum dolor</h1>
                <span className="text-sm font-thin">23mins ago</span>
            </div>
            <div className="flex flex-row w-full gap-4 mt-3">
                <div className="w-28 h-28 ">
                    <img 
                        src="https://www.twintel.net/wp-content/uploads/2023/10/10-25-23.jpg"
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                </div>
                <div className="flex-1">
                    <p className="dark:text-grayishWhite">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti neque quaerat hic quo reprehenderit iusto non natus accusamus esse sapiente praesentium, nostrum consectetur, quam, deserunt ipsa dolorum animi reiciendis atque!Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti neque quaerat hic quo reprehenderit iusto non natus accusamus esse sapiente praesentium, nostrum consectetur, quam, deserunt ipsa dolorum animi reiciendis atque!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti neque quaerat hic quo reprehenderit iusto non natus accusamus esse sapiente praesentium... <span className="text-darkCyan cursor-pointer">read more</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-row p-2 gap-5 text-darkishGray mt-5 cursor-default">
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full text-xl transition-all duration-200 text-white bg-darkCyan hover:text-white hover:bg-darkCyan hover:drop-shadow-lg">
                        <FaArrowUpLong/>
                    </button>
                    <span className="text-sm dark:text-grayishWhite">1.2k</span>
                </div>
                <div>
                    <button className="p-2 rounded-full text-xl transition-all duration-200 dark:text-grayishWhite hover:text-white hover:bg-darkCyan hover:drop-shadow-lg">
                        <FaArrowDownLong/>
                    </button>
                    <span className="text-sm"></span>
                </div>
                <div className="flex items-center cursor-pointer">
                    <button className="p-2 text-xl dark:text-grayishWhite">
                        <FaLink/>
                    </button>
                    <p className="text-sm dark:text-grayishWhite">Link</p>
                </div>
                <div className="flex items-center cursor-pointer">
                    <button className="p-2 text-xl dark:text-grayishWhite">
                        <FaRegBookmark/>
                    </button>
                    <p className="text-sm dark:text-grayishWhite">Bookmark</p>
                </div>
            </div>
        </section>
    )
}

export default BlogCard