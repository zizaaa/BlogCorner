import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { credentials } from "../../types/States";
import { cookieStore, errorToast, successToast } from "../../components/links";
import axios from "axios";


function Login() {
    const { storeCookie } = cookieStore();  
    const [credentials, setCredentials] = useState<credentials>({
        username: '',
        password: ''
    });

    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission

        if (!credentials.username || !credentials.password) {
            return console.log('Incomplete input');
        }

        try {
            const {data} = await axios.post(`${serverURL}/api/user/login`,credentials)

            storeCookie(data.token)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.message);
                return errorToast(`${error.response?.data.message}`);
            } else {
                // Handle other errors, e.g., network issues, non-Axios errors
                console.log(error);
                return errorToast(`${error}`);
            }
        }

        successToast('Loged in success!')
        console.log('Submitted credentials:', credentials);
        // Perform your login logic here
    };

    return (
        <form className="p-5 rounded-md" onSubmit={handleLogin}>
            <Toaster />
            <div>
                <h1 className="text-5xl font-bold">Sign in</h1>
            </div>
            <div className="my-5">
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
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="zizaaa123"
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
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="****************"
                    required
                />
            </div>
            <div className="mb-5">
                <button type="button" className="font-medium text-sm">
                    Forgot password
                </button>
            </div>
            <button
                type="submit"
                className="text-white bg-darkCyan focus:ring-4 focus:outline-none focus:ring-darkCyan font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
                Sign in
            </button>
            <Link to='/form/register' className="mt-2">
                Don't have an account yet? <span className="text-darkCyan">Sign up</span>
            </Link>
        </form>
    );
}

export default Login;