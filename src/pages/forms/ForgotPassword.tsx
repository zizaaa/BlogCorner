import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { errorToast, serverURL, Spinner, successToast } from '../../components/links';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState<string>('');

    const mutation = useMutation({
        mutationFn:async(userEmail:string): Promise<void>=>{
            try {
                await axios.post(`${serverURL}/api/user/reset-password`,{
                    email:userEmail
                })
                successToast('We\'ve sent a confirmation email to your inbox. Please check your email to verify your account.');
                return
            } catch (error) {
                if(axios.isAxiosError(error)){
                    errorToast(error.response?.data.message);
                    return;
                }else{
                    errorToast('Something went wrong.');
                    return
                }
            }
        }
    })

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleResetPassword = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!email || !isValidEmail(email)){
            errorToast('Invalid email.');
            return
        }
        mutation.mutate(email)
    }
    return (
        <form className="p-5 rounded-md" onSubmit={handleResetPassword}>
            <Toaster />
            <div>
                <h1 className="text-5xl font-bold">Forgot password</h1>
            </div>
            <div className="my-5">
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
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="ziza@email.com"
                    required
                />
            </div>
            <button
                type="submit"
                className="text-white bg-darkCyan focus:ring-4 focus:outline-none focus:ring-darkCyan font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center relative"
            >
                {
                    mutation.isPending ?
                    (
                        Spinner({textColor:'#FFFFFF',fillColor:'#000000'})
                    ):('Reset password')
                }
            </button>
        </form>
    )
}

export default ForgotPassword