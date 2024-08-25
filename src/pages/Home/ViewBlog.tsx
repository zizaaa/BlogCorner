import {
    FaInstagram,
    FaTwitter,
    FaFacebook,
    FaSquareThreads, 
    FaLink,
    FaBookmark,
    FaRegBookmark
} from '../../components/icons'

function ViewBlog() {
    return (
        <section className="flex">
            <article className="flex-1 p-5">
                <div className='flex flex-row items-center justify-between'>
                    <h1 className="text-3xl font-bold dark:text-white">Sample title here</h1>
                    <button className='text-gray-400 text-xl'>
                        <FaRegBookmark/>
                    </button>
                </div>
                <div className="my-5">
                    <span className="text-gray-500 text-sm font-medium">Thursday, April 4, 2024</span>
                </div>
                <div>
                    <div className="drop-shadow-md">
                        <img 
                            src="https://www.twintel.net/wp-content/uploads/2023/10/10-25-23.jpg"
                            className="object-cover w-full h-full rounded-md drop-shadow-md"
                            loading="lazy"
                        />
                    </div>
                    <div className="mt-10">
                        <h1 className="font-bold text-2xl mb-5">Introduction</h1>
                        <p>
                            For authentication and authorization, React Router offers a simple method to create protected routes that demand authentication for access. By default, these routes are treated as public routes and anyone can access them. To create a protected route, you need to use the React RouterRoute component and specify the route path provider component name that you want to protect. Next, you can utilize the render prop function to selectively render the component you wish to protect.
                        </p>

                        <p>This is a component that you would usually use whenever you want to protect certain pages or routes in your React application, and only allow a signed-in user to access them. This is pretty common in a lot of React applications that have authentication, right?</p>

                        <p>If you have authenticated users, you often want to protect certain parts private routes of your application and only make sure that signed-in users can access them. React uses a very popular client-side routing library React Router DOM. React Router DOM, if you're not aware of this library you can use it to implement routing in your React application.</p>

                        <p>In this Blog, we will present how to build and implement your custom-protected route component in React. But first, see how to set up your React app.</p>
                    </div>
                </div>
            </article>
            <aside className="w-80 p-5">
                <div className='border-[1px] border-gray-200 rounded-md p-5 mb-5 dark:border-gray-600'>
                    <h1 className='text-xl font-medium dark:text-white'>Share</h1>
                    <div className='flex flex-row flex-wrap items-center gap-5 mt-5'>
                        <button className='text-2xl rounded-full border-[1px] p-2 border-gray-300 text-gray-500 hover:border-darkCyan hover:text-darkCyan'>
                            <FaTwitter/>
                        </button>
                        <button className='text-2xl rounded-full border-[1px] p-2 border-gray-300 text-gray-500 hover:border-darkCyan hover:text-darkCyan'>
                            <FaSquareThreads/>
                        </button>
                        <button className='text-2xl rounded-full border-[1px] p-2 border-gray-300 text-gray-500 hover:border-darkCyan hover:text-darkCyan'>
                            <FaLink/>
                        </button>
                    </div>
                </div>
                <div className='border-[1px] border-gray-200 rounded-md p-5 mb-5 dark:border-gray-600'>
                    <h1 className='text-xl font-medium dark:text-white'>Popular blogs</h1>
                    <div className='flex flex-col gap-3 mt-5'>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                        <div className='group cursor-pointer'>
                            <h1 className='text-gray-600 group-hover:text-darkCyan dark:text-gray-300'>Top 10 Features of ReactJS for Web Developers</h1>
                            <span className='text-sm text-gray-400 dark:text-gray-500'>posted 5 hrs ago</span>
                        </div>
                    </div>
                </div>
            </aside>
        </section>
    )
}

export default ViewBlog