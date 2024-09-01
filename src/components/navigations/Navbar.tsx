import { Link, useNavigate } from 'react-router-dom'
import { IoMenu, RxCross2 } from '../icons'
import { propsType } from '../../types/Props'
import React, { useEffect, useRef, useState } from 'react'
import { serverURL } from '../links'

const Navbar:React.FC<propsType> =(props) => {
    const navigate = useNavigate()
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLInputElement>(null);

    const toggleSideNav = () => {
        props.setShowSideNav(!props.showSideNav);
    };

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent |React.MouseEvent<Document,MouseEvent>) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropDown(false);
            }
        };

        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className="bg-white border-gray-200 dark:bg-black fixed left-0 right-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo/logo_3-transparent.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white  max-[300px]:hidden">BlogCorner</span>
                </Link>
                <div className="w-auto flex flex-row gap-4" id="navbar-default">
                    <div className='flex items-center justify-center'>
                        {
                            props.data ?
                            (
                                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative" ref={dropdownRef}>
                                    <button onClick={()=>{setShowDropDown(!showDropDown)}} type="button" className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full object-cover" src={props.data && props.data.avatar ? `${serverURL}/${props.data.avatar}`:"/avatar.png"} alt="user photo" loading='lazy'/>
                                    </button>
                                    <div className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute -bottom-44 right-0 ${showDropDown ? "":"hidden"}`}>
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white">
                                                {props.data && (props.data.name)}
                                            </span>
                                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                                {props.data && (props.data.email)}
                                            </span>
                                        </div>
                                        <ul className="py-2">
                                        <li>
                                            <Link to={`/profile`} onClick={()=>{setShowDropDown(!showDropDown)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                                        </li>
                                        <li>
                                            <button onClick={props.handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                            ):(
                                <button onClick={()=>{navigate('/form/login')}}>
                                    <img 
                                        src="/avatar.png"
                                        className='w-8 h-8 rounded-full object-cover'
                                    />
                                </button>
                            )
                        }
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