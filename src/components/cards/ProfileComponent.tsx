import React, { useRef, useState } from 'react'
import { FaCamera, FaCheck, FaRegEdit, MdVerified, RxCross2 } from '../icons'
import { ProfileComponentProps } from '../../types/Props'
import { cookieStore, errorToast, serverURL, successToast } from '../links'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const ProfileComponent:React.FC<ProfileComponentProps> =(props)=> {
    const { token } = cookieStore();

    const avatarRef = useRef<HTMLInputElement | null>(null);
    const [avatarSrc, setAvatarSRC] = useState<string>('');
    const [isAvatarChange, setIsAvatarChange] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: async(formData:FormData): Promise<void> =>{
            try {
                const { data } = await axios.put(`${serverURL}/api/user/update/avatar`,formData,{
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
            handleRefetch();
            handleCancelChanges();
        }
    })

    const verifyMutation = useMutation({
        mutationFn: async(email:string): Promise<void>=>{

            try {
                await axios.post(`${serverURL}/api/user/resend/verification`,{email});
                
                successToast('We\'ve sent a confirmation email to your inbox. Please check your email to verify your account.');
            } catch (error) {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    return errorToast(`${error.response?.data.message}`);
                } else {
                    // Handle other errors, e.g., network issues, non-Axios errors
                    console.log(error);
                    errorToast('Something went wrong!');
                    return;
                }
            }
        }
    })

    const handleRefetch = ()=>{
        if(props.refetch){
            props.refetch();
        }
    }

    const handleShowNameModal = ()=>{
        if(props.setShowNameModal && props.type === 'owner'){
            props.setShowNameModal(true)
        }
    }

    const handleShowEmailModal = ()=>{
        if(props.setShowEmailModal && props.type === 'owner'){
            props.setShowEmailModal(true)
        }
    }

    const handleShowPasswordModal = ()=>{
        if(props.setShowPasswordModal && props.type === 'owner'){
            props.setShowPasswordModal(true)
        }
    }


    const handleFileUpload = (fileRef:React.RefObject<HTMLInputElement>, setSrc:React.Dispatch<React.SetStateAction<string>>): void => {
        const file = fileRef.current?.files?.[0];

            if (file) {
                const reader = new FileReader();
            
                reader.onload = (e) => {
                    setSrc(e.target?.result as string);
                };
                setIsAvatarChange(true);
                reader.readAsDataURL(file);
            }
    };

    const handleAvatar = () => {
        handleFileUpload(avatarRef, setAvatarSRC);
    };

    const handleCancelChanges = ()=>{
        if(avatarRef.current) {
            avatarRef.current.value = ''; // Reset the input value
        }
        setAvatarSRC('');
        setIsAvatarChange(false);
    }

    const handleUploadAvatar = ()=>{
        const avatar = avatarRef.current?.files ? avatarRef.current.files[0] : null
        
        if(!avatar){
            return;
        }

        if(props.type === 'visitor'){
            return errorToast('Unauthorized access!');
        }

        const formData = new FormData();
        formData.append('avatar', avatar);

        mutation.mutate(formData)
    }

    const handleResendVerification =  () =>{
        if(!props.data?.email){
            return errorToast('Email not found');
        }

        if(props.type === 'visitor'){
            return;
        }
        verifyMutation.mutate(props.data?.email)
    }
    return (
        <>
            <div>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl text-darkCyan font-medium'>
                        {
                            !props.isLoading &&props.type === 'visitor' ?
                            (
                                `${props.data?.username}'s profile`
                            ):(
                                'Your profile'
                            )
                        }
                    </h1>
                </div>
            </div>
            <div className='flex flex-row items gap-5 mt-5 bg-semiWhite p-5 rounded-sm'>
                <div className='relative'>
                    {
                        props.type === 'visitor' ?
                        (
                            <img 
                                src={props.data?.avatar ? `${serverURL}/${props.data?.avatar}`:'/avatar.png'}
                                className='w-48 h-36 object-cover bg-[#E8EDF3]'
                            />
                        ):(
                            <div className='group relative'>
                                {
                                    props.isLoading ?
                                    (
                                        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                                            <div className="flex items-center justify-center w-48 h-36 bg-gray-300 rounded dark:bg-gray-700">
                                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                                </svg>
                                            </div>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ):(
                                        !isAvatarChange ?
                                        (
                                            <img 
                                                src={props.data?.avatar ? `${serverURL}/${props.data?.avatar}`:'/avatar.png'}
                                                className='w-48 h-36 object-cover bg-[#E8EDF3]'
                                            />
                                        ):(
                                            <img 
                                                src={avatarSrc}
                                                className='w-48 h-36 object-cover bg-[#E8EDF3]'
                                            />
                                        )
                                    )
                                }
                                <label 
                                    htmlFor="avatar" 
                                    className="absolute flex items-center justify-center text-3xl top-0 right-0 bottom-0 left-0 cursor-pointer text-white backdrop-blur-none group-hover:backdrop-blur-sm transition-all duration-300 bg-transparent group-hover:bg-[#21202018]"
                                >
                                    <span className='absolute z-10 scale-0 group-hover:scale-100 transition-all duration-300'>
                                        <FaCamera/>
                                    </span>
                                    <input 
                                        type="file"
                                        id="avatar"
                                        className="sr-only"
                                        ref={avatarRef}
                                        onChange={handleAvatar}
                                        accept="image/png, image/jpeg" 
                                    />
                                </label>
                            </div>
                        )
                    }
                    {
                        isAvatarChange && (
                            <div className='absolute bottom-0 -right-20 flex gap-2'>
                                <button onClick={handleCancelChanges} className='p-2 rounded-full bg-red-600 text-white'>
                                    <RxCross2/>
                                </button>
                                <button onClick={handleUploadAvatar} className='p-2 rounded-full bg-green-600 text-white'>
                                    <FaCheck/>
                                </button>
                            </div>
                        )
                    }
                </div>
                {
                    props.isLoading ?
                    (
                        <div role="status" className="animate-pulse">
                            <div className="w-full">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ):(
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='flex flex-col gap-2 flex-1'>
                                <div className='flex flex-row items-center gap-2 text-gray-600'>
                                    <span>Username:</span>
                                    <h1 className='font-medium'>
                                        {props.data?.username}
                                    </h1>
                                </div>
                                <div className='flex flex-row items-center justify-between gap-2'>
                                    <div className='flex flex-row items-center gap-2 text-gray-600'>
                                        <span>Name:</span>
                                        <h1 className='font-medium'>
                                            {props.data?.name}
                                        </h1>
                                    </div>
                                    {
                                        props.type !== 'visitor' &&
                                        (
                                            <button onClick={handleShowNameModal} className='flex flex-row items-center gap-2 text-gray-400'>
                                                <FaRegEdit/> Edit
                                            </button>
                                        )
                                    }
                                </div>
                                <div className='flex flex-row items-center justify-between gap-2 text-gray-600'>
                                    <div className='flex flex-row items-center gap-2'>
                                    <span className=''>Email:</span>
                                    <div className='flex items-center gap-1'>
                                        <h1 className='font-medium'>
                                            {props.data?.email}
                                        </h1>
                                        {
                                            props.data?.isverified ? 
                                            (
                                                <span className='text-darkCyan'>
                                                    <MdVerified/>
                                                </span>
                                            ):(
                                                props.type !== 'visitor' && (
                                                    <button onClick={handleResendVerification} className='text-sm bg-darkCyan px-1 rounded-sm text-white drop-shadow-md'>
                                                        verify
                                                    </button>
                                                )
                                            )
                                        }
                                    </div>
                                    </div>
                                    {
                                        props.type !== 'visitor' &&
                                        (
                                            <button onClick={handleShowEmailModal} className='flex flex-row items-center gap-2 text-gray-400'>
                                                <FaRegEdit/> Edit
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                props.type !== 'visitor' &&
                                (
                                    <div className='flex items-end justify-end'>
                                        <button onClick={handleShowPasswordModal} className='p-2 text-white drop-shadow-md bg-darkCyan'>
                                            Update password
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ProfileComponent