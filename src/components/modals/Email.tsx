import React, { useState } from 'react'
import { NameModalProps } from '../../types/Props'
import { cookieStore, errorToast, serverURL, Spinner, successToast } from '../links';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const Email:React.FC<NameModalProps> = (props) => {
    const { token,deleteCookie } = cookieStore();
    const [email, setEmail] = useState<string>('');

    const mutation = useMutation({
        mutationFn: async()=>{
            try {
                await axios.put(`${serverURL}/api/user/update/email`,{email},{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })

                successToast('We\'ve sent a confirmation email to your inbox. Please check your email to verify your account.');
            } catch (error) {
                if(axios.isAxiosError(error)){
                    if(error.response?.data === 'Unauthorized'){
                        errorToast("Please log in");
                    }else{
                        errorToast(error.response?.data.message);
                    }
                    return;
                }else{
                    errorToast('Something went wrong.');
                    return
                }
            }
        },
        onSuccess:()=>{
            props.refetch();
            handleExit();
            deleteCookie();
        }
    })

    const handleExit = () =>{
        if(props.setShowEmailModal){
            props.setShowEmailModal(false)
        }
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!isValidEmail(email)){
            errorToast('Invalid email')
        }

        mutation.mutate();
    }
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-cream rounded-lg shadow bg-white">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t bg-deepred">
                        <h1 className='text-xl'>Change email</h1>
                        <button onClick={handleExit} type="button" className="text-darkishGray bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="w-full rounded-sm border-b-2 border-gray-300 focus:border-darkCyan border-x-0 border-t-0 focus:ring-0 outline-none"
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                                required
                            />
                        </div>
                        <button type='submit' className='w-full mt-5 py-2 rounded-sm bg-darkCyan text-white drop-shadow-md'>
                            {
                                mutation.isPending ?
                                (
                                    Spinner({textColor:'#FFFFFF',fillColor:'#000000'})
                                ):('Update')
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div> 
    )
}

export default Email