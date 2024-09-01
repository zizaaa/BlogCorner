import React, { useEffect, useState } from 'react'
import { cookieStore, Email, fetchUser, NameModal, Password, ProfileComponent } from '../../components/links'
import { Toaster } from 'react-hot-toast';
function Profile() {
    const { getToken } = cookieStore();

    const [showNameModal, setShowNameModal] = useState<boolean>(false);
    const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

    const { data, refetch, isLoading} = fetchUser();

    useEffect(()=>{
        const handleGetToken = () =>{
            getToken();
        }

        handleGetToken()
    },[])
    return (
        <section className='p-2'>
            <Toaster/>
            {showNameModal && !showEmailModal && !showPasswordModal &&(<NameModal setShowNameModal={setShowNameModal} refetch={refetch}/>)}
            {!showNameModal && showEmailModal && !showPasswordModal &&(<Email setShowEmailModal={setShowEmailModal} refetch={refetch}/>)}
            {!showNameModal && !showEmailModal && showPasswordModal &&(<Password setShowPasswordModal={setShowPasswordModal} refetch={refetch}/>)}
            
            <div>
                <ProfileComponent
                    data = {data}
                    setShowNameModal = {setShowNameModal}
                    setShowEmailModal = {setShowEmailModal}
                    setShowPasswordModal = {setShowPasswordModal}
                    type = 'owner'
                    isLoading = {isLoading}
                    refetch = {refetch}
                />
            </div>
            <div className='mt-10'>
                <div>
                    <h1 className='text-2xl text-darkCyan font-medium'>Blogs</h1>
                </div>
                <div>
                    <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Up vote
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Down vote
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        0
                                    </td>
                                    <td className="px-6 py-4">
                                        9
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="px-6 py-4">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        5
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">
                                        3
                                    </td>
                                    <td className="px-6 py-4">
                                        0
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile