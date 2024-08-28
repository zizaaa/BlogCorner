import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RegisterData, SignUpCredentialsType } from '../../types/States';
import { errorToast, serverURL, Spinner, successToast } from '../../components/links';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

function Register() {

    const [signUpCredentials, setCredentials] = useState<SignUpCredentialsType>({
        name:'',
        email:'',
        username:'',
        password:'',
        confirmPassword:''
    });

    const mutation = useMutation({
        mutationFn:async(credentials:RegisterData): Promise<void>=>{
            try {
                await axios.post(`${serverURL}/api/user/register`,credentials)

                successToast('We\'ve sent a confirmation email to your inbox. Please check your email to verify your account.');

                setCredentials(prev =>({...prev,name:''}))
                setCredentials(prev =>({...prev,email:''}))
                setCredentials(prev =>({...prev,username:''}))
                setCredentials(prev =>({...prev,password:''}))
                setCredentials(prev =>({...prev,confirmPassword:''}))
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

    const handleRegister = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!signUpCredentials.name && !signUpCredentials.email && !signUpCredentials.username && !signUpCredentials.password &&  !signUpCredentials.confirmPassword){
            return errorToast('Please complete all the inputs!');
        }

        if(!isValidEmail(signUpCredentials.email)){
            return errorToast('Invalid email!')
        }

        if(signUpCredentials.password !== signUpCredentials.confirmPassword){
            return errorToast('Password not match!')
        }

        if(signUpCredentials.password.length <= 4 && signUpCredentials.confirmPassword.length <= 4){
            console.log('error password')
            return errorToast('Password must be atleast 5 character long!')
        }
        
        mutation.mutate({
            name:signUpCredentials.name,
            email:signUpCredentials.email,
            username:signUpCredentials.username,
            password:signUpCredentials.password
        })
    }
    return (
        <form className="p-5 rounded-md" onSubmit={handleRegister}>
            <Toaster />
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
                        value={signUpCredentials.name}
                        onChange={(e) => setCredentials(prev => ({ ...prev, name: e.target.value }))}
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
                        value={signUpCredentials.email}
                        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
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
                        value={signUpCredentials.username}
                        onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
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
                        value={signUpCredentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
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
                        value={signUpCredentials.confirmPassword}
                        onChange={(e) => setCredentials(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="****************"
                        required 
                    />
                </div>
            </div>
            <button 
                type="submit" 
                className={`text-white bg-darkCyan focus:ring-4 focus:outline-none focus:ring-darkCyan font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ${mutation.isPending ? 'cursor-not-allowed':'cursor-pointer'}`}
                disabled = {mutation.isPending}
            >
                {
                    mutation.isPending ?
                    (
                        Spinner({textColor:'#FFFFFF',fillColor:'#000000'})
                    ):('Sign up')
                }
            </button>
            <div className="mt-2">
                <Link to='/form/login' >
                    Already have an account? <span className="text-darkCyan">Sign in</span>
                </Link>
            </div>
        </form>
    )
}

export default Register