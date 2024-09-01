import { Link } from 'react-router-dom'
import { IoMenu, RxCross2 } from '../icons'
import { propsType } from '../../types/Props'

const Navbar:React.FC<propsType> =(props) => {

    const toggleSideNav = () => {
        props.setShowSideNav(!props.showSideNav);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-black fixed left-0 right-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo/logo_3-transparent.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white  max-[300px]:hidden">BlogCorner</span>
                </Link>
                <div className="w-auto flex flex-row gap-4" id="navbar-default">
                    <div className='flex items-center justify-center'>
                        <button data-popover-target="popover-click" data-popover-trigger="click" type="button" className='w-10 h-10 rounded-full cursor-pointer'>
                            <img 
                                src="https://www.shutterstock.com/image-photo/portrait-woman-symbolically-turning-into-600nw-2374079997.jpg"
                                className='h-full w-full object-cover rounded-full'
                            />
                        </button>
                            <div data-popover id="popover-click" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                                <div className="px-3 py-2">
                                    <Link to='' className='text-lg'>
                                        Profile
                                    </Link>
                                </div>
                                <div data-popper-arrow></div>
                            </div>
                    </div>
                    <div onClick={toggleSideNav} className={`max-[900px]:flex items-center justify-center hidden ${!props.showSideNav ? '':'rotate-180'} transition-all duration-300`}>
                        <button className='text-3xl'>
                            {
                                !props.showSideNav ?
                                (<IoMenu/>):(<RxCross2/>)
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar