import { Outlet } from 'react-router-dom'

function FormLayout() {
    return (
        <main className='w-full h-screen flex items-center justify-center font-nunito'>
            <div className='flex flex-row items-center gap-5'>
                <div>
                    <img 
                        src='/logo/BlogCorner.png'
                        className='w-96 h-96'
                    />
                </div>
                <Outlet/>
            </div>
        </main>
    )
}

export default FormLayout