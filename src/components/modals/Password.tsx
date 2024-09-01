import React, { useState } from 'react'
import { NameModalProps } from '../../types/Props'
import { cookieStore, errorToast, serverURL, Spinner, successToast } from '../links';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface passwordTypes{
    oldpassword:string;
    newpassword:string;
    confirmpassword:string;
}

const Password:React.FC<NameModalProps> = (props) => {
    const { token } = cookieStore();

    const [passwords, setPasswords] = useState<passwordTypes>({
        oldpassword:'',
        newpassword:'',
        confirmpassword:''
    });

    const mutation = useMutation({
        mutationFn: async()=>{
            try {
                const { data } = await axios.put(`${serverURL}/api/user/update/password`,{oldPassword:passwords.oldpassword,newPassword:passwords.newpassword},{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })

                successToast(`${data.message}`);
                return;
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
        }
    })

    const handleExit = () =>{
        if(props.setShowPasswordModal){
            props.setShowPasswordModal(false)
        }
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!passwords.confirmpassword || !passwords.newpassword || !passwords.oldpassword){
            return null;
        }

        if(passwords.confirmpassword !== passwords.newpassword){
            return errorToast('Password not match!')
        }

        if(passwords.confirmpassword.length <= 4 || passwords.newpassword.length <= 4){
            return errorToast('Password should atleast 4 characters long')
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
                        <h1 className='text-xl'>Change password</h1>
                        <button onClick={handleExit} type="button" className="text-darkishGray bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900">Old password</label>
                            <input 
                                type="password" 
                                name="oldpassword" 
                                id="oldpassword" 
                                className="w-full rounded-sm border-b-2 border-gray-300 focus:border-darkCyan border-x-0 border-t-0 focus:ring-0 outline-none"
                                value={passwords.oldpassword}
                                onChange={(e)=>{setPasswords(prev => ({...prev, oldpassword:e.target.value}))}}
                                required
                            />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900">New password</label>
                            <input 
                                type="password" 
                                name="newpassword" 
                                id="newpassword" 
                                className="w-full rounded-sm border-b-2 border-gray-300 focus:border-darkCyan border-x-0 border-t-0 focus:ring-0 outline-none"
                                value={passwords.newpassword}
                                onChange={(e)=>{setPasswords(prev => ({...prev, newpassword:e.target.value}))}}
                                required
                            />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPassword" 
                                className="w-full rounded-sm border-b-2 border-gray-300 focus:border-darkCyan border-x-0 border-t-0 focus:ring-0 outline-none"
                                value={passwords.confirmpassword}
                                onChange={(e)=>{setPasswords(prev => ({...prev, confirmpassword:e.target.value}))}}
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

export default Password