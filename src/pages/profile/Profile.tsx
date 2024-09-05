import { useEffect, useState } from 'react'
import { cookieStore, Email, fetchUser, NameModal, Password, PostedBlogs, ProfileComponent } from '../../components/links'
import { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
function Profile() {
    const { getToken } = cookieStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const [showNameModal, setShowNameModal] = useState<boolean>(false);
    const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

    const { data, refetch, isLoading} = fetchUser();
    console.log(data)
    useEffect(()=>{
        const handleGetToken = () =>{
            getToken();
        }

        handleGetToken()
    },[])

    if(!id){
        navigate('/')
        return;
    }
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
                <PostedBlogs
                    id = {id}
                />
            </div>
        </section>
    )
}

export default Profile