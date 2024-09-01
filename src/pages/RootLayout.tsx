import { Outlet } from "react-router-dom"
import { cookieStore, fetchUser, Navbar, SideNav } from "../components/links"
import { useEffect, useState } from "react"

function RootLayout() {
    const { deleteCookie } = cookieStore();
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [showSideNav, setShowSideNav] = useState<boolean>(false);

    const { data, isLoading, isError } = fetchUser();
    

    // const toggleDarkMode = ():void =>{
    //     // Toggle isDark state and update localStorage
    //     const newIsDark:boolean = !isDarkMode;
    //     setDarkMode(newIsDark);
    //     localStorage.setItem('isDark', JSON.stringify(newIsDark));
    // }

    const handleLogout = (): void =>{
        deleteCookie();
        location.reload();
    }

    useEffect(()=>{
        const storedDarkMode: string | null = localStorage.getItem('isDark');
        const parsedDarkMode: boolean = storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
        setDarkMode(parsedDarkMode)
    },[])

    return (
        <div className={`${isDarkMode ? "dark":""} font-nunito`}>
            <main className="bg-white dark:bg-black">
                <Navbar 
                    isError={isError}
                    isLoading={isLoading}
                    data={data}
                    setShowSideNav={setShowSideNav}
                    showSideNav={showSideNav}
                    handleLogout={handleLogout}
                />
                <section className="max-w-screen-xl mx-auto p-4 flex flex-row h-screen pt-20 overflow-hidden bg-white dark:bg-black">
                    <SideNav
                        isError={isError}
                        isLoading={isLoading}
                        data={data}
                        setShowSideNav={setShowSideNav}
                        showSideNav={showSideNav}
                        handleLogout={handleLogout}
                    />
                    <div className="overflow-y-auto w-full">
                        <Outlet/>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default RootLayout