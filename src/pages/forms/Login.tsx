import { Link } from "react-router-dom"

function Login() {
    return (
        <form className="p-5 rounded-md">
            <div>
                <h1 className="text-5xl font-bold">Sign in</h1>
            </div>
            <div className="my-5">
                <label 
                    htmlFor="email" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                        User or email
                </label>
                <input 
                    type="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkCyan focus:border-darkCyan block w-full p-2.5" 
                    placeholder="ziza@account.com" 
                    required 
                />
            </div>
            <div className="mb-2">
                <label 
                    htmlFor="password" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
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
                <button className="font-medium text-sm">Forgot password</button>
            </div>
            <button type="submit" className="text-white bg-darkCyan focus:ring-4 focus:outline-none focus:ring-darkCyan font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Submit</button>
            <Link to='/form/register' className="mt-2">
                Don't have an account yet? <span className="text-darkCyan">Sign up</span>
            </Link>
        </form>
    )
}

export default Login