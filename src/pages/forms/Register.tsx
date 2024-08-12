import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <form className="p-5 rounded-md">
            <div className='mb-5'>
                <h1 className="text-5xl font-bold">Sign up</h1>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div className="">
                    <label 
                        htmlFor="name" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                            Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkCyan focus:border-darkCyan block w-full p-2.5" 
                        placeholder="John Doe" 
                        required 
                    />
                </div>
                <div className="">
                    <label 
                        htmlFor="email" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                            Email
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkCyan focus:border-darkCyan block w-full p-2.5" 
                        placeholder="ziza@account.com" 
                        required 
                    />
                </div>
                <div className="col-span-2">
                    <label 
                        htmlFor="username" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                            Username
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkCyan focus:border-darkCyan block w-full p-2.5" 
                        placeholder="ziza" 
                        required 
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="password" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkCyan focus:border-darkCyan block w-full p-2.5" 
                        placeholder="****************"
                        required 
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="confirmpassword" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Confirm password
                    </label>
                    <input 
                        type="password" 
                        id="confirmpassword" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkCyan focus:border-darkCyan block w-full p-2.5" 
                        placeholder="****************"
                        required 
                    />
                </div>
            </div>
            <button type="submit" className="text-white bg-darkCyan focus:ring-4 focus:outline-none focus:ring-darkCyan font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Submit</button>
            <div className="mt-2">
                <Link to='/form/login' >
                    Already have an account? <span className="text-darkCyan">Sign in</span>
                </Link>
            </div>
        </form>
    )
}

export default Register