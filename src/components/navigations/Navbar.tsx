import { FaMoon, FaSun } from '../icons'

function Navbar(props:any) {
    return (
        <nav className="bg-white border-gray-200 dark:bg-black fixed left-0 right-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={props.isDarkMode ? "/logo/logo_2-transparent.png":"/logo/logo_3-transparent.png"} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogCorner</span>
                </a>
                <div className="w-auto flex flex-row gap-4" id="navbar-default">
                    <button
                        className="block py-2 px-3 rounded drop-shadow-md bg-semiWhite text-darkishGray dark:bg-semiBlack dark:text-white hover:drop-shadow-lg"
                        onClick={props.toggleDarkMode}
                    >
                        {
                            props.isDarkMode ?
                            (<FaSun/>):(<FaMoon/>)
                        }
                    </button>
                    <div className='w-10 h-10 rounded-full cursor-pointer'>
                        <img 
                            src="https://www.shutterstock.com/image-photo/portrait-woman-symbolically-turning-into-600nw-2374079997.jpg"
                            className='h-full w-full object-cover rounded-full'
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar