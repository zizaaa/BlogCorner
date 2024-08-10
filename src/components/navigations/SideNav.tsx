import { NavLink } from 'react-router-dom'
import { FaHome, FaBookmark} from "../icons"

function SideNav() {
    return (
        <div className="flex flex-col w-72 border-e-[1px] pe-2">
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
    )
}

export default SideNav