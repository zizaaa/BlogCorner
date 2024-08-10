import { NavLink } from 'react-router-dom'
import { FaHome, FaBookmark, ImExit} from "../icons"

function SideNav() {
    return (
        <aside className="flex flex-col justify-between w-72 border-e-[1px] pe-2">
            <div>
                <NavLink to='/' className={({isActive}) => isActive ? "p-2 flex items-center gap-2 text-xl bg-grayishWhite transition-all duration-200 rounded-sm text-darkishGray":"p-2 flex items-center gap-2 text-xl hover:bg-grayishWhite transition-all duration-200 rounded-sm text-darkishGray"}>
                    <span>
                        <FaHome/>
                    </span>
                    Home
                </NavLink>
                <NavLink to='/bookmark' className={({isActive}) => isActive ? "p-2 flex items-center gap-2 text-xl bg-grayishWhite transition-all duration-200 rounded-sm text-darkishGray":"p-2 flex items-center gap-2 text-xl hover:bg-grayishWhite transition-all duration-200 rounded-sm text-darkishGray"}>
                    <span>
                        <FaBookmark/>
                    </span>
                    Bookmark
                </NavLink>
            </div>
            <div className='w-full'>
                <button className="p-2 flex items-center gap-2 text-xl hover:bg-grayishWhite transition-all duration-200 rounded-sm text-darkishGray w-full">
                    <span>
                        <ImExit/>
                    </span>
                    Sign out
                </button>
            </div>
        </aside>
    )
}

export default SideNav