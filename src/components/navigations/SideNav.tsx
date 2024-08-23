import { NavLink } from 'react-router-dom'
import { FaHome, FaBookmark, ImExit, FaPlus} from "../icons"

function SideNav() {
    return (
        <aside className="flex flex-col justify-between w-72 border-e-[1px] dark:border-semiBlack pe-2">
            <div>
                <div className='mb-5 border-b-[1px] pb-5 dark:border-semiBlack'>
                    <button className="p-3 px-4 flex items-center gap-2 text-xl drop-shadow-md rounded-full transition-all duration-200 hover:scale-105 text-white dark:text-grayishWhite bg-darkCyan">
                        <span>
                            <FaPlus/>
                        </span>
                        Create post
                    </button>
                </div>
                <NavLink 
                    to='/' 
                    className={({isActive}) => isActive ? "p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray bg-grayishWhite dark:text-grayishWhite dark:bg-semiBlack":"p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray hover:bg-grayishWhite dark:hover:text-grayishWhite dark:hover:bg-semiBlack"}
                >
                    <span>
                        <FaHome/>
                    </span>
                    Home
                </NavLink>
                <NavLink 
                    to='/bookmark' 
                    className={({isActive}) => isActive ? "p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray bg-grayishWhite dark:text-grayishWhite dark:bg-semiBlack":"p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray hover:bg-grayishWhite dark:hover:text-grayishWhite  dark:hover:bg-semiBlack"}
                >
                    <span>
                        <FaBookmark/>
                    </span>
                    Bookmark
                </NavLink>
            </div>
            <div className='w-full'>
                <button className="w-full p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray hover:bg-grayishWhite dark:hover:bg-semiBlack dark:hover:text-grayishWhite">
                    <span>
                        <ImExit/>
                    </span>
                    Sign in
                </button>
            </div>
        </aside>
    )
}

export default SideNav