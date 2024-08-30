import { Link } from 'react-router-dom'
// import { FaMoon, FaSun } from '../icons'

function Navbar(props:any) {
    return (
        <nav className="bg-white border-gray-200 dark:bg-black fixed left-0 right-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={props.isDarkMode ? "/logo/logo_2-transparent.png":"/logo/logo_3-transparent.png"} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogCorner</span>
                </Link>
                <div className="w-auto flex flex-row gap-4" id="navbar-default">
                    {/* <button
                        className="block py-2 px-3 rounded bg-semiWhite text-darkishGray dark:bg-semiBlack dark:text-white hover:drop-shadow-lg"
                        onClick={props.toggleDarkMode}
                    >
                        {
                            props.isDarkMode ?
                            (<FaSun/>):(<FaMoon/>)
                        }
                    </button> */}
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
            </div>
        </nav>
    )
}

export default Navbar