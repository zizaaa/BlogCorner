import { NavLink, useNavigate } from 'react-router-dom'
import { FaHome, FaBookmark, ImExit, FaPlus} from "../icons"
import { propsType } from '../../types/Props'

const SideNav:React.FC<propsType> = (props) =>{
    const navigate = useNavigate();

    const handleNavigate = (): void =>{
        // Generate a unique ID based on the current time
        const id = new Date().getTime();

        navigate(`/post/editor/${id}`)
    }

    const handleHideNav = () => {
        props.setShowSideNav(!props.showSideNav); 
    }

    return (
        <aside className={`flex flex-col justify-between w-72 border-e-[1px] dark:border-semiBlack p-2 ${!props.showSideNav ? "max-[900px]:-translate-x-96":"max-[900px]:translate-x-0"} transition-all duration-200 max-[900px]:absolute bottom-0 left-0 top-[5rem] z-30 bg-white`}>
            <div>
                <div className='mb-5 border-b-[1px] pb-5 dark:border-semiBlack'>
                    <button onClick={handleNavigate} className="p-3 px-4 flex items-center gap-2 text-xl drop-shadow-md rounded-full transition-all duration-200 hover:scale-105 text-white dark:text-grayishWhite bg-darkCyan">
                        <span>
                            <FaPlus/>
                        </span>
                        Create post
                    </button>
                </div>
                <NavLink 
                    to='/' 
                    onClick={handleHideNav}
                    className={({isActive}) => isActive ? "p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray bg-grayishWhite dark:text-grayishWhite dark:bg-semiBlack":"p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray hover:bg-grayishWhite dark:hover:text-grayishWhite dark:hover:bg-semiBlack"}
                >
                    <span>
                        <FaHome/>
                    </span>
                    Home
                </NavLink>
                <NavLink 
                    to='/bookmark' 
                    onClick={handleHideNav}
                    className={({isActive}) => isActive ? "p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray bg-grayishWhite dark:text-grayishWhite dark:bg-semiBlack":"p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray hover:bg-grayishWhite dark:hover:text-grayishWhite  dark:hover:bg-semiBlack"}
                >
                    <span>
                        <FaBookmark/>
                    </span>
                    Bookmark
                </NavLink>
            </div>
            <div className='w-full'>
                {
                    props.isError ?
                    (
                        <button onClick={()=>{navigate('/form/login')}} className="w-full p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray hover:bg-grayishWhite dark:hover:bg-semiBlack dark:hover:text-grayishWhite">
                            <span>
                                <ImExit/>
                            </span>
                            Sign in
                        </button>
                    ):(
                        <button onClick={props.handleLogout} className="w-full p-2 px-4 flex items-center gap-2 text-xl transition-all duration-200 rounded-sm text-darkishGray hover:bg-grayishWhite dark:hover:bg-semiBlack dark:hover:text-grayishWhite">
                            <span>
                                <ImExit/>
                            </span>
                            Sign out
                        </button>
                    )
                }
            </div>
        </aside>
    )
}

export default SideNav